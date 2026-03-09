import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router";

/* eslint-disable react-refresh/only-export-components */

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
    return render(ui, { ...options, wrapper: Wrapper })
}

export * from "@testing-library/react"
export { customRender as render }
