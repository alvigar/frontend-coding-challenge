import { routes } from "../routes";

describe("Routes", () => {
    it("defines routes correctly", () => {
        expect(routes).toBeDefined();
        expect(Array.isArray(routes)).toBe(true);
        expect(routes.length).toBeGreaterThan(0);

        // Check structure of first route
        const firstRoute = routes[0];
        expect(firstRoute).toHaveProperty("path");
        expect(firstRoute).toHaveProperty("Component");
    });
});
