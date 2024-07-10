import { Direction, Position } from "../types";
import { MOVEMENTS, DIRECTIONS } from "../constants";

export class Rover {
    private position: Position;
    private direction: Direction;
    private gridSize: [number, number];
    private obstacles: Position[];

    constructor(position: Position, direction: Direction, gridSize: [number, number] = [5, 4], obstacles: Position[] = []) {
        this.position = position;
        this.direction = direction;
        this.gridSize = gridSize;
        this.obstacles = obstacles;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getDirection(): Direction {
        return this.direction;
    }

    public setPosition(position: Position): void {
        this.position = position;
    }

    public setDirection(direction: Direction): void {
        this.direction = direction;
    }

    private isObstacle(position: Position): boolean {
        return this.obstacles.some(
            ([x, y]) => x === position[0] && y === position[1]
        );
    }

    private turn(clockwise: boolean): void {
        const currentIndex = DIRECTIONS.indexOf(this.direction);
        const length = DIRECTIONS.length;

        const newIndex = (currentIndex + (clockwise ? 1 : -1) + length) % length;

        this.direction = DIRECTIONS[newIndex];
    }

    turnLeft(): void {
        this.turn(false);
    }

    turnRight(): void {
        this.turn(true);
    }

    private getNextPosition(forward: boolean): Position {
        const [dx, dy] = MOVEMENTS.get(this.direction) || [0, 0];
        const [x, y] = this.position;

        const nextX = x + (forward ? dx : -dx);
        const nextY = y + (forward ? dy : -dy);

        const wrappedX = (nextX + this.gridSize[0]) % this.gridSize[0];
        const wrappedY = (nextY + this.gridSize[1]) % this.gridSize[1];

        return [wrappedX, wrappedY];
    }

    private move(forward: boolean): void {
        const nextPosition = this.getNextPosition(forward);

        if (!this.isObstacle(nextPosition)) {
            this.position = nextPosition;
        }
    }

    moveForward(): void {
        this.move(true);
    }

    moveBackward(): void {
        this.move(false);
    }
}
