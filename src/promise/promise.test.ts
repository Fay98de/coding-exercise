import FakePromise_0 from './promise.0'

const arr = [FakePromise_0]

arr.forEach((FakePromise, index) => {
  describe(`Test FakePromise - ${index}`, () => {
    test(`resolve and then`, async () => {
      const p1 = new FakePromise((resolve, reject) => resolve(0))
      const value = await p1
      const fn = jest.fn()
      const p2 = p1.then(fn)
      expect(value).toBe(0)
      expect(p2).toBe(p1)
      expect(fn).toBeCalledWith(0)
    })

    test(`reject and catch`, async () => {
      const error = new Error('error')
      const p1 = new FakePromise((resolve, reject) => reject(error))
      const fn1 = jest.fn()
      const fn2 = jest.fn()
      const fn3 = jest.fn()
      const p2 = p1.then(fn1, fn2)
      const p3 = p1.catch(fn3)
      expect(fn1).not.toBeCalled()
      expect(fn2).toBeCalledWith(error)
      expect(fn3).toBeCalledWith(error)
      expect(p2).toBe(p1)
      expect(p3).toBe(p1)
    })
  })
})
