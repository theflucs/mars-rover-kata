import { parseGridSize } from "../../logic/fileReader/utils";

describe('parseGridSize', () => {
    it('should correctly parse the grid size', () => {
        expect(parseGridSize('Size 5 4')).toEqual([5, 4]);
        expect(parseGridSize('Size 10 10')).toEqual([10, 10]);
    });

    it('should throw an error for non-numeric values', () => {
        expect(() => parseGridSize('Size 5 x')).toThrow('Grid size values must be positive integers');
        expect(() => parseGridSize('Size five 4')).toThrow('Grid size values must be positive integers');
    });

    it('should throw an error for zero or negative values', () => {
        expect(() => parseGridSize('Size 0 4')).toThrow('Grid size values must be positive integers');
        expect(() => parseGridSize('Size 5 -4')).toThrow('Grid size values must be positive integers');
        expect(() => parseGridSize('Size -5 4')).toThrow('Grid size values must be positive integers');
    });
})
