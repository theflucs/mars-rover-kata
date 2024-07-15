import { GREEN, RESET, RED, GRID_DIRECTIONS } from "../constants";
import { Direction, GridSize, Position } from "../types";

export function drawInitialGrid(
    gridSize: GridSize,
    roverPosition: Position,
    roverDirection: Direction,
    obstacles: Position[]
): string {
    const [width, height] = gridSize;
    let output = '';

    output += `Initial Position: ${GREEN}${roverPosition[0]}, ${roverPosition[1]}, ${roverDirection}${RESET}\n`;

    output += '\n';
    output += '  ┌' + '───┬'.repeat(width - 1) + '───┐\n';

    for (let y = height - 1; y >= 0; y--) {
        output += `${y} │`;
        for (let x = 0; x < width; x++) {
            if (x === roverPosition[0] && y === roverPosition[1]) {
                output += ` ${GREEN}${GRID_DIRECTIONS[roverDirection]}${RESET} │`;
            } else if (obstacles.some(obs => obs[0] === x && obs[1] === y)) {
                output += ` ${RED}■${RESET} │`;
            } else {
                output += '   │';
            }
        }

        output += '\n';

        // Separator between rows, except for the last row
        if (y > 0) {
            output += '  ├' + '───┼'.repeat(width - 1) + '───┤\n';
        }
    }

    // Bottom border with x-axis labels
    output += '  └' + '───┴'.repeat(width - 1) + '───┘\n';
    output += '    ';
    for (let x = 0; x < width; x++) {
        output += ` ${x}  `;
    }
    output += '\n';

    return output;
}
