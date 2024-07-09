import { Direction, Position, Rover } from "../Rover";

describe('class rover', () => {
    const initialPosition: Position = [0, 0];
    const initialDirection: Direction = 'N';
    let rover: Rover;

    beforeEach(() => {
        rover = new Rover(initialPosition, initialDirection);
    });

    it('should create an instance of Rover', () => {
        expect(rover).toBeInstanceOf(Rover);
    });

    it('should correctly initialize position and direction', () => {
        expect(rover.getPosition()).toEqual(initialPosition);
        expect(rover.getDirection()).toEqual(initialDirection);
    });
    it('should set the correct position', () => {
        const newPosition: Position = [3, 4];
        rover.setPosition(newPosition);
        expect(rover.getPosition()).toEqual(newPosition);
    });

    it('should set the correct direction', () => {
        const newDirection: Direction = 'S';
        rover.setDirection(newDirection);
        expect(rover.getDirection()).toEqual(newDirection);
    });

    it('should move forward correctly', () => {
        rover.moveForward();
        expect(rover.getPosition()).toEqual([0, 1]);

        rover.setDirection('E');
        rover.moveForward();
        expect(rover.getPosition()).toEqual([1, 1]);

        rover.setDirection('S');
        rover.moveForward();
        expect(rover.getPosition()).toEqual([1, 0]);

        rover.setDirection('W');
        rover.moveForward();
        expect(rover.getPosition()).toEqual([0, 0]);
    });

    it('should move backward correctly', () => {
        rover.moveBackward();
        expect(rover.getPosition()).toEqual([0, -1]);

        rover.setDirection('E');
        rover.moveBackward();
        expect(rover.getPosition()).toEqual([-1, -1]);

        rover.setDirection('S');
        rover.moveBackward();
        expect(rover.getPosition()).toEqual([-1, 0]);

        rover.setDirection('W');
        rover.moveBackward();
        expect(rover.getPosition()).toEqual([0, 0]);
    });

});

