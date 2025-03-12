export function notImplemented(): () => void {
  const error = new Error("Not implemented");
  return () => {
    console.error(error);
  };
}
