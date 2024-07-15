export type Direction = 'N' | 'E' | 'S' | 'W';
export type Coordinates = [number, number];
export type Position = Coordinates;
export type GridSize = [number, number];
export type Command = 'L' | 'R' | 'F' | 'B';

export type InputFileReaderProps = {
    gridSize: GridSize;
    obstacles: Position[];
    commands: Command[][];
};
