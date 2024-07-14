export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = [number, number];
export type GridSize = [number, number];
export type Command = 'L' | 'R' | 'F' | 'B';

export type InputFileReaderProps = {
    gridSize: GridSize;
    obstacles: Position[];
    commands: Command[][];
};
