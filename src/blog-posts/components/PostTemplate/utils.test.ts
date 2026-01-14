import { generateHeadingId } from "@/utils"
import { colorSchemeStore, renderAnchor, renderBr, renderCode, renderH1, renderHead } from "./utils"
import { render, screen, waitFor } from "@testing-library/react"

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

    it("renderH1", () => {
        const child = 'hello world', date = '2026-01-14'
        render(renderH1({ children: child, node: { tagName: 'h1' }  }, date))

        const h1 = screen.getByText(child)
        expect(h1.id).toBe(generateHeadingId(child))
        expect(h1.innerHTML.includes(child)).toBeTruthy()
        expect(h1.innerHTML.includes(date)).toBeTruthy()
        const dateEle = h1.querySelector('[class*=date]')
        expect(dateEle).toBeInTheDocument()
        expect(dateEle?.innerHTML).toBe(date)
    })

    it('renderHead', () => {
        const child = 'hello world', node = { tagName: 'h2' }
        render(renderHead({ children: child, node }))

        const h2 = screen.getByText(child)
        expect(h2).toBeInTheDocument()
        expect(h2.innerHTML).toBe(child)
        expect(h2.id).toBe(generateHeadingId(child))
    })

    it('renderBr', () => {
        const { container } = render(renderBr())
        expect(container.querySelector('[class*="textGapPlaceholder"]')).toBeInTheDocument()
    })

    it('renderCode with plain code element', () => {
        const text = 'typescript'
        const children = text, isLightMode = false, node = { tagName: 'code', children: [{ value: text, type: 'text' }] }
        render(renderCode({ children, isLightMode, node }))

        const codeEle = screen.getByText(text)
        expect(codeEle).toBeInTheDocument()
        expect(codeEle.className.includes('inlineCode')).toBeTruthy()
        expect(codeEle.innerHTML).toBe(text)
    })

    it('colorSchemeStore getServerSnapshot', () => {
        expect(colorSchemeStore.getServerSnapshot()).toBeFalsy()
    })
})