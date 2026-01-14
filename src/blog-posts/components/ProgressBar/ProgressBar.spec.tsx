import { render } from '@testing-library/react'
import ProgressBar from '.'

describe("ProgressBar component", () => {
    it("renders", () => {
        const { container } = render(<ProgressBar progressBarRef={{ current: null }} />)

        const progressBar = container.querySelector('[class*="progressBar"]')
        expect(progressBar).toBeInTheDocument()

        const progressBarInner = container.querySelector('[class*="progressBarInner"]')
        expect(progressBarInner).toBeInTheDocument()
    })
})
