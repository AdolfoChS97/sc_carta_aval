import { Response } from './Response';

export type Policies = {
    NOMBRE_TITULAR: string,
    APELLIDO_TITULAR: string,
    COD_POLIZA: string,
    NUM_POLIZA: string,
    ID_POLIZA: string,
    EMAIL_TITULAR: string,
    TELEFONO_TITULAR: string
} 

export type GetPoliciesByIdResponse = Response & {
    data: Policies[] | null 
}

export type PoliciesById = {
    name: string,
    policies: string[]
}