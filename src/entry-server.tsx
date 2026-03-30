import { renderToString } from "react-dom/server";
import { App } from "./main";
import { StrictMode } from "react";
import { StaticRouter } from "react-router";

export async function render(url: string) {
    const html = renderToString(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
    )
    return { html }
}