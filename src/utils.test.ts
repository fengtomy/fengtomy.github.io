import { generateHeadingId } from './utils'

describe("generateHeadingId function", () => {
    it("normal", () => {
        expect(generateHeadingId('Hello world (test)')).toBe('hello-world-test')
        expect(generateHeadingId('Hello world (Test).')).toBe('hello-world-test')
    })
})
