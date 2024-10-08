export function useNumericCheck (numericChecked: string): boolean {
  const numericRegExp = /^[0-9]$/
  return numericRegExp.test(numericChecked)
}
