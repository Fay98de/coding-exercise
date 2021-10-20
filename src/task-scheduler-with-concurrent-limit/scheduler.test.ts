import Scheduler_0 from './scheduler.0'

const arr = [Scheduler_0]

function createTask(time: number, order: number, error?: string) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        error ? reject(error) : resolve(order)
      }, time)
    })
  }
}

arr.forEach((Scheduler, index) => {
  describe(`Test task scheduler - ${index}`, () => {
    test(`case 1`, async () => {
      const scheduler = new Scheduler(2)
      const result: (number | string)[] = []
      const argsList: [number, number][] = [
        [1000, 1],
        [500, 2],
        [300, 3],
        [400, 4],
      ]
      const promises = argsList.map((args) => {
        const task = createTask(...args)
        const promise = scheduler.addTask(task)
        promise.then((value) => result.push(value)).catch((error) => result.push(error))
        return promise
      })
      await Promise.allSettled(promises)
      expect(result).toEqual([2, 3, 1, 4])
    })

    test(`case 2`, async () => {
      const scheduler = new Scheduler(2)
      const result: (number | string)[] = []
      const argsList: [number, number][] = [
        [1000, 1],
        [500, 2],
        [300, 3],
        [400, 4],
        [200, 5],
        [2000, 6],
      ]
      const promises = argsList.map((args) => {
        const task = createTask(...args)
        const promise = scheduler.addTask(task)
        promise.then((value) => result.push(value)).catch((error) => result.push(error))
        return promise
      })
      await Promise.allSettled(promises)
      expect(result).toEqual([2, 3, 1, 5, 4, 6])
    })

    test(`case 3 - with task error`, async () => {
      const scheduler = new Scheduler(2)
      const result: (number | string)[] = []
      const argsList: [number, number, string?][] = [
        [1000, 1, 'error-1'],
        [500, 2],
        [300, 3],
        [400, 4],
      ]
      const promises = argsList.map((args) => {
        const task = createTask(...args)
        const promise = scheduler.addTask(task)
        promise.then((value) => result.push(value)).catch((error) => result.push(error))
        return promise
      })
      await Promise.allSettled(promises)
      expect(result).toEqual([2, 3, 'error-1', 4])
    })
  })
})
