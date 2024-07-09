export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = [number, number];

export class Rover {
    private position: Position;
    private direction: Direction;
    private static readonly DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];

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


    moveForward(): void {
        const [x, y] = this.position;
        switch (this.direction) {
            case 'N':
                this.position = [x, y + 1];
                break;
            case 'E':
                this.position = [x + 1, y];
                break;
            case 'S':
                this.position = [x, y - 1];
                break;
            case 'W':
                this.position = [x - 1, y];
                break;
        }
    }

    moveBackward(): void {
        const [x, y] = this.position;
        switch (this.direction) {
            case 'N':
                this.position = [x, y - 1];
                break;
            case 'E':
                this.position = [x - 1, y];
                break;
            case 'S':
                this.position = [x, y + 1];
                break;
            case 'W':
                this.position = [x + 1, y];
                break;
        }
    }
}
