import { main } from './main';

const inputFilePath = process.argv[2];

if (!inputFilePath) {
    console.error('Please provide the input file path as an argument. Ex: "pnpm start src/input.txt"');
    process.exit(1);
}

main(inputFilePath);
