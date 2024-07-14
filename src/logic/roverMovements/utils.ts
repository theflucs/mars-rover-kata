import { VALID_MOVEMENTS } from "../../constants";
import { Position, Direction, GridSize } from "../../types";

export function isObstacle(position: Position, obstacles: Position[]): boolean {
    return obstacles.some(([x, y]) => x === position[0] && y === position[1]);
}

export function getNextPosition(
    currentPosition: Position,
    direction: Direction,
    forward: boolean,
    gridSize: GridSize
): Position {
    const [dx, dy] = VALID_MOVEMENTS.get(direction) || [0, 0];
    const [x, y] = currentPosition;

    const nextX = x + (forward ? dx : -dx);
    const nextY = y + (forward ? dy : -dy);

    const wrappedX = applyPacmanEffect(nextX, gridSize[0]);
    const wrappedY = applyPacmanEffect(nextY, gridSize[1]);

    return [wrappedX, wrappedY];
}

function applyPacmanEffect(coordinate: number, maxSize: number): number {
    return (coordinate + maxSize) % maxSize;
}
