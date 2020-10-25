const clone = (value) => {
  if (typeof value !== 'object') {
    return value
  } else {
    return JSON.parse(JSON.stringify(value))
  }
}

const canIuseNextTick = wx.canIUse('nextTick')
const nextTick = (fn) => {
  if (canIuseNextTick) {
    return wx.nextTick(fn)
  } else {
    return new Promise.resolve().then(fn)
  }
}
class Store {
  constructor(data = {}) {
    this.data = data
    this.deps = []
    this.updateQue = new Set()
    this.wait = true
  }

  addDep(instance) {
    this.deps.push(instance)
  }

  enterQue(dep, addedContext) {
    const que = this.updateQue
    console.log(dep, 'enterQue')
    if (que.has(dep)) {
      Object.assign(dep.context, addedContext)   // 合并状态 最后调用一次setData
    } else {
      dep.context = addedContext
      this.updateQue.add(dep)
    }
  }

  flashQue() {
    this.updateQue.forEach(dep => {
      dep.setData(dep.context, () => {
        dep.context = null
      })
    })
    this.wait = true
    this.updateQue.clear()
    this.watchs = new Map()
  }

  addWatch(objectiveKey, cb) {
    const cbs = this.watchs.get(objectiveKey)
    if (cbs) {
      cbs.push(cb)
    } else {
      this.watchs.set(objectiveKey, [cb])
    }
  }

  notifyWatchs(payloadKeys) {
    payloadKeys.forEach(key => {
      const cbs = this.watchs.get(key)

      nextTick(  // 允许在某个实例监听的函数执行中，插入响应监听的微任务逻辑
                 // 因为有可能想拿到监听后的操作

        cbs.forEach(cb => cb())
      )
    })
  }

  setData(payload) {
    const payloadKeys = Object.keys(payload)
    this.data = Object.assign(this.data, payload)
    
    this.deps.forEach(dep => {
      const instanceDataKeys = Object.keys(dep.data) // 只传递那些组件或者页面UI data中所需要的key
      if (!instanceDataKeys.length) return

      const context = Object.create(null)
      const includsKeys = payloadKeys.filter(payloadKey => {
        if (instanceDataKeys.includes(payloadKey)) {
          context[payloadKey] = clone(this.data[payloadKey])
          return true
        } else {
          return false
        }
      })
      if (includsKeys.length) {
        this.enterQue(dep, context)
      }
    })
    
    this.wait
      && nextTick(this.flashQue())
      && nextTick(this.notifyWatchs(payloadKeys))
  }

}
const useStore = (data) => {
  const store = new Store(data)

  return { store }
}

const useWatch = () => {
  const hasInstalledStore = i => Object.hasOwnProperty.call(i, 'store')
  
  const useWatch = function (objectiveKey, cb) {
    if (!hasInstalledStore(this)) {
      return 
    }
    this.store.addWatch(objectiveKey, cb)
  }

  const useWatchOnce = function (objectiveKey, cb) {
    const _cb = () => {
      cb()
      setTimeout(() => {
        const cbs = this.store.watchs.get(objectiveKey)
        this.store.watchs.set(objectiveKey, cbs.filter(c => c !== cb))
      })
    }
    this.store.addWatch(objectiveKey, _cb)
  }

  return {
    useWatch,
    useWatchOnce,
  }
}

module.exports = {
  useStore,
  useWatch,
}
