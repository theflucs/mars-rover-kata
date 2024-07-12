import {
    parseGridSize,
    parseObstacle,
    parseCommands,
} from '../../logic/fileReader/utils';

describe('parseGridSize', () => {
    it('should parse valid grid size', () => {
        expect(parseGridSize('Size 5 4')).toEqual([5, 4]);
    });

    it('should throw error for invalid format', () => {
        expect(() => parseGridSize('Size 5')).toThrow('Invalid format: The format should be "Size X Y"');
    });

    it('should throw error for non-positive integers', () => {
        expect(() => parseGridSize('Size 0 4')).toThrow('Grid size values must be positive integers');
    });
});

describe('parseObstacle', () => {
    it('should parse valid obstacle', () => {
        expect(parseObstacle('Obstacle 2 3')).toEqual([2, 3]);
    });

    it('should throw error for invalid format', () => {
        expect(() => parseObstacle('Obstacle 2')).toThrow('Invalid format: The format should be "Obstacle X Y"');
    });

    it('should throw error for negative integers', () => {
        expect(() => parseObstacle('Obstacle -1 3')).toThrow('Obstacle coordinates must be non-negative integers');
    });
});

describe('parseCommands', () => {
    it('should parse valid commands', () => {
        expect(parseCommands('FRLB')).toEqual(['F', 'R', 'L', 'B']);
    });

    it('should ignore invalid commands', () => {
        expect(parseCommands('FRXLBYZ')).toEqual(['F', 'R', 'L', 'B']);
    });
});

