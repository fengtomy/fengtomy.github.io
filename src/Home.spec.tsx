import { render, screen } from "./tests/utils"
import Home from "./Home"
import { homeLinks } from "./utils"

describe("Home component", () => {
    it("renders", () => {
        render(<Home />)
        expect(screen.getByText("Welcome to my online space.")).toBeInTheDocument()
        expect(screen.getByText("Blog Posts")).toBeInTheDocument()
        homeLinks.forEach(({ title }) => {
            expect(screen.getByText(title)).toBeInTheDocument()
        })
    })
})
