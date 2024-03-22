import { GetPoliciesByIdResponse, Policies } from "../types/Policies";

export function getPoliciesByIdMapper(policies: GetPoliciesByIdResponse): Map<string, string> {
    try {
        let result = new Map();

        result.set('name', '');
        result.set('policies', []);
        result.set('phone', '');
        result.set('email', '');

        const { code, data } = policies;
       
        if(code) {
            return result;
        }

        data?.forEach((value: Policies) => {
            const { NUM_POLIZA, NOMBRE_TITULAR, APELLIDO_TITULAR, COD_POLIZA, ID_POLIZA,EMAIL_TITULAR, TELEFONO_TITULAR } = value
            result.set('name', `${NOMBRE_TITULAR} ${APELLIDO_TITULAR}`);
            result.set('policies', [...result.get('policies'), `${COD_POLIZA}${NUM_POLIZA}-${ID_POLIZA}`])
            result.set('phone', `${TELEFONO_TITULAR}`);
            result.set('email', `${EMAIL_TITULAR}`);
        })
    

        return result;
    } catch (e) {
        throw e;
    }
}