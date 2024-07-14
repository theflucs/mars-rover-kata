import {
    parseGridSize,
    parseObstacle,
    parseCommands,
    validateFormat,
    validateCoordinates,
    extractParts,
    readGridSize,
    readObstacles,
    readCommands,
} from '../../logic/fileReader/utils';
import { Command } from '../../types';

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
    it('should parse commands from multiple lines correctly', () => {
        const commandsString = 'RFF\nRF\nLFRFFLFFFLL';
        const expected: Command[][] = [
            ['R', 'F', 'F'],
            ['R', 'F'],
            ['L', 'F', 'R', 'F', 'F', 'L', 'F', 'F', 'F', 'L', 'L']
        ];
        expect(parseCommands(commandsString)).toEqual(expected);
    });
    it('should ignore invalid commands', () => {
        const commandsString = 'RFF\nRF\nLFRFFLFFFLL\nXYZ';
        const expected: Command[][] = [
            ['R', 'F', 'F'],
            ['R', 'F'],
            ['L', 'F', 'R', 'F', 'F', 'L', 'F', 'F', 'F', 'L', 'L']
        ];
        expect(parseCommands(commandsString)).toEqual(expected);
    });
});

describe('parsers helper functions', () => {
    describe('validateFormat', () => {
        it('should validate correct format', () => {
            expect(() => validateFormat('Size 5 4', 'Size')).not.toThrow();
        });

        it('should throw error for incorrect format', () => {
            expect(() => validateFormat('Size 5', 'Size')).toThrow('Invalid format: The format should be "Size X Y"');
        });
    });

    describe('validateCoordinates', () => {
        it('should validate correct coordinates for Size', () => {
            expect(() => validateCoordinates('Size 5 4', 'Size')).not.toThrow();
        });

        it('should throw error for non-integer coordinates', () => {
            expect(() => validateCoordinates('Size x 4', 'Size')).toThrow('Size coordinates must be integers');
        });
    });

    describe('extractParts', () => {
        it('should extract parts correctly', () => {
            expect(extractParts('Size 5 4')).toEqual([5, 4]);
        });
    });

    describe('readGridSize', () => {
        it('should read grid size from lines', () => {
            expect(readGridSize(['Size 5 4', 'Obstacle 1 2'])).toEqual([5, 4]);
        });

        it('should throw error if grid size is missing', () => {
            expect(() => readGridSize(['Obstacle 1 2'])).toThrow('Grid size definition is missing');
        });
    });

    describe('readObstacles', () => {
        it('should read obstacles from lines', () => {
            expect(readObstacles(['Size 5 4', 'Obstacle 1 2', 'Obstacle 3 4'])).toEqual([[1, 2], [3, 4]]);
        });

        it('should return empty array if no obstacles', () => {
            expect(readObstacles(['Size 5 4'])).toEqual([]);
        });
    });

    describe('readCommands', () => {
        it('should read commands from lines', () => {
            const lines = [
                'Size 5 4',
                'Obstacle 2 0',
                'Obstacle 0 3',
                'Obstacle 3 2',
                'RFF',
                'RF',
                'LFRFFLFFFLL'
            ];
            const expected: Command[][] = [
                ['R', 'F', 'F'],
                ['R', 'F'],
                ['L', 'F', 'R', 'F', 'F', 'L', 'F', 'F', 'F', 'L', 'L']
            ];
            expect(readCommands(lines)).toEqual(expected);
        });

        it('should throw error if commands are missing', () => {
            const lines = [
                'Size 5 4',
                'Obstacle 2 0',
                'Obstacle 0 3',
                'Obstacle 3 2'
            ];
            expect(() => readCommands(lines)).toThrow('Commands line is missing');
        });

        it('should ignore lines without commands', () => {
            const lines = [
                'Size 5 4',
                'Obstacle 2 0',
                'Obstacle 0 3',
                'Obstacle 3 2',
                '',
                ' ',
                'RFF',
                '   ',
                'RF',
                'LFRFFLFFFLL'
            ];
            const expected: Command[][] = [
                ['R', 'F', 'F'],
                ['R', 'F'],
                ['L', 'F', 'R', 'F', 'F', 'L', 'F', 'F', 'F', 'L', 'L']
            ];
            expect(readCommands(lines)).toEqual(expected);
        });
    });
})
