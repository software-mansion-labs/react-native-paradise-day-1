import { parseErrorStack } from "@expo/metro-runtime/src/symbolicate";

export function notImplemented(): () => void {
  const error = new Error("Not implemented");
  return () => {
    const stack = parseErrorStack(error.stack);
    console.error(
      `Some functions are not implemented in ${stack[1].methodName}`
    );
  };
}
