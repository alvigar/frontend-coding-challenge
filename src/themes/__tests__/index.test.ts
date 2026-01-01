import { osapiens } from "../index";
import osapiensTheme from "../default";

describe("Themes", () => {
    it("exports osapiens theme with light variant", () => {
        expect(osapiens).toBeDefined();
        expect(osapiens.light).toBeDefined();
        expect(osapiens.light).toBe(osapiensTheme.light);
    });
});
