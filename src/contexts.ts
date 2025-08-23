import { createContext, Context } from "react";

export interface IBlogSketch {
  type: 1 | 2 | 3 | 4 | 5 | 6,
  text: string,
}

export type IBlogSketchContext = {
  sketch: IBlogSketch[],
  setSketch: (newSketch: IBlogSketch[]) => void,
}

export const BlogSketchContext = createContext<IBlogSketchContext>({
  sketch: [],
  setSketch: (newSketch: IBlogSketch[]) => {},
})