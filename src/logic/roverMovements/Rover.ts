import { Command, Direction, GridSize, Position } from "../../types";
import { VALID_DIRECTIONS } from "../../constants";
import { getNextPosition, isObstacle } from "./utils";

export class Rover {
    private position: Position;
    private direction: Direction;
    private gridSize: GridSize;
    private obstacles: Position[];
    private isObstacleError: boolean;

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
        this.isObstacleError = false;
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

    /**
     * Move the rover one step forward in the current direction.
     * The rover will check for obstacles before moving. If an obstacle is encountered,
     * the rover will stop moving and set an error state.
     *
     * @throws {Error} Throws an error if an invalid direction is provided.
     * @throws {Error} Throws an error if an obstacle is detected while moving.
     * 
     */
    private move(forward: boolean): void {
        const nextPosition = getNextPosition(this.position, this.direction, forward, this.gridSize);

        if (isObstacle(nextPosition, this.obstacles)) {
            throw new Error(`Obstacle detected at ${nextPosition[0]},${nextPosition[1]}`);
        }
        this.position = nextPosition;
    }

    moveForward(): void {
        this.move(true);
    }

    moveBackward(): void {
        this.move(false);
    }

    /**
     * Execute a sequence of commands to control the rover's movement and rotation.
     * Commands can be 'F' (forward), 'B' (backward), 'L' (left turn), or 'R' (right turn).
     * The rover will handle each command in sequence, stopping if an obstacle is detected.
     * 
     * If an invalid command is encountered, an error will be thrown.
     * 
     * @param {Command[]} commands - An array of commands to execute. Valid commands are 'F', 'B', 'L', 'R'.
     * @throws {Error} Throws an error if an invalid command is encountered.
     * 
     */
    public executeCommands(commands: Command[]): string {
        const commandActions: Record<Command, () => void> = {
            'L': () => this.turnLeft(),
            'R': () => this.turnRight(),
            'F': () => this.moveForward(),
            'B': () => this.moveBackward(),
        };

        try {
            for (const command of commands) {
                if (command in commandActions) {
                    if (this.isObstacleError) break;
                    commandActions[command]();
                } else {
                    throw new Error(`Invalid command: ${command}`);
                }
            }
        } catch (error) {
            if (error instanceof Error && error.message.startsWith('Obstacle detected')) {
                this.isObstacleError = true;
            } else {
                throw error;
            }
        }
        return this.writeOutput();
    }

    public writeOutput(): string {
        const positionOutput = `${this.position[0]}:${this.position[1]}:${this.direction}`;
        return this.isObstacleError ? `O:${positionOutput}` : positionOutput;
    }

}
