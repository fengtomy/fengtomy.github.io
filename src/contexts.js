import { createContext } from "react";

export const BlogSketchContext = createContext({
  sketch: [],
  setSketch: () => {},
})