import { GetPoliciesByIdResponse, Policies } from "../types/Policies";

export function getPoliciesByIdMapper(policies: GetPoliciesByIdResponse): Map<string, string> {
    try {
        let result = new Map();

        result.set('name', '');
        result.set('policies', []);

        const { code, data } = policies;
       
        if(code) {
            return result;
        }

        data?.forEach((value: Policies) => {
            const { NUM_POLIZA, NOMBRE_TITULAR, APELLIDO_TITULAR, COD_POLIZA, ID_POLIZA } = value
            result.set('name', `${NOMBRE_TITULAR} ${APELLIDO_TITULAR}`);
            result.set('policies', [...result.get('policies'), `${ID_POLIZA}-${NUM_POLIZA}-${COD_POLIZA}`])
        })

        return result;
    } catch (e) {
        console.log('something happened', e);
        throw e;
    }
}