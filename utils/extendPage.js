const extendOptions = (options, expantion) => {
  return Object.assign(options, expantion);
};

const reduceMergeExpantions = (initialOptions, plugins) => {
  const reducer = (context, plugin) => extendOptions(context, plugin)
  return plugins.reduce(reducer, initialOptions);
};

const _initLifetime = (plugin ,onload) => {
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
  const composePlugin = reduceMergeExpantions({}, plugins)
  const notFuntcionPlugin = {}  // 组件扩展自定义属性必须在create周期声明

  Object
    .keys(composePlugin)
    .forEach(key => {
      const plugin = composePlugin[key]
      if (typeof plugin !== 'function') {
        notFuntcionPlugin[key] = plugin
      }
    })

  return (options) => {
    // 组件样式隔离取消
    !options.options && (options.options = {})
    options.options.stylesIsolation = 'shared'
    
    // 添加扩展方法
    !options.methods && (options.methods = {})
    options.methods = extendOptions(options.methods, composePlugin)

    // 添加扩展属性
    const lifetimes = options.lifetimes  // !注意: 组件必须要有 lifetimes字段 可以为空
    if (!lifetimes) {
      constructor(options)
      return
    }

    if (!lifetimes.created){
      lifetimes.created = _initLifetime(notFuntcionPlugin)
    } else {
      const create = lifetimes.created
      lifetiems.created = _initLifetime(notFuntcionPlugin, create)
    }

    constructor(options)
  }
}

const extendPage = (plugins) => {
  const constructor = Page
  const composePulgin = reduceMergeExpantions({}, plugins)

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
