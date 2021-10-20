function add(a: string, b: string): string {
  const l = Math.max(a.length, b.length)
  const diff = l - Math.min(a.length, b.length)
  const long = a.length > b.length ? a : b
  const short = long === b ? a : b
  let temp = 0
  let ans = ''

  for (let i = l - 1; i >= 0; i--) {
    const sum = temp + Number(long[i]) + Number(short[i - diff] || 0)
    temp = Math.floor(sum / 10)
    ans = (sum % 10) + ans
  }
  if (temp === 1) {
    ans = '1' + ans
  }

  return ans
}

export default add
