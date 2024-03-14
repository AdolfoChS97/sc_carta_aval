import { GetIllnesResponse, Illnesses } from "../types/illneses";

export function getIllnessesMapper( Illnesses: GetIllnesResponse) : any{
    try {
        let result: any[] = [];
        const { code, data } = Illnesses;

        if(code){
            return result;
        }
        data?.forEach((value: Illnesses) => {
            if (!value) {
                return;
              }
            
              result.push(value.DESCENFER);
        })
        
        return result;
    } catch (e) {
        console.log('something happened', e);
        throw e;
    }
}