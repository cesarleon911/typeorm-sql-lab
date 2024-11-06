import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Alumno } from "./alumno.entity";

@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 200})
    nombre!: string;

    @ManyToOne(() => Alumno, (alumno) => alumno.cursos)
    alumno?: Alumno;
}