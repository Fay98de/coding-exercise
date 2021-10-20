import flat_0 from './array-flat.0'

const arr = [flat_0]

arr.forEach((flat, index) => {
  describe(`Array flat test - ${index}`, () => {
    test(`Basic`, () => {
      const received = flat([
        1,
        2,
        3,
        4,
        [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
        5,
        'string',
        { name: 'Jim' },
      ])
      expect(received).toEqual([
        1,
        2,
        3,
        4,
        1,
        2,
        3,
        1,
        2,
        3,
        1,
        2,
        3,
        5,
        'string',
        { name: 'Jim' },
      ])
    })
  })
})
