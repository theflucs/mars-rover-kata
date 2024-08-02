import { writeFileSync } from 'fs';
import { inputFileReader } from './logic/fileReader/inputFileReader';
import { Rover } from './logic/roverMovements/Rover';
import { GREEN, RESET } from './constants';
import { drawGrid } from './terminalUI/drawGrid';
import { Command, GridSize, Position } from './types';

function runLogic(gridSize: GridSize, obstacles: Position[], rover: Rover, commands: Command[][]) {
    let output = '';
    let gridOutput = '';

    const initialPositionVisualization = drawGrid(
        gridSize,
        rover.getPosition(),
        rover.getDirection(),
        obstacles
    );

    gridOutput += `Initial Position: ${GREEN}${rover.getPosition()}, ${rover.getDirection()}${RESET}\n`;
    gridOutput += initialPositionVisualization + '\n';

    let executedCommands: string[] = [];

    commands.forEach((commandSequence) => {
        const result = rover.executeCommands(commandSequence);
        executedCommands.push(result);
        output += result + '\n';

        gridOutput += `Commands: ${commandSequence}\n`;
        gridOutput += `Position: ${GREEN}${result}${RESET}\n`;

        const gridVisualization = drawGrid(
            gridSize,
            rover.getPosition(),
            rover.getDirection(),
            obstacles
        );
        gridOutput += gridVisualization + '\n';
    });
    return { output, gridOutput };

}

export function main(filePath: string): void {
    try {
        const { gridSize, obstacles, commands } = inputFileReader(filePath);
        const rover = new Rover([0, 0], 'N', gridSize, obstacles);

        const { output, gridOutput } = runLogic(gridSize, obstacles, rover, commands);

        console.log(gridOutput);
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
