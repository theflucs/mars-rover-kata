import { writeFileSync } from 'fs';
import { inputFileReader } from './logic/fileReader/inputFileReader';
import { Rover } from './logic/roverMovements/Rover';

export function main(filePath: string): void {
    try {
        const { gridSize, obstacles, commands } = inputFileReader(filePath);
        const rover = new Rover([0, 0], 'N', gridSize, obstacles);

        const results: string[] = commands.map(commandSequence => {
            return rover.executeCommands(commandSequence);
        });

        const output = results.join('\n');
        console.log(`Output:\n${output}`);
        writeFileSync('output.txt', output);
    } catch (error) {
        if (error instanceof Error) {
            console.error('An error occurred while processing the commands:', error.message);
            throw new Error(`Something went wrong while processing the commands. Please check the file and try again. Details: ${error.message}`);
        } else {
            console.error('An unknown error occurred:', error);
            throw new Error('An unknown error occurred. Please try again.');
        }
    }
}
