import { GetThirdPartiesByPolicyIdResponse, ThirdParties } from "../types/ThirdParty";


export function getThirdPartiesMapper(thirdParties: GetThirdPartiesByPolicyIdResponse ): ThirdParties[] | [] {
    const result: ThirdParties[] = [];
    const { code, data } = thirdParties;

    if(code) return result;

    data?.forEach((thirdParty) => {
        const { APETER, NOMTER, NUMID } = thirdParty
        result.push({ id: NUMID, name: `${NOMTER} ${APETER}` })
    })

    return result;
}