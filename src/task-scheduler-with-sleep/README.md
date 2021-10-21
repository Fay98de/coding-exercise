# 带休眠的异步任务调度器

```js
// JS 实现一个带休眠的异步任务调度器 Scheduler
// 支持如下能力：

class Scheduler {
  constructor() {}

  sleep(time) {}

  addTask(task) {}
}

const scheduler = new Scheduler()

scheduler
  .addTask(() => {
    console.log(1)
  })
  .sleep(100)
  .addTask(() => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log(2)
        resolve()
      }, 200)
    )
  })
  .sleep(300)
  .addTask(() => {
    console.log(3)
  })

// 输出：1
// 等待 100 ms
// 200 ms 后，输出：2
// 等待 300 ms
// 输出：3
```
