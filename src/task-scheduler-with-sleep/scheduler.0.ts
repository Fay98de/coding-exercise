type Task = () => any | Promise<any>

class Scheduler {
  queue: Task[] = []
  current?: any | Promise<any> = undefined

  constructor() {}

  sleep(time: number) {
    this.queue.push(() => new Promise((resolve) => setTimeout(resolve, time)))
    this.next()
    return this
  }

  addTask(task: Task) {
    this.queue.push(task)
    this.next()
    return this
  }

  async next() {
    if (this.current) return
    const task = this.queue.shift()
    if (!task) return
    this.current = task()
    if (this.current instanceof Promise) {
      try {
        await this.current
      } catch (error) {
      } finally {
        this.current = undefined
        this.next()
      }
    } else {
      this.current = undefined
      this.next()
    }
  }
}

export default Scheduler
