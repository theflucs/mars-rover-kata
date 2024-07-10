import { GridSize } from "../../types";

export function parseGridSize(line: string): GridSize {
    const parts = line.trim().split(/\s+/);

    if (parts.length !== 3 || parts[0] !== 'Size') {
        throw new Error('Invalid format: The format should be "Size X Y"');
    }

    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);

    if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
        throw new Error('Grid size values must be positive integers');
    }

    return [x, y];
}
