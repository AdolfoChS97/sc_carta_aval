
/**
 * This filter is used to filter the array based on the value
 * @param value
 * @param array
 * @returns array[]
 */
export function _filter(value: string, array: string[] ) {
    const filterValue = value.toLowerCase();
    return array?.filter((value: string) => value?.toLowerCase().includes(filterValue));
}