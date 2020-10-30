/** @jsx buildJSX */
import { buildJSX } from "./builtJSX";
import { Children, ComponentType, CSSProperties } from "react";
import { motion, MotionProps } from "framer-motion";

export type Variable = () => string | number | object;

export function generateCode<P>(
  Component: ComponentType<P>,
  p: Partial<P>,
  // The variables passed in here are functions with the name of the variable, that return the value of the variable.
  variables?: Partial<Record<keyof P, Variable>>,
  children?: JSX.Element[]
) {
  let output = "";
  for (const key in variables) {
    const value = variables[key]();
    const valueCode = typeof value === "string" ? value : JSON.stringify(value);
    output += `const ${variables[key].name} = ${valueCode}\n`;
  }
  const props: Partial<P> = { ...p, ...variables };
  output += generateComponent(Component, props, children);
  return output;
}

export function generateComponent<P>(
  Component: ComponentType<P>,
  props: P,
  children?: JSX.Element[]
) {
  return <Component {...props}>{children}</Component>;
}

export function motionOrFrameWithmotion(props: MotionProps) {
  if (props.style.border) {
    return (
      <motion.div {...props}>
        <motion.div id="border"></motion.div>
        <p>Hello</p>Whatever
      </motion.div>
    );
  } else {
    return <div style={props.style as CSSProperties} />;
  }
}
