import { Response } from "./Response";

export type Clinics = {
    NOMBRE: string,
    CIUDAD: string,
    ESTADO: string,

}

export type GetClinicsResponse = Response & {
    data: Clinics[] | null
}


export type ClinicsById = {
    NOMBRE: string,
    CIUDAD: string,
    ESTADO: string,
}
