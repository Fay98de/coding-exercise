function sum(...args: number[]) {
  sum.args = sum.args.concat(args)
  return sum
}

function sumOf() {
  let ans = 0
  sum.args.forEach((n) => (ans += n))
  sum.args = []
  console.log(ans)
  return ans
}

sum.args = [] as number[]
sum.sumOf = sumOf

export default sum
