import { buildUrl, validateParams } from "../router";

describe("router utils", () => {
    describe("validateParams", () => {
        it("should return true for valid params", () => {
            const path = "/user/:id";
            const params = { id: "123" };
            expect(validateParams(path, params)).toBe(true);
        });

        it("should return false for missing params", () => {
            const path = "/user/:id";
            const params = { name: "test" };
            expect(validateParams(path, params)).toBe(false);
        });

        it("should return false for null or non-object params", () => {
            expect(validateParams("/:id", null)).toBe(false);
            expect(validateParams("/:id", "string")).toBe(false);
        });

        it("should handle paths without params", () => {
            expect(validateParams("/home", {})).toBe(true);
        });
    });

    describe("buildUrl", () => {
        it("should replace params in path", () => {
            const path = "/user/:id/settings/:section";
            const params = { id: "123", section: "general" };
            expect(buildUrl(path, params)).toBe("/user/123/settings/general");
        });

        it("should return path as is if no params in path", () => {
            const path = "/home";
            const params = {};
            expect(buildUrl(path, params)).toBe("/home");
        });
    });
});
