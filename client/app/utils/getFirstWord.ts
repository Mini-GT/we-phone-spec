export function getFirstWord(sentence: string): string {
  if (!sentence || typeof sentence !== "string") {
    return "";
  }
  return sentence.trim().split(" ")[0];
}