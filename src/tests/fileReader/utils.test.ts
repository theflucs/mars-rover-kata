import { parseCommands, parseGridSize, parseObstacle } from "../../logic/fileReader/utils";
import { Command } from "../../types";

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

describe('parseCommands', () => {
    it('should parse a valid command string into an array of commands', () => {
        const commandsString = 'RFFL';
        const expectedCommands: Command[] = ['R', 'F', 'F', 'L'];
        expect(parseCommands(commandsString)).toEqual(expectedCommands);
    });

    it('should ignore invalid characters and keep only valid commands', () => {
        const commandsString = 'RFFLXYZ!@#1';
        const expectedCommands: Command[] = ['R', 'F', 'F', 'L'];
        expect(parseCommands(commandsString)).toEqual(expectedCommands);
    });

    it('should return an empty array for a string with only invalid characters', () => {
        const commandsString = 'XYZ!@#1';
        const expectedCommands: Command[] = [];
        expect(parseCommands(commandsString)).toEqual(expectedCommands);
    });

    it('should return an empty array for an empty command string', () => {
        const commandsString = '';
        const expectedCommands: Command[] = [];
        expect(parseCommands(commandsString)).toEqual(expectedCommands);
    });

    it('should handle a string with whitespace characters by removing them', () => {
        const commandsString = 'L R F B';
        const expectedCommands: Command[] = ['L', 'R', 'F', 'B'];
        expect(parseCommands(commandsString)).toEqual(expectedCommands);
    });

    it('should convert all commands to uppercase', () => {
        const commandsString = 'lRfB';
        const expectedCommands: Command[] = ['L', 'R', 'F', 'B'];
        expect(parseCommands(commandsString)).toEqual(expectedCommands);
    });

    it('should handle a string with multiple valid commands', () => {
        const commandsString = 'FFRRFFLL';
        const expectedCommands: Command[] = ['F', 'F', 'R', 'R', 'F', 'F', 'L', 'L'];
        expect(parseCommands(commandsString)).toEqual(expectedCommands);
    });
});
