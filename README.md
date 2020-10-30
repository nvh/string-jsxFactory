# String jsxFactory 

A proof of concept of using a custom jsxFactory to generate JSX code.

See discussion here: https://github.com/framer/FramerStudio/pull/6615#issuecomment-719424889


## Getting started

```
yarn install
yarn test
```

## Structure 
- `index.ts` The main function that shows a bunch of usages and prints the output
- `buildJSX.ts` The factory that generates strings from the provided JSX
- `generateCode` The file that uses the custom factory. All functions returning JSX inside this file will be returning strings.

## Caveats

### Component structure
The components passed in as first argument of the JSX function have a wide variety of structures, and some of them (like forwardrefs, so `motion.div` for example) can not be resolved to the initial string that created the calls. Others (like classes and function components) might have a `.name` field when built on development, but that will be different when minimized.

### Variables in props
It's only possible to pass values in the JSX props, no variables. This POC has hack where you can pass in functions and we only use the `.name` of the function, and the return value of the function as value to assing to a content in code.

### Pretty Printing
Pretty printing (which we might want eventually) will be tricky without keeping state in the jsx function.

### Spreading and inline objects
Some styles of JSX, like spreading props, or inline a object with one variable are not possible without hacks

### esbuild
esbuild does not support per file JSX functions, so we would need a separate loader for that.

