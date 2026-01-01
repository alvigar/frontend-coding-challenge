import tokens from "../tokens";

describe("Tokens", () => {
    it("exports tokens structure", () => {
        expect(tokens).toBeDefined();
        expect(tokens.color).toBeDefined();
        expect(tokens.style).toBeDefined();
        expect(tokens.breakpoints).toBeDefined();
    });
});
