function flat(arr: any[]): any[] {
  let ans: any[] = []

  for (let item of arr) {
    if (Array.isArray(item)) {
      ans = ans.concat(flat(item))
    } else {
      ans.push(item)
    }
  }

  return ans
}

export default flat
