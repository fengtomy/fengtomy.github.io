# Integrate TypeScript into React+Vite project

## What is TypeScript

As its website [says](https://www.typescriptlang.org/), TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.  
Typescript adds additional syntax to JavaScript to support a tighter integration with your editor. You can get intelligent code completion, and catch errors earlier in your editor.  
TypeScript code runs anywhere Javascript can run, in a browser, on Node.js, Deno, Bun, in your apps, .etc, all because in the last TypeScript code will be transpiled to JavaScript. As far as I know, you do not even need a TypeScript tooling for it to work on Node.js, because staring with V23.6.0, Node.js natively supports running TypeScript files through directly stripping all types. What a surprising feature.  
And it also provides trust and safety at scale. TypeScript understands Javascript, uses type inference to give you great tooling without additional code. You can gradually migrate your JavaScript apps to TypeScript without hassle, even don't change any JavaScript files at all. You can set up TypeScript environment, and leave all your JavaScript files there. You app can run normally.  

## Benefits

So what makes TypeScript so excellent for large projects? TypeScript inherits majority advantages from JavaScript, but also other benefits coming from static typing and leading syntax not arrived in ECMAScript specification. Especially helpful and powerful when it comes to large scale projects and distributed teams working on the same project.
- gradually migration
- easy to maintain and cooperate in large projects
- rich editor support including error checking, smart code completion, .etc
- syntax preceding ECMAScript specs
- optional static type
- compatibility across platforms
- prosperous community

## How to integrate TypeScript

I think it's easy to find resources about how to integrate TypeScript into your apps no matter what environment it's running, as an example, I only demonstrate how to integrate TypeScript into a React+Vite project, because my blog website is built upon them.

### Install types packages

First of all, install `typescript` globally or locally based on you requirement.  
Then we need to install types packages. Like React project, install `@types/react` and `@types/react-dom` as dev dependencies. If you have installed other packages which need types, you should install corresponding types packages. Like my project uses `react-syntax-highlighter` for vibrant code syntax themes, I need to install `@types/react-syntax-highlighter` package for code completion and type checking for all things imported from it. 

### Set up TypeScript for Vite

1. Add `tsconfig.json` file. This file includes all config about TypeScript environment. Pay attention to prop `compilerOptions.allowJs`. If you want gradual migration process, you can update it to false. Then you can update JavaScript files to TypeScript anytime you're free in following sprints. Check [About tsconfig-json](https://www.typescriptlang.org/zh/docs/handbook/tsconfig-json.html) for more details.
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "composite": true,
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "vite.config.ts"]
}
```
2. Update `vite.config.js` to `vite.config.ts`. This is trivial if there aren't much code in vite config. If you have made lots of changes to it, then you need add corresponding types for code in it. Otherwise type errors will overwhelm you. You will also need to create a `vite-env.d.ts` file under `src` directory.
```typescript
// file content for vite-env.d.ts
/// <reference types="vite/client" />
```

### Update JavaScript files to TypeScript

Here comes the boring yet exciting works. We will need to update all JavaScript files to TypeScript. I know there may be significant amount of work in front. But don't hesitate. Once TypeScript transition works get done, you can harvest all the benefits and advantages TypeScript promises, and also a new cooperation environment between you and your tools, and even your teammates maintaining the same projects.

## Conclusion

Congratulations we have successfully set up a TypeScript project. There must be more spaces TypeScript can play an important role, and TypeScript itself is also evolving, and impacting related tooling and even JavaScript specs. If your projects are still in JavaScript stage, after reading this tutorial, why not choose to upgrade to TypeScript. It will make your project easier to maintain and cooperate.  
Thanks for your reading. If you have other ideas, please concat me <shangfxh@gmail.com>.

