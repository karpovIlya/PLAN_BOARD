export function getCorrectDeclination (amount: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2]
  let selectedСase = 0

  if (amount % 100 > 4 && amount % 100 < 20) {
    selectedСase = 2
  } else {
    selectedСase = cases[(amount % 10 < 5) ? amount % 10 : 5]
  }

  return titles[selectedСase]
}
