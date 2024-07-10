import { VALID_DIRECTIONS } from "../../constants";
import { Direction, GridSize, Position } from "../../types";
import { getNextPosition, isObstacle } from "./utils";


export class Rover {
    private position: Position;
    private direction: Direction;
    private gridSize: GridSize;
    private obstacles: Position[];

    /**
     * Create a Rover with default params.
     * @param {Position} position
     * @param {Direction} direction
     * @param {GridSize} gridSize
     * @param {Position[]} [obstacles=[]]
     */
    constructor(position: Position, direction: Direction, gridSize: GridSize = [5, 4], obstacles: Position[] = []) {
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

    private turn(clockwise: boolean): void {
        const currentIndex = VALID_DIRECTIONS.indexOf(this.direction);
        const length = VALID_DIRECTIONS.length;

        const newIndex = (currentIndex + (clockwise ? 1 : -1) + length) % length;

        this.direction = VALID_DIRECTIONS[newIndex];
    }

    turnLeft(): void {
        this.turn(false);
    }

    turnRight(): void {
        this.turn(true);
    }

    private move(forward: boolean): void {
        const nextPosition = getNextPosition(this.position, this.direction, forward, this.gridSize);

        if (!isObstacle(nextPosition, this.obstacles)) {
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
