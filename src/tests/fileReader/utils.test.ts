import { parseGridSize, parseObstacle } from "../../logic/fileReader/utils";

describe('parseGridSize', () => {
    it('should parse the grid size correctly and handle extra spaces', () => {
        expect(parseGridSize('Size 5 4')).toEqual([5, 4]);
        expect(parseGridSize('Size 10 10')).toEqual([10, 10]);
        expect(parseGridSize('Size   5   4')).toEqual([5, 4]);
        expect(parseGridSize('Size 5  4')).toEqual([5, 4]);
        expect(parseGridSize('  Size 5 4 ')).toEqual([5, 4]);
    });

    it('should throw errors for invalid inputs', () => {
        expect(() => parseGridSize('Size 5 x')).toThrow('Size coordinates must be integers');
        expect(() => parseGridSize('Size five 4')).toThrow('Size coordinates must be integers');
        expect(() => parseGridSize('Size 5')).toThrow('Invalid format: The format should be "Size X Y"');
        expect(() => parseGridSize('Size 5 4 7')).toThrow('Invalid format: The format should be "Size X Y"');
        expect(() => parseGridSize('Grid 5 4')).toThrow('Invalid format: The format should be "Size X Y"');
        expect(() => parseGridSize('   ')).toThrow('Invalid format: The format should be "Size X Y"');
        expect(() => parseGridSize('Size 0 4')).toThrow('Grid size values must be positive integers');
        expect(() => parseGridSize('Size 5 -4')).toThrow('Grid size values must be positive integers');
        expect(() => parseGridSize('Size -5 4')).toThrow('Grid size values must be positive integers');
    });
});

describe('parseObstacle', () => {
    it('should parse the obstacle coordinates correctly and handle extra spaces', () => {
        expect(parseObstacle('Obstacle 2 0')).toEqual([2, 0]);
        expect(parseObstacle('Obstacle 1 1')).toEqual([1, 1]);
        expect(parseObstacle('Obstacle   2   0')).toEqual([2, 0]);
        expect(parseObstacle('Obstacle 2  0')).toEqual([2, 0]);
        expect(parseObstacle('  Obstacle 2 0 ')).toEqual([2, 0]);
    });

    it('should throw errors for invalid inputs', () => {
        expect(() => parseObstacle('Obstacle 2 x')).toThrow('Obstacle coordinates must be integers');
        expect(() => parseObstacle('Obstacle two 0')).toThrow('Obstacle coordinates must be integers');
        expect(() => parseObstacle('Obstacle 2')).toThrow('Invalid format: The format should be "Obstacle X Y"');
        expect(() => parseObstacle('Obstacle 2 0 1')).toThrow('Invalid format: The format should be "Obstacle X Y"');
        expect(() => parseObstacle('Grid 2 0')).toThrow('Invalid format: The format should be "Obstacle X Y"');
        expect(() => parseObstacle('   ')).toThrow('Invalid format: The format should be "Obstacle X Y"');
        expect(() => parseObstacle('Obstacle -2 0')).toThrow('Obstacle coordinates must be non-negative integers');
        expect(() => parseObstacle('Obstacle 2 -1')).toThrow('Obstacle coordinates must be non-negative integers');
    });
});
