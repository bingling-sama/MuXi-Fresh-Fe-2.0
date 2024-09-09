export const getYear = () => {
    const currentYear = new Date().getFullYear();
    let years: {value: string, label: string}[] = [];
    for(let year = currentYear; year > currentYear - 4; year--){
        years.push({value: year as unknown as string, label: year as unknown as string})
    }
    return years;
}