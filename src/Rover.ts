export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = [number, number];

export class Rover {
    private position: Position;
    private direction: Direction;

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

    public turnLeft(): void {
        if (this.direction === 'N') this.direction = 'W';
        else if (this.direction === 'W') this.direction = 'S';
        else if (this.direction === 'S') this.direction = 'E';
        else if (this.direction === 'E') this.direction = 'N';
    }

    public turnRight(): void {
        if (this.direction === 'N') this.direction = 'E';
        else if (this.direction === 'E') this.direction = 'S';
        else if (this.direction === 'S') this.direction = 'W';
        else if (this.direction === 'W') this.direction = 'N';
    }

}
