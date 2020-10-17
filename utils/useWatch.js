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
        enterQue(dep, context)
      }
    })

    this.wait && nextTick(this.flashQue())
  }

}
const useStore = (data) => {
  const store = new Store(data)
  return { store }
}

module.exports = {
  useStore
}
