export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = [number, number];

export class Rover {
    private position: Position;
    private direction: Direction;
    private static readonly DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];
    private static readonly MOVEMENTS: Record<Direction, Position> = {
        'N': [0, 1],
        'E': [1, 0],
        'S': [0, -1],
        'W': [-1, 0]
    };

    constructor(position: Position, direction: Direction) {
        this.position = position;
        this.direction = direction;
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
            x + (forward ? dx : -dx),
            y + (forward ? dy : -dy)
        ];
    }

    moveForward(): void {
        this.move(true);
    }

    moveBackward(): void {
        this.move(false);
    }
}
