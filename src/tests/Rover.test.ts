import { Direction, Position, Rover } from "../Rover";

describe('Rover class', () => {
    const initialPosition: Position = [0, 0];
    const initialDirection: Direction = 'N';
    let rover: Rover;

    beforeEach(() => {
        rover = new Rover(initialPosition, initialDirection);
    });

    describe('initialization', () => {
        it('should create an instance of Rover', () => {
            expect(rover).toBeInstanceOf(Rover);
        });

        it('should correctly initialize position and direction', () => {
            expect(rover.getPosition()).toEqual(initialPosition);
            expect(rover.getDirection()).toEqual(initialDirection);
        });
    });

    describe('setters', () => {
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
    });

    describe('turning', () => {
        test.each<[string, 'turnLeft' | 'turnRight', Direction[]]>([
            ['left', 'turnLeft', ['W', 'S', 'E', 'N']],
            ['right', 'turnRight', ['E', 'S', 'W', 'N']]
        ])('should turn %s correctly', (_, turnMethod, expectedDirections) => {
            expectedDirections.forEach(expectedDirection => {
                rover[turnMethod]();
                expect(rover.getDirection()).toEqual(expectedDirection);
            });
        });
    });

    describe('moving', () => {
        test.each<[string, 'moveForward' | 'moveBackward', Direction, Position]>([
            ['forward', 'moveForward', 'N', [0, 1]],
            ['forward', 'moveForward', 'E', [1, 0]],
            ['forward', 'moveForward', 'S', [0, -1]],
            ['forward', 'moveForward', 'W', [-1, 0]],
            ['backward', 'moveBackward', 'N', [0, -1]],
            ['backward', 'moveBackward', 'E', [-1, 0]],
            ['backward', 'moveBackward', 'S', [0, 1]],
            ['backward', 'moveBackward', 'W', [1, 0]],
        ])('should move %s correctly when facing %s', (_, moveMethod, direction, expectedPosition) => {
            rover = new Rover(initialPosition, direction);
            rover[moveMethod]();
            expect(rover.getPosition()).toEqual(expectedPosition);
        });
    });
});
