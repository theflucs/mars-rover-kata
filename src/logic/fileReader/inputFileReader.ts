import fs from 'fs';
import { parseGridSize, parseObstacle, parseCommands } from './utils';
import { GridSize, Position, Command } from '../../types';

/**
 * Reads and parses the grid size, obstacles, and commands from a file.
 * @param {string} filePath - The path to the input file.
 * @returns {{ gridSize: GridSize, obstacles: Position[], commands: Command[] }} - The parsed grid size, obstacles, and commands.
 * @throws Will throw an error if the file cannot be read or the format is invalid.
 */
export function inputFileReader(filePath: string): { gridSize: GridSize, obstacles: Position[], commands: Command[] } {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const gridSize = parseGridSize(lines[0]);
    const obstacles: Position[] = [];
    let commands: Command[] = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].startsWith('Obstacle')) {
            obstacles.push(parseObstacle(lines[i]));
        } else {
            commands = parseCommands(lines[i]);
        }
    }

    return { gridSize, obstacles, commands };
}
