import fs from 'fs';
import { GridSize, Position, Command } from '../../types';
import { inputFileReader } from '../../logic/fileReader/inputFileReader';

jest.mock('fs');

describe('inputFileReader', () => {
    const mockFilePath = 'mockFilePath.txt';

    it('should correctly parse grid size, obstacles, and commands from a valid file', () => {
        const fileContent = `
            Size 5 4
            Obstacle 2 0
            Obstacle 0 3
            Obstacle 3 2
            RFF
            RF
            LFRFFLFFFLL
        `;
        (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

        const result = inputFileReader(mockFilePath);

        const expectedGridSize: GridSize = [5, 4];
        const expectedObstacles: Position[] = [[2, 0], [0, 3], [3, 2]];
        const expectedCommands: Command[][] = [
            ['R', 'F', 'F'],
            ['R', 'F'],
            ['L', 'F', 'R', 'F', 'F', 'L', 'F', 'F', 'F', 'L', 'L']
        ];

        expect(result.gridSize).toEqual(expectedGridSize);
        expect(result.obstacles).toEqual(expectedObstacles);
        expect(result.commands).toEqual(expectedCommands);
    });

    it('should throw an error if the grid size definition is missing', () => {
        const fileContent = `
            Obstacle 2 0
            Obstacle 0 3
            Obstacle 3 2
            RFF
            RF
            LFRFFLFFFLL
        `;
        (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

        expect(() => inputFileReader(mockFilePath)).toThrow('Grid size definition is missing');
    });

    it('should throw an error if the grid size format is invalid', () => {
        const fileContent = `
            Size 5
            Obstacle 2 0
            Obstacle 0 3
            Obstacle 3 2
            RFF
            RF
            LFRFFLFFFLL
        `;
        (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

        expect(() => inputFileReader(mockFilePath)).toThrow('Invalid format: The format should be "Size X Y"');
    });

    it('should throw an error if the commands line is missing', () => {
        const fileContent = `
            Size 5 4
            Obstacle 2 0
            Obstacle 0 3
            Obstacle 3 2
        `;
        (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

        expect(() => inputFileReader(mockFilePath)).toThrow('Commands line is missing');
    });
});
