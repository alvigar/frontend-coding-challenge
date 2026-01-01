import UserStore from "../store";
import { ActionResultStatus } from "../../../../types/global";

describe("UserStore", () => {
    beforeEach(() => {
        jest.useFakeTimers();
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
        const fetchPromise = store.getOwnUser();

        // Fast-forward time to resolve the internal timeout
        jest.runAllTimers();

        const result = await fetchPromise;

        expect(result.status).toBe(ActionResultStatus.SUCCESS);
        if (result.status === ActionResultStatus.SUCCESS) {
            expect(result.result).toEqual({
                firstName: "Aria",
                lastName: "Test",
                eMail: "linda.bolt@osapiens.com"
            });
        }

        expect(store.user).toEqual({
            firstName: "Aria",
            lastName: "Test",
            eMail: "linda.bolt@osapiens.com"
        });
    });
});
