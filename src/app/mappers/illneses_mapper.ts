import { GetIllnesResponse, Illnesses } from "../types/illneses";

export function getIllnessesMapper( Illnesses: GetIllnesResponse) : any{
    try {
        let result = new Map();
        // result.set('illnesses', []);
       
        const { code, data } = Illnesses;

        if(code){
            return result;
        }
        data?.forEach((value: Illnesses) => {
            if (!value) {
                return;
              }
              const illnessObject = {
                CODENFER: value.CODENFER,
                DESCENFER: value.DESCENFER
              };
            
              result.set(illnessObject.CODENFER, illnessObject.DESCENFER);
              console.log(result);
        })
        
        return result;
    } catch (e) {
        console.log('something happened', e);
        throw e;
    }
}