# 带并发限制的异步任务调度器

```js
// JS实现一个带并发限制的异步调度器Scheduler，
// 保证同时运行的任务最多有两个。
// 完善代码中Scheduler类，
// 使得以下程序能正确输出

class Scheduler {
  constructor() {}

  add(task) {
    // ...
  }
}

const scheduler = new Scheduler(2)

function createTask(time, order, error) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        error ? reject(error) : resolve(order)
      }, time)
    })
  }
}

const addTask = (time, order, error) => {
  scheduler
    .add(createTask(time, order, error))
    .then((order) => {
      console.log(`异步任务成功: ${order}`)
    })
    .catch((error) => {
      console.log(`异步任务失败: ${order} - ${error}`)
    })
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
```
