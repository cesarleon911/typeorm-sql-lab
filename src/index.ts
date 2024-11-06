import express from 'express';
import cors from "cors";
import alumnoRoutes from './routes/alumnos.routes';
import { AppDataSource } from './data-source';
import bodyParser from 'body-parser';

//variables


//mideware

const app = express();
const port = 3000;


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

AppDataSource.initialize()
.then(()=>{
    console.log("aqui inicializa mi base de datos")
})
.catch((error)=> console.log(error))


//rutas
app.use('/api-lab', alumnoRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log('Servidor en el puerto '+ port);
});



