function sum(...args: number[]) {
  let result = 0
  args.forEach((n) => (result += n))

  function sumOf() {
    return result
  }

  function fn(...args: number[]) {
    args.forEach((n) => (result += n))
    return fn
  }

  fn.sumOf = sumOf

  return fn
}

export default sum
