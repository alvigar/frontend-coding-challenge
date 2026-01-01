import services from "../index";

describe("Services Entry", () => {
    it("exports array of providers", () => {
        expect(Array.isArray(services)).toBe(true);
        expect(services.length).toBeGreaterThan(0);
    });
});
