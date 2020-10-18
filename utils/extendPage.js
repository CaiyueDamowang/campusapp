const extendOptions = (options, expantion) => {
  return Object.assign(options, expantion);
};

const mergePlugins = (initialOptions, plugins) => {
  const reducer = (context, plugin) => extendOptions(context, plugin)
  return plugins.reduce(reducer, initialOptions);
};

const _initLifetime = (onload, plugin) => {
  return function (e) {
    if (onload) {
      onload.call(this, e)
    }
    if (plugin) {
      extendOptions(this, plugin)
    }
    this.store && this.store.addDep(this) // useStore: 这段代码增加了本不该在这个函数出现，应该抽离出去
  }
}

const extendComponent = (plugins) => {
  const constructor = Component
  const composePlugin = mergePlugins({}, plugins)

  return (options) => {
    // 组件样式隔离取消
    !options.options && (options.options = {})
    options.options.stylesIsolation = 'shared'

    // 添加扩展属性
    const lifetimes = options.lifetimes // 不传lifetime则视为不需要全局管理的组件
    if (lifetimes) {
      const created = lifetimes.created
      lifetimes.created = created ?
        _initLifetime(created, composePlugin) :
        _initLifetime(null, composePlugin)
    }
    constructor(options)
  }
}

const extendPage = (plugins) => {
  const constructor = Page
  const composePulgin = mergePlugins({}, plugins)

  return (options) => {
    const expandOptions = extendOptions(options, composePulgin)
    const onLoad = expandOptions.onLoad

    expandOptions.onLoad = onLoad 
    ? _initLifetime(onLoad)
    : _initLifetime()

    constructor(expandOptions)
  }
}

module.exports = {
  extendPage,
  extendComponent
}