import { DataSource } from "typeorm";
import 'reflect-metadata'
import { Alumno } from "./entity/alumno.entity";
import { Curso } from "./entity/curso.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./data/labs.db",
    synchronize: true,
    logging: true,
    entities: [Alumno, Curso],
    subscribers: [],
    migrations: [],
})

