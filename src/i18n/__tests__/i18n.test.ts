import i18n from "../i18n";

describe("i18n", () => {
    it("should be authenticated and initialized", () => {
        expect(i18n).toBeDefined();
        expect(i18n.isInitialized).toBe(true);
    });

    it("should use 'en' as default fallhack or browser language if mocked", () => {
        // Checking if it initialized with a language
        expect(i18n.language).toBeDefined();
    });
});
