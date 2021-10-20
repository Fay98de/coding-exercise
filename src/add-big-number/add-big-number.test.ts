import add_0 from './add-big-number.0'

const arr = [add_0]

arr.forEach((add, index) => {
  describe(`Add big number test - ${index}`, () => {
    test(`9007199254740991 + 1234567899999999999 => 1243575099254740990`, () => {
      const received = add('9007199254740991', '1234567899999999999')
      expect(received).toBe('1243575099254740990')
    })
  })
})
