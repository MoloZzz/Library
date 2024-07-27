export function generateFormular(): string {
  const randomNumber =
    Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000;
  return randomNumber.toString();
}
