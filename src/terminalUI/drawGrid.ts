import { GRID_DIRECTIONS, GREEN, RESET, RED } from "../constants";
import { Direction, GridSize, Position } from "../types";

export const makeGreen = (txt: string) => {
    return `${GREEN}${txt}${RESET}`
}

export const doNotFormat = (txt: string) => {
    return txt;
}

export function drawGrid(
    gridSize: GridSize,
    roverPosition: Position,
    roverDirection: Direction,
    obstacles: Position[],
    formatRoverPosition: (txt: string) => string
): string {
    const [width, height] = gridSize;
    let output = '';

    output += '  ┌' + '───┬'.repeat(width - 1) + '───┐\n';

    for (let y = height - 1; y >= 0; y--) {
        output += `${y} │`;
        for (let x = 0; x < width; x++) {
            if (x === roverPosition[0] && y === roverPosition[1]) {
                output += " " + formatRoverPosition(GRID_DIRECTIONS[roverDirection]) + " │";
            } else if (obstacles.some(obs => obs[0] === x && obs[1] === y)) {
                output += ` ${RED}■${RESET} │`;
            } else {
                output += '   │';
            }
        }
        output += `\n`;

        if (y > 0) {
            output += '  ├' + '───┼'.repeat(width - 1) + '───┤\n';
        }
    }

    output += '  └' + '───┴'.repeat(width - 1) + '───┘\n';
    output += '    ';
    for (let x = 0; x < width; x++) {
        output += ` ${x}  `;
    }
    output += '\n';

    return output;
}
