import UserStore from "../store";
import { ActionResultStatus } from "../../../../types/global";
import { resultOrError } from "../../../../utils/global";

// Simple mock of the module
jest.mock("../../../../utils/global", () => ({
    __esModule: true,
    resultOrError: jest.fn()
}));

describe("UserStore", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        (resultOrError as jest.Mock).mockClear();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("initializes with null user", () => {
        const store = new UserStore();
        expect(store.user).toBeNull();
    });

    it("fetches own user successfully", async () => {
        const store = new UserStore();

        // Mock successful retrieval
        (resultOrError as jest.Mock).mockResolvedValue([
            {
                firstName: "Aria",
                lastName: "Test",
                eMail: "linda.bolt@osapiens.com"
            },
            null
        ]);

        const fetchPromise = store.getOwnUser();

        // We mocked resultOrError to return immediate promise (mockResolvedValue).
        // The promise passed TO it (with setTimeout) is ignored by the mock.
        // So we don't need runAllTimers.

        const result = await fetchPromise;

        expect(result.status).toBe(ActionResultStatus.SUCCESS);
        // Expect result.result to be the object (checking cast)
        // result.result type is User (from casting in store.ts)
        const user = (result as any).result;
        expect(user.firstName).toBe("Aria");

        expect(store.user).toEqual({
            firstName: "Aria",
            lastName: "Test",
            eMail: "linda.bolt@osapiens.com"
        });
    });

    it("handles failure correctly", async () => {
        const store = new UserStore();
        (resultOrError as jest.Mock).mockResolvedValue([null, new Error("Fetch failed")]);

        const fetchPromise = store.getOwnUser();
        const result = await fetchPromise;

        expect(result.status).toBe(ActionResultStatus.ERROR);
        expect(store.user).toBeNull();
    });

    it("handles unknown state (result and error both null)", async () => {
        const store = new UserStore();
        (resultOrError as jest.Mock).mockResolvedValue([null, null]);

        const fetchPromise = store.getOwnUser();
        const result = await fetchPromise;

        expect(result.status).toBe(ActionResultStatus.ERROR);
        expect((result as any).error).toBe("Something went wrong.");
        expect(store.user).toBeNull();
    });
});
