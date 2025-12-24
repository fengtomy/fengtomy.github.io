import { renderAnchor } from "./utils"
import { render, screen } from "@testing-library/react"

describe("PostTemplate utils", () => {
    it("renderAnchor with local href", () => {
        const localHref = "#hello-world" 
        render(renderAnchor({ children: 'hello world', href: localHref }))
        expect(screen.getByText('hello world').getAttribute('href')).toBe(localHref)
    })
    it("renderAnchor with internet link", () => {
        const link = "https://fengtomy.github.io/hello-world"
        render(renderAnchor({ children: 'hello world', href: link }))
        expect(screen.getByText('hello world').getAttribute('href')).toBe(link)
    })
})