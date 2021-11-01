type State = 'pending' | 'fulfilled' | 'rejected'
type Resolve<T> = (value: T) => void
type Reject = (reason: any) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void
type fulfilledCallback<T> = (value: T) => void
type rejectedCallback<T> = (reason: any) => void
type finallyCallback = () => void

class FakePromise<T> {
  static resolve: <T>(value: T) => FakePromise<T> = (value) =>
    new FakePromise((resolve) => resolve(value))
  static reject: <T>(reason: any) => FakePromise<T> = (reason) =>
    new FakePromise((resolve, reject) => reject(reason))

  private state: State = 'pending'
  private data?: T
  private reason?: any

  private fulfilledCallbacks: fulfilledCallback<T>[] = []
  private rejectedCallbacks: rejectedCallback<T>[] = []
  // private finallyCallbacks: finallyCallback[] = []

  constructor(executor: Executor<T>) {
    const resolve = this.resolveFunc()
    const reject = this.rejectFunc()
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  private resolveFunc() {
    return (value: T) => {
      if (this.state !== 'pending') return
      this.state = 'fulfilled'
      this.data = value
      this.fulfilledCallbacks.forEach((callback) => callback(value))
    }
  }

  private rejectFunc() {
    return (reason: any) => {
      if (this.state !== 'pending') return
      this.state = 'rejected'
      this.reason = reason
      this.rejectedCallbacks.forEach((callback) => callback(reason))
    }
  }

  private handleRejected(onrejected?: rejectedCallback<T>) {
    if (!onrejected) return FakePromise.reject(this.reason)
    try {
      return FakePromise.resolve(onrejected(this.reason))
    } catch (error) {
      return FakePromise.reject(error)
    }
  }

  then(onfulfilled?: fulfilledCallback<T>, onrejected?: rejectedCallback<T>) {
    if (this.state === 'fulfilled') {
      if (!onfulfilled) return FakePromise.resolve(this.data)
      try {
        return FakePromise.resolve(onfulfilled(this.data!))
      } catch (error) {
        return FakePromise.reject(error)
      }
    }
    if (this.state === 'rejected') {
      return this.handleRejected(onrejected)
    }
    return new FakePromise<T>((resolve, reject) => {
      this.fulfilledCallbacks.push((value) => {
        resolve(onfulfilled ? onfulfilled(value)! : value)
      })
      this.rejectedCallbacks.push((reason) => {
        reject(onrejected ? onrejected(reason) : reason)
      })
    })
  }

  catch(onrejected?: rejectedCallback<T>) {
    if (this.state === 'fulfilled') {
      return FakePromise.resolve(this.data)
    }
    if (this.state === 'rejected') {
      return this.handleRejected(onrejected)
    }
    return new FakePromise<T>((resolve, reject) => {
      this.fulfilledCallbacks.push(resolve)
      this.rejectedCallbacks.push((reason) => {
        reject(onrejected ? onrejected(reason) : reason)
      })
    })
  }

  finally(onfinally?: finallyCallback) {
    if (this.state === 'fulfilled') {
      return FakePromise.resolve(this.data)
    }
    if (this.state === 'rejected') {
      return FakePromise.reject(this.reason)
    }
    return new Promise((resolve, reject) => {
      this.fulfilledCallbacks.push((value) => {
        onfinally && onfinally()
        resolve(value)
      })
      this.rejectedCallbacks.push((reason) => {
        onfinally && onfinally()
        reject(reason)
      })
    })
  }
}

export default FakePromise
