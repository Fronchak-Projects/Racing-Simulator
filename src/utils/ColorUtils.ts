import { random } from './MathUtils';
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

export const generateRandomColor = (): string => {
    return Array(6).fill('').reduce((prev: string) => {
        const index = random(0, 15);
        const letter = hex[index];
        return `${prev}${letter}`;
    }, '#');
}