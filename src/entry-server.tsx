import { renderToString } from "react-dom/server";
import { App } from "./main";
import { StrictMode } from "react";

export async function render(_url: string) {
    const html = renderToString(
        <StrictMode>
            <App />
        </StrictMode>
    )
    console.log('html', html)
    return { html }
}