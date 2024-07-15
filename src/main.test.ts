import { writeFileSync } from "fs";
import { inputFileReader } from "./logic/fileReader/inputFileReader";
import { Rover } from "./logic/roverMovements/Rover";
import { main } from "./main";
import { GridSize, Position } from "./types";

jest.mock('fs', () => ({
    writeFileSync: jest.fn(),
}));

jest.mock('./logic/fileReader/inputFileReader');

jest.mock('./logic/roverMovements/Rover');

describe('main function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should parse input file and produce correct output', () => {
        const mockInputData = {
            gridSize: [5, 4] as GridSize,
            obstacles: [[2, 0], [0, 3], [3, 2]] as Position[],
            commands: [
                ['R', 'F', 'F'],
                ['R', 'F'],
                ['L', 'F', 'R', 'F', 'F', 'L', 'F', 'F', 'F', 'L', 'L']
            ]
        };

        (inputFileReader as jest.Mock).mockReturnValue(mockInputData);

        (Rover.prototype.executeCommands as jest.Mock).mockImplementationOnce(() => 'O:1:0:E')
            .mockImplementationOnce(() => '1:3:S')
            .mockImplementationOnce(() => '0:1:W');

        const expectedOutput = 'O:1:0:E\n1:3:S\n0:1:W';

        main('mockInputFile.txt');

        expect(writeFileSync).toHaveBeenCalledWith('output.txt', expectedOutput);
    });

    it('should throw an error when file reading fails', () => {
        (inputFileReader as jest.Mock).mockImplementation(() => {
            throw new Error('File read error');
        });

        expect(() => main('noFile.txt')).toThrow('Something went wrong while processing the commands. Please check the file and try again. Details: File read error');
    });
});
