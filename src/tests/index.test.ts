import { sum } from "..";

describe('test the test on sum', () => {
    it('should output 2', () => {
        expect(sum(1, 1)).toBe(2);
    });
});
