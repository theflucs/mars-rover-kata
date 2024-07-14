import { VALID_COMMANDS } from "../../constants";
import { Command, GridSize, Position } from "../../types";

/**
 * `parseGridSize` and `parseObstacle` are used to parse and validate the grid siz or the obstacle coordinates from a string.
 * @param {string} line - The line containing the grid size (expected format is "Size 5 4") or the obstacle coordinates (expected format is "Obstacle X Y").
 * @returns {[number, number]} - The parsed grid size as a tuple [X, Y].
 * @throws Will throw an error if the format is incorrect or the values are not positive integers.
 */
export function parseGridSize(line: string): GridSize {
    validateFormat(line, 'Size');
    validateCoordinates(line, 'Size');
    return extractParts(line);
}

export function parseObstacle(line: string): Position {
    validateFormat(line, 'Obstacle');
    validateCoordinates(line, 'Obstacle');
    return extractParts(line);
}

/**
 * Validates the format of a line based on the prefix".
 * @param {string} line - The line to be validated.
 * @param {string} prefix - The prefix ("Size" or "Obstacle").
 * @throws Will throw an error if the format is incorrect.
 */
export function validateFormat(line: string, prefix: string): void {
    const parts = line.trim().split(/\s+/);

    if (parts.length !== 3 || parts[0] !== prefix) {
        const formatMessage = `${prefix} X Y`;
        throw new Error(`Invalid format: The format should be "${formatMessage}"`);
    }
}

// parsers helper functions

/**
 * Validates the coordinates in a line based on the prefix.
 * For "Size", the coordinates must be positive integers greater than zero.
 * For "Obstacle", the coordinates must be non-negative integers, including zero.
 * @param {string} line - The line containing the coordinates.
 * @param {string} prefix - The prefix ("Size" or "Obstacle").
 * @throws Will throw an error if the coordinates are not valid integers or do not meet prefix-specific criteria.
 */
export function validateCoordinates(line: string, prefix: string): void {
    const parts = line.trim().split(/\s+/);
    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);

    if (isNaN(x) || isNaN(y)) {
        throw new Error(`${prefix} coordinates must be integers`);
    }

    if (prefix === 'Size' && (x <= 0 || y <= 0)) {
        throw new Error('Grid size values must be positive integers');
    } else if (prefix === 'Obstacle' && (x < 0 || y < 0)) {
        throw new Error('Obstacle coordinates must be non-negative integers');
    }
}

/**
 * Extracts the coordinate parts from a line after validation.
 * Assumes the line has already been validated and follows the "Prefix X Y" format.
 * @param {string} line - The line to extract coordinates from.
 * @returns {[number, number]} - The extracted coordinates as a tuple [X, Y].
 */
export function extractParts(line: string): Position {
    const parts = line.trim().split(/\s+/);
    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    return [x, y];
}

/**
 * Parses a string of multiple lines of commands and returns an array of command arrays.
 * Each line in the input string represents a separate set of commands to execute.
 * The function filters out invalid commands and converts all commands to uppercase.
 * 
 * @param {string} commandsString - A string of commands separated by new lines.
 * Each line contains a sequence of command characters where each character is one of {L, R, F, B}.
 * @returns {Command[][]} - An array of command arrays.
 * Each inner array represents a sequence of valid commands extracted from one line of the input string.
 */
export function parseCommands(commandsString: string): Command[][] {
    return commandsString
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => line.toUpperCase().split(''))
        .filter(commands => commands.every(command => isValidCommand(command as Command)))
        .map(commands => commands.map(command => command as Command));
}

function isValidCommand(command: Command): command is Command {
    return VALID_COMMANDS.includes(command);
}

export function readGridSize(lines: string[]): GridSize {
    const gridSizeLine = lines.find(line => line.startsWith('Size'));
    if (!gridSizeLine) {
        throw new Error('Grid size definition is missing');
    }
    return parseGridSize(gridSizeLine);
}

export function readObstacles(lines: string[]): Position[] {
    const obstacleLines = lines.filter(line => line.startsWith('Obstacle'));
    if (obstacleLines.length === 0) {
        return [];
    }
    return obstacleLines.map(line => {
        if (!line.startsWith('Obstacle')) {
            throw new Error(`Invalid line format for obstacles: ${line}`);
        }
        return parseObstacle(line);
    });
}

/**
 * Reads and parses the commands from the given lines.
 * @param {string[]} lines - The lines from the input file.
 * @returns {Command[][]} - An array of arrays of commands to execute.
 * @throws Will throw an error if no valid commands line is found.
 */
export function readCommands(lines: string[]): Command[][] {
    const commandLines = lines.filter(line => !line.startsWith('Size') && !line.startsWith('Obstacle') && line.trim() !== '');
    if (commandLines.length === 0) {
        throw new Error('Commands line is missing');
    }
    return parseCommands(commandLines.join('\n'));
}
