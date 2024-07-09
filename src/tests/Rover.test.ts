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

    describe('pac-man effect move forward', () => {
        beforeEach(() => {
            rover = new Rover(initialPosition, initialDirection, [5, 4]);
            rover.setDirection('N');
        });
        describe('top edge, direction N', () => {
            it('should wrap around the grid when moving forward from [0, 3] to [0, 0]', () => {
                rover.setPosition([0, 3]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([0, 0]);
            });

            it('should wrap around the grid when moving forward from [1, 3] to [1, 0]', () => {
                rover.setPosition([1, 3]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([1, 0]);
            });

            it('should wrap around the grid when moving forward from [2, 3] to [2, 0]', () => {
                rover.setPosition([2, 3]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([2, 0]);
            });

            it('should wrap around the grid when moving forward from [3, 3] to [3, 0]', () => {
                rover.setPosition([3, 3]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([3, 0]);
            });

            it('should wrap around the grid when moving forward from [4, 3] to [4, 0]', () => {
                rover.setPosition([4, 3]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([4, 0]);
            });
        });

        describe('bottom edge, direction S', () => {
            beforeEach(() => {
                rover = new Rover(initialPosition, initialDirection, [5, 4]);
                rover.setDirection('S');
            });

            it('should wrap around the grid when moving forward from [0, 0] to [0, 3]', () => {
                rover.setPosition([0, 0]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([0, 3]);
            });

            it('should wrap around the grid when moving forward from [1, 0] to [1, 3]', () => {
                rover.setPosition([1, 0]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([1, 3]);
            });

            it('should wrap around the grid when moving forward from [2, 0] to [2, 3]', () => {
                rover.setPosition([2, 0]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([2, 3]);
            });

            it('should wrap around the grid when moving forward from [3, 0] to [3, 3]', () => {
                rover.setPosition([3, 0]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([3, 3]);
            });

            it('should wrap around the grid when moving forward from [4, 0] to [4, 3]', () => {
                rover.setPosition([4, 0]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([4, 3]);
            });
        });

        describe('left edge, direction W', () => {
            beforeEach(() => {
                rover = new Rover(initialPosition, initialDirection, [5, 4]);
                rover.setDirection('W');
            });

            it('should wrap around the grid when moving forward from [0, 0] to [4, 0]', () => {
                rover.setPosition([0, 0]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([4, 0]);
            });

            it('should wrap around the grid when moving forward from [0, 1] to [4, 1]', () => {
                rover.setPosition([0, 1]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([4, 1]);
            });

            it('should wrap around the grid when moving forward from [0, 2] to [4, 2]', () => {
                rover.setPosition([0, 2]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([4, 2]);
            });

            it('should wrap around the grid when moving forward from [0, 3] to [4, 3]', () => {
                rover.setPosition([0, 3]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([4, 3]);
            });
        });

        describe('right edge, direction E', () => {
            beforeEach(() => {
                rover = new Rover(initialPosition, initialDirection, [5, 4]);
                rover.setDirection('E');
            });

            it('should wrap around the grid when moving forward from [4, 0] to [0, 0]', () => {
                rover.setPosition([4, 0]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([0, 0]);
            });

            it('should wrap around the grid when moving forward from [4, 1] to [0, 1]', () => {
                rover.setPosition([4, 1]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([0, 1]);
            });

            it('should wrap around the grid when moving forward from [4, 2] to [0, 2]', () => {
                rover.setPosition([4, 2]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([0, 2]);
            });

            it('should wrap around the grid when moving forward from [4, 3] to [0, 3]', () => {
                rover.setPosition([4, 3]);
                rover.moveForward();
                expect(rover.getPosition()).toEqual([0, 3]);
            });
        });
    });

    describe('pac-man effect move backward', () => {
        describe('top edge, direction N', () => {
            beforeEach(() => {
                rover = new Rover(initialPosition, initialDirection, [5, 4]);
                rover.setDirection('N');
            });

            it('should wrap around the grid when moving backward from [0, 0] to [0, 3]', () => {
                rover.setPosition([0, 0]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([0, 3]);
            });

            it('should wrap around the grid when moving backward from [1, 0] to [1, 3]', () => {
                rover.setPosition([1, 0]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([1, 3]);
            });

            it('should wrap around the grid when moving backward from [2, 0] to [2, 3]', () => {
                rover.setPosition([2, 0]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([2, 3]);
            });

            it('should wrap around the grid when moving backward from [3, 0] to [3, 3]', () => {
                rover.setPosition([3, 0]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([3, 3]);
            });

            it('should wrap around the grid when moving backward from [4, 0] to [4, 3]', () => {
                rover.setPosition([4, 0]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([4, 3]);
            });
        });

        describe('bottom edge, direction S', () => {
            beforeEach(() => {
                rover = new Rover(initialPosition, initialDirection, [5, 4]);
                rover.setDirection('S');
            });

            it('should wrap around the grid when moving backward from [0, 3] to [0, 0]', () => {
                rover.setPosition([0, 3]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([0, 0]);
            });

            it('should wrap around the grid when moving backward from [1, 3] to [1, 0]', () => {
                rover.setPosition([1, 3]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([1, 0]);
            });

            it('should wrap around the grid when moving backward from [2, 3] to [2, 0]', () => {
                rover.setPosition([2, 3]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([2, 0]);
            });

            it('should wrap around the grid when moving backward from [3, 3] to [3, 0]', () => {
                rover.setPosition([3, 3]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([3, 0]);
            });

            it('should wrap around the grid when moving backward from [4, 3] to [4, 0]', () => {
                rover.setPosition([4, 3]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([4, 0]);
            });
        });

        describe('left edge, direction W', () => {
            beforeEach(() => {
                rover = new Rover(initialPosition, initialDirection, [5, 4]);
                rover.setDirection('W');
            });

            it('should wrap around the grid when moving backward from [4, 0] to [0, 0]', () => {
                rover.setPosition([4, 0]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([0, 0]);
            });

            it('should wrap around the grid when moving backward from [4, 1] to [0, 1]', () => {
                rover.setPosition([4, 1]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([0, 1]);
            });

            it('should wrap around the grid when moving backward from [4, 2] to [0, 2]', () => {
                rover.setPosition([4, 2]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([0, 2]);
            });

            it('should wrap around the grid when moving backward from [4, 3] to [0, 3]', () => {
                rover.setPosition([4, 3]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([0, 3]);
            });
        });

        describe('right edge, direction E', () => {
            beforeEach(() => {
                rover = new Rover(initialPosition, initialDirection, [5, 4]);
                rover.setDirection('E');
            });

            it('should wrap around the grid when moving backward from [0, 0] to [4, 0]', () => {
                rover.setPosition([0, 0]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([4, 0]);
            });

            it('should wrap around the grid when moving backward from [0, 1] to [4, 1]', () => {
                rover.setPosition([0, 1]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([4, 1]);
            });

            it('should wrap around the grid when moving backward from [0, 2] to [4, 2]', () => {
                rover.setPosition([0, 2]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([4, 2]);
            });

            it('should wrap around the grid when moving backward from [0, 3] to [4, 3]', () => {
                rover.setPosition([0, 3]);
                rover.moveBackward();
                expect(rover.getPosition()).toEqual([4, 3]);
            });
        });
    });

});
