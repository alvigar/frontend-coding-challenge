import { resultOrError } from "../global";

describe("global utils", () => {
    describe("resultOrError", () => {
        it("should return result and null error on success", async () => {
            const promise = Promise.resolve("success");
            const [result, error] = await resultOrError(promise);
            expect(result).toBe("success");
            expect(error).toBeNull();
        });

        it("should return null result and error on failure", async () => {
            const errorObj = new Error("failure");
            const promise = Promise.reject(errorObj);
            const [result, error] = await resultOrError(promise);
            expect(result).toBeNull();
            expect(error).toBe(errorObj);
        });
    });
});
