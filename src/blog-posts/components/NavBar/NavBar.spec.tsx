import { render } from "../../../tests/utils";
import NavBar from ".";

describe("NavBar components", () => {
    it("render", () => {
        const { container } = render(<NavBar />)

        const nav = container.querySelector('[class*="nav"]')
        expect(nav).toBeInTheDocument()

        const link = container.querySelector('a[href]')
        expect(link).toBeInTheDocument()
        expect(link!.innerHTML).toBe('home')
    })
})
