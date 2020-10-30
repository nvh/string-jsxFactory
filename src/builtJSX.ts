export interface Variable {
  name: string;
  value: unknown;
}

export function buildJSX(name, props, ...children) {
  if (typeof name.name === "string") {
    // This is hacky
    name = name.name;
  }
  let result = `<${name}`;
  if (props) {
    result += " " + formatAttrs(props);
  }
  if (children?.some((child) => child !== undefined)) {
    result += `>${children.join("")}</${name}>`;
  } else {
    result += `/>`;
  }
  // console.log("buildJSX", {
  //   name,
  //   props,
  //   children,
  //   result,
  // });
  return result;
}

function formatAttrs(attributes: Record<string, unknown>) {
  if (!attributes) return;

  let output = "";
  for (const key in attributes) {
    const value = attributes[key];
    if (output) {
      output += " ";
    }
    output += formatAttribute(key, value);
  }

  return output;
}

function formatAttribute(key: string, value: unknown) {
  const type = typeof value;
  let output = `${key}=`;
  switch (type) {
    case "string":
      output += `"${escapeValue(value as string)}"`;
      break;
    case "undefined":
    case "number":
    case "object":
      output += `{${JSON.stringify(value)}}`;
      break;
    case "function":
      // This is hacky
      output += `{${(value as Function).name}}`;
      break;
    default:
      throw Error(`Unimplemented attribute type: ${type}`);
  }
  return output;
}

function escapeText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeValue(value: string) {
  return escapeText(value).replace(/"/g, "&quot;");
}
