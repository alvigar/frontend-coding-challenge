import theme from "../index";

describe("Default Theme", () => {
    it("exports theme structure", () => {
        expect(theme).toBeDefined();
        expect(theme.light).toBeDefined();
        expect(theme.dark).toBeDefined();

        // Deep check to ensure branches/statements in setup are covered
        expect(theme.light.palette).toBeDefined();
        expect(theme.light.palette.mode).toBe("light");
    });
});
