import Scheduler_0 from './scheduler.0'

function createTask(time: number, fn: () => void, error?: string) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn())
      }, time)
    })
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const arr = [Scheduler_0]

arr.forEach((Scheduler, index) => {
  describe(`Test task scheduler with sleep - ${index}`, () => {
    test(`addTask, sleep should be chainable`, () => {
      const scheduler = new Scheduler()
      expect(scheduler.addTask(jest.fn())).toBe(scheduler)
      expect(scheduler.sleep(0)).toBe(scheduler)
    })

    test(`sync task`, () => {
      const scheduler = new Scheduler()
      const result: number[] = []
      scheduler
        .addTask(() => result.push(0))
        .addTask(() => result.push(1))
        .addTask(() => result.push(2))
      expect(result).toEqual([0, 1, 2])
    })

    test(`async task`, async () => {
      const scheduler = new Scheduler()
      const result: number[] = []
      scheduler
        .addTask(createTask(100, () => result.push(0)))
        .addTask(createTask(100, () => result.push(1)))
        .addTask(createTask(100, () => result.push(2)))
      await sleep(400)
      expect(result).toEqual([0, 1, 2])
    })

    test(`sync task with sleep`, async () => {
      const scheduler = new Scheduler()
      const start = Date.now()
      let cost: number = 0
      scheduler
        .addTask(jest.fn())
        .sleep(100)
        .addTask(() => (cost = Date.now() - start))
      await sleep(100)
      expect(cost >= 100).toBeTruthy()
    })

    test(`async task with sleep`, async () => {
      const scheduler = new Scheduler()
      const start = Date.now()
      let cost: number = 0
      scheduler
        .addTask(createTask(100, () => console.log(Date.now() - start)))
        .sleep(100)
        .addTask(createTask(100, () => console.log(Date.now() - start)))
        .sleep(200)
        .addTask(
          createTask(100, () => {
            console.log(Date.now() - start)
            cost = Date.now() - start
          })
        )
      await sleep(800)
      expect(cost >= 600).toBeTruthy()
    })
  })
})
