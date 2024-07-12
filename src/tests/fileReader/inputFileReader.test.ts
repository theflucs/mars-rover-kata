import fs from 'fs';
import { GridSize, Position, Command } from '../../types';
import { inputFileReader } from '../../logic/fileReader/inputFileReader';

jest.mock('fs');

describe('inputFileReader', () => {
    it('should correctly parse grid size, obstacles, and commands from a valid file', () => {
        const fileContent = `
            Size 5 4
            Obstacle 1 1
            Obstacle 3 2
            RFFL
        `;
        (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

        const filePath = 'mockFilePath.txt';
        const result = inputFileReader(filePath);

        const expectedGridSize: GridSize = [5, 4];
        const expectedObstacles: Position[] = [[1, 1], [3, 2]];
        const expectedCommands: Command[] = ['R', 'F', 'F', 'L'];

        expect(result.gridSize).toEqual(expectedGridSize);
        expect(result.obstacles).toEqual(expectedObstacles);
        expect(result.commands).toEqual(expectedCommands);
    });

    it('should throw an error if the file format is invalid', () => {
        const fileContent = `
            Invalid Format
            Obstacle 1 1
            RFFL
        `;
        (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

        const filePath = 'mockFilePath.txt';

        expect(() => inputFileReader(filePath)).toThrow('Invalid format: The format should be "Size X Y"');
    });
});
