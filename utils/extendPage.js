const extendOptions = (options, expantion) => {
  return Object.assign(options, expantion);
};

const mergePlugins = (initialOptions, plugins) => {
  const reducer = (context, plugin) => extendOptions(context, plugin)
  return plugins.reduce(reducer, initialOptions);
};

const _initLifetime = (onload, plugin) => {
  return function(e) {      
    if (plugin) {
      extendOptions(this, plugin)
    }
    if (onload) {
      onload.call(this, e)
    }
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
    const lifetimes = options.lifetimes  // !注意: 组件必须要有 lifetimes字段 可以为空
    if (!lifetimes) {
      constructor(options)
      return
    }

    if (!lifetimes.created){
      lifetimes.created = _initLifetime(null, composePlugin)
    } else {
      const create = lifetimes.created
      lifetiems.created = _initLifetime(create, composePlugin)
    }

    constructor(options)
  }
}

const extendPage = (plugins) => {
  const constructor = Page
  const composePulgin = mergePlugins({}, plugins)

  return (options) => {
    const expandOptions = extendOptions(options,composePulgin)

    if (!expandOptions.onload) expandOptions.onload = _initLifetime
    else {
      const onload = expandOptions.onload
      expandOptions.onload = _initLifetime(onload)
    }

    constructor(expandOptions)
  } 
}

module.exports = {
  extendPage,
  extendComponent
}
