import sum_0 from './sum-curry.0'
import sum_1 from './sum-curry.0'

const arr = [sum_0, sum_1]

arr.forEach((sum, index) => {
  describe(`sum-curry - ${index}`, () => {
    test(`sum(1, 2, 3)`, () => {
      const received = sum(1, 2, 3).sumOf()
      expect(received).toBe(6)
    })

    test(`sum(2, 3)(2)`, () => {
      const received = sum(2, 3)(2).sumOf()
      expect(received).toBe(7)
    })

    test(`sum(1)(2)(3)(4)`, () => {
      const received = sum(1)(2)(3)(4).sumOf()
      expect(received).toBe(10)
    })

    test(`sum(2)(4, 1)(2)`, () => {
      const received = sum(2)(4, 1)(2).sumOf()
      expect(received).toBe(9)
    })
  })
})
