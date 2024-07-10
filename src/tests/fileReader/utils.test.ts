import { validateGridSizeFormat, extractGridSizeParts, parseGridSize } from "../../logic/fileReader/utils";

describe('Grid Size Functions', () => {
    describe('validateGridSizeFormat', () => {
        it('should validate the grid size format', () => {
            expect(() => validateGridSizeFormat('Size 5 4')).not.toThrow();
            expect(() => validateGridSizeFormat('Size 10 10')).not.toThrow();
        });

        it('should throw an error for invalid format', () => {
            expect(() => validateGridSizeFormat('Size 5')).toThrow('Invalid format: The format should be "Size X Y"');
            expect(() => validateGridSizeFormat('Grid 5 4')).toThrow('Invalid format: The format should be "Size X Y"');
            expect(() => validateGridSizeFormat('Size 5 4 7')).toThrow('Invalid format: The format should be "Size X Y"');
            expect(() => validateGridSizeFormat('   ')).toThrow('Invalid format: The format should be "Size X Y"');
        });

        it('should throw an error for non-numeric values', () => {
            expect(() => validateGridSizeFormat('Size 5 x')).toThrow('Grid size values must be positive integers');
            expect(() => validateGridSizeFormat('Size five 4')).toThrow('Grid size values must be positive integers');
        });

        it('should throw an error for zero or negative values', () => {
            expect(() => validateGridSizeFormat('Size 0 4')).toThrow('Grid size values must be positive integers');
            expect(() => validateGridSizeFormat('Size 5 -4')).toThrow('Grid size values must be positive integers');
            expect(() => validateGridSizeFormat('Size -5 4')).toThrow('Grid size values must be positive integers');
        });

        it('should handle extra spaces in the input', () => {
            expect(() => validateGridSizeFormat('Size   5   4')).not.toThrow();
            expect(() => validateGridSizeFormat('Size 5  4')).not.toThrow();
            expect(() => validateGridSizeFormat('  Size 5 4 ')).not.toThrow();
        });
    });

    describe('extractGridSizeParts', () => {
        it('should correctly extract the grid size parts', () => {
            expect(extractGridSizeParts('Size 5 4')).toEqual([5, 4]);
            expect(extractGridSizeParts('Size 10 10')).toEqual([10, 10]);
        });
    });

    describe('parseGridSize', () => {
        it('should correctly parse the grid size', () => {
            expect(parseGridSize('Size 5 4')).toEqual([5, 4]);
            expect(parseGridSize('Size 10 10')).toEqual([10, 10]);
        });
    });

});
