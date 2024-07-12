import fs from 'fs';
import { InputFileReaderProps } from '../../types';
import { readCommands, readGridSize, readObstacles } from './utils';

/**
 * Reads and parses the grid size, obstacles, and commands from a file.
 * @param {string} filePath - The path to the input file.
 * @returns {InputFileReaderProps} - The parsed grid size, obstacles, and commands.
 * @throws Will throw an error if the file cannot be read or the format is invalid.
 */
export function inputFileReader(filePath: string): InputFileReaderProps {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const gridSize = readGridSize(lines);
    const obstacles = readObstacles(lines);
    const commands = readCommands(lines);

    return { gridSize, obstacles, commands };
}
