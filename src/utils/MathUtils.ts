export const random = (min: number, max: number) => {
    const fator = (max - min) + 1;
    return Math.floor(Math.random() * fator) + min; 
}