import { GetClinicsResponse, Clinics } from "../types/clinic";

export function getClinicsMapper(clinics: GetClinicsResponse): any{
    try {
        let result = new Map();
        result.set('clinics', []);
        
        const { code, data } = clinics;
        
        if(code){
            return result
        }
        data?.forEach((value: Clinics) => {
           const {NOMBRE , CIUDAD, ESTADO } = value
           result.set('name' , `${NOMBRE}, ${CIUDAD}, ${ESTADO}`);
           result.set('clinics' , [...result.get('clinics'), `${NOMBRE} - ${ESTADO} - ${CIUDAD}`])
        })
        
        return result;


    } catch (e) {
        console.log('something happened', e);
        throw e;
    }
}
