import { render, screen, waitFor } from "../../../tests/utils"
import PostTemplate from ".";

describe("PostTemplate", () => {
    it("renders", async () => {
        const date = "2024-01-10"
        render(<PostTemplate filename="clean-code-in-vue" date={date} />)
        await waitFor(() => {
            expect(screen.getByText("Vue clean code in daily work")).toBeInTheDocument()
            expect(screen.getByText(date)).toBeInTheDocument()
        })
    })

    it("renders with error file", async () => {
        const date = "2024-01-10", filename = "clean-code-in-react"
        const { container } = render(<PostTemplate filename={filename} date={date} />)
        await waitFor(() => {
            const h1 = container.querySelector('h1')
            expect(h1?.innerHTML.includes('Not found')).toBeTruthy()
            expect(container.querySelector('h2')).toBeInTheDocument()
        })
    })
})
