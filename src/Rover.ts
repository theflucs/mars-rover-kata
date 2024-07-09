export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = [number, number];

export class Rover {
    private position: Position;
    private direction: Direction;
    private gridSize: [number, number];

    private static readonly DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];
    private static readonly MOVEMENTS: Record<Direction, Position> = {
        'N': [0, 1],
        'E': [1, 0],
        'S': [0, -1],
        'W': [-1, 0]
    };

    constructor(position: Position, direction: Direction, gridSize: [number, number] = [5, 4]) {
        this.position = position;
        this.direction = direction;
        this.gridSize = gridSize;
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

    public static getDirections(): Direction[] {
        return Rover.DIRECTIONS;
    }

    private turn(clockwise: boolean): void {
        const currentIndex = Rover.DIRECTIONS.indexOf(this.direction);
        const length = Rover.DIRECTIONS.length;
        const newIndex = clockwise
            ? (currentIndex + 1) % length
            : (currentIndex - 1 + length) % length;
        this.direction = Rover.DIRECTIONS[newIndex];
    }

    turnLeft(): void {
        this.turn(false);
    }

    turnRight(): void {
        this.turn(true);
    }


    private move(forward: boolean): void {
        const [dx, dy] = Rover.MOVEMENTS[this.direction];
        const [x, y] = this.position;
        this.position = [
            (x + (forward ? dx : -dx) + this.gridSize[0]) % this.gridSize[0],
            (y + (forward ? dy : -dy) + this.gridSize[1]) % this.gridSize[1]
        ];
    }

    moveForward(): void {
        this.move(true);
    }

    moveBackward(): void {
        this.move(false);
    }
}
