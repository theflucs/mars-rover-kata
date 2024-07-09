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
            ['backward', 'moveBackward', 'S', [0, 1]],
            ['backward', 'moveBackward', 'W', [1, 0]],
        ])('should move %s correctly when facing %s', (_, moveMethod, direction, expectedPosition) => {
            rover = new Rover(initialPosition, direction);
            rover[moveMethod]();
            expect(rover.getPosition()).toEqual(expectedPosition);
        });
    });

    describe('pacman effect', () => {
        let rover: Rover;
        const gridSize: [number, number] = [5, 4];

        beforeEach(() => {
            rover = new Rover([0, 0], 'N', gridSize);
        });

        const testMovement = (direction: Direction, startPositions: Position[], endPositions: Position[], moveMethod: 'moveForward' | 'moveBackward') => {
            beforeEach(() => {
                rover.setDirection(direction);
            });

            test.each(startPositions.map((start, index) => [start, endPositions[index]]))(
                `should wrap around the grid when ${moveMethod} from %p to %p`,
                (start, end) => {
                    rover.setPosition(start);
                    rover[moveMethod]();
                    expect(rover.getPosition()).toEqual(end);
                }
            );
        };

        describe('move forward', () => {
            describe('top edge, direction N', () => {
                testMovement('N', [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], 'moveForward');
            });

            describe('bottom edge, direction S', () => {
                testMovement('S', [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], 'moveForward');
            });

            describe('left edge, direction W', () => {
                testMovement('W', [[0, 0], [0, 1], [0, 2], [0, 3]], [[4, 0], [4, 1], [4, 2], [4, 3]], 'moveForward');
            });

            describe('right edge, direction E', () => {
                testMovement('E', [[4, 0], [4, 1], [4, 2], [4, 3]], [[0, 0], [0, 1], [0, 2], [0, 3]], 'moveForward');
            });
        });

        describe('move backward', () => {
            describe('top edge, direction N', () => {
                testMovement('N', [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], 'moveBackward');
            });

            describe('bottom edge, direction S', () => {
                testMovement('S', [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], 'moveBackward');
            });

            describe('left edge, direction W', () => {
                testMovement('W', [[4, 0], [4, 1], [4, 2], [4, 3]], [[0, 0], [0, 1], [0, 2], [0, 3]], 'moveBackward');
            });

            describe('right edge, direction E', () => {
                testMovement('E', [[0, 0], [0, 1], [0, 2], [0, 3]], [[4, 0], [4, 1], [4, 2], [4, 3]], 'moveBackward');
            });
        });
    });
});
