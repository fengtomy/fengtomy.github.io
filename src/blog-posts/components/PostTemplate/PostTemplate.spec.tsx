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
})
