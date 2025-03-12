export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}) {
  console.log(`Hello from native intent 👋`);
  console.log({ path, initial });
  return path;
}
