interface TaskItem {
  resolve: (value: number) => void
  reject: (reason?: any) => void
  task: () => any | Promise<any>
}

class Scheduler {
  limit: number = 0
  concurrent: number = 0
  queue: TaskItem[] = []
  processTasks: TaskItem[] = []

  constructor(limit: number) {
    this.limit = limit
  }

  addTask(task: TaskItem['task']): Promise<number> {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject, task })
      if (this.concurrent < this.limit) {
        this.next()
      }
    })
  }

  async next() {
    const taskItem = this.queue.shift()
    if (!taskItem) return
    const { resolve, reject, task } = taskItem
    this.concurrent++
    try {
      const result = await task()
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      this.concurrent--
      this.next()
    }
  }
}

export default Scheduler
