import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Curso } from "./curso.entity";

@Entity()
export class Alumno {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    apellido!: string;

    @Column()
    doc_index?: number;

    @OneToMany(() => Curso, (curso) => curso.alumno ,{cascade: true, onDelete: "CASCADE"})
    cursos?: Curso[];

}