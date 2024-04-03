import  { Response } from "./Response";

export type Illnesses = {
    DESCENFER: string,
    CODENFER: number
}

export type GetIllnesResponse = Response & {
    data: Illnesses[] | null
}

export type IllnessesById = {
    DESCENFER: string,
    CODENFER: number
};