import * as React from "react";
import { Component as ReactComponent } from "react";

export function FunctionComponent(props: { test: number }) {
  return <div>{props.test}</div>;
}

export class ClassComponent extends ReactComponent<{ test: object }> {
  render() {
    return <div />;
  }
}

export const ForwardRefComponent = React.forwardRef(
  (props, ref: React.MutableRefObject<HTMLDivElement>) => {
    return <div {...props} ref={ref} />;
  }
);
// This is needed to make it work for forwardRefs
Object.assign(ForwardRefComponent, { name: "ForwardRefComponent" });
