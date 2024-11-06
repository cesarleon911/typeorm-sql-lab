import { Router, Request, Response} from 'express';
import { Any } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Alumno } from '../entity/alumno.entity';
import { Curso } from '../entity/curso.entity';

var router = Router();

// todas estas apis, han sido probaads por postman

router.get('/', async function (req: Request, res: Response) {
    //equivalente a un select * from alumno
    const alumnos = await AppDataSource.getRepository(Alumno).find();
    res.json(alumnos);
})

router.get('/:id', async function (req: Request, res: Response) {
    // equivalente a select * from alumno where id= parametro_id
    var id_num = Number(req.params.id)
    const get_alumno = await AppDataSource.getRepository(Alumno).findOneBy({id: id_num});
    res.json({Alumno: get_alumno});
})

router.post('/', async function (req: Request, res: Response) {
    //equivalente a un insert
    /*
    este seria un dato esperando en el body
    {
        "nombre": "Stefania",
        "apellido": "Vargas",
        "doc_index": 910086370,
        "curso": [
            {"nombre": "Angular"},
            {"nombre": "Nodejs"}
        ]
    }
    */


    const alum1= new Alumno()
    alum1.nombre=req.body.nombre;
    alum1.apellido=req.body.apellido;
    alum1.doc_index=req.body.doc_index;

    const Repositorio_alumno = AppDataSource.getRepository(Alumno);
    const result = await Repositorio_alumno.save(alum1);

    if(req.body.curso){
        req.body.curso.forEach((curso: { nombre: string; }) => {
            var new_curso = new Curso();
            new_curso.nombre=curso.nombre;
            new_curso.alumno = alum1;
            AppDataSource.getRepository(Curso).save(new_curso);
        });
    }

    res.json({mensaje: "Alumno creado correctamente", Alumno: result});
})
router.put('/', async function (req: Request, res: Response) {
    // equivalente a un update from articulo set paramas  where id=req.body.id
    var id_num=req.body.id;
    const repositorio_alumno = AppDataSource.getRepository(Alumno);
    const get_alumno = await repositorio_alumno.findOneBy({id: id_num});

    if(get_alumno){
        get_alumno.nombre=req.body.nombre;
        get_alumno.apellido=req.body.apellido;
        get_alumno.doc_index=req.body.doc_index;
        get_alumno.cursos = req.body.curso
        repositorio_alumno.save(get_alumno);
        
        res.json({mensaje: "Alumno actualizado", Alumno: get_alumno});
    }
    

    res.json({mensaje: "Alumno no encontrado"});
})

router.delete('/:id', async function (req: Request, res: Response) {
    //equivalente a un delete from alumno where id= params_id
    var id_num = Number(req.params.id);
    console.log(id_num);
    const alumno_repositorio =  AppDataSource.getRepository(Alumno);
    const alumno_remover = await alumno_repositorio.findOneBy({id: id_num});
    console.log(alumno_remover);
    if(alumno_remover){
        await alumno_repositorio.remove(alumno_remover);
        res.json({mensaje: "Alumno eliminado correctamente"});
    }else {
        res.json({mensaje: "No habia un Alumno con el id indicado"});
    }   
   
})

export default router;