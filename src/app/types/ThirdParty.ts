import { Response } from "./Response";

export type ThirdParty = {
    APETER: string
    CODCLI: string
    DVID: string
    NOMTER: string
    NUMID: string
    TIPOID: string
}


export type GetThirdPartiesByPolicyIdResponse = Response & {
    data: ThirdParty[] | null 
}

export type ThirdParties = {
    id: string,
    name: string
}

