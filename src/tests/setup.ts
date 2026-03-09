import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vitest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vitest.fn(),
        removeEventListener: vitest.fn(),
        dispatchEvent: vitest.fn(),
    }))
})

afterEach(() => {
    cleanup()
})