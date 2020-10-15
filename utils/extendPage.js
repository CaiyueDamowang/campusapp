const extendOptions = (options, expantion) => {
  // -- dev --
  const optionsKeys = Object.keys(options);

  let conflictKey;
  const hasConfict = Object
    .keys(expantion)
    .some(key => {
      if (optionsKeys.find(optionsKey => optionsKey === key)) {
        conflictKey = key;
        return true;
      }
    })

  if (hasConfict) {
    console.err(optionsKeys)
    throw new Error(`${conflictKey} has already exsist， check out`);
  }
  // -- dev --

  return Object.assign(options, expantion);
};

const reduceMergeExpantions = (initialOptions, plugins) => {
  const reducer = (context, plugin) => extendOptions(context, plugin)
  return plugins.reduce(reducer, initialOptions);
};

const extendComponent = (plugins) => {
  const constructor = Component

  return (options) => {
    !options.options && (options.options = {})
    options.options.stylesIsolation = 'shared'
    
    !options.methods && (options.methods = {})
    options.methods = reduceMergeExpantions(options.methods, plugins)

    constructor(options)
  }
}

const extendPage = (plugins) => {
  const constructor = Page

  return (options) => {
    const expandOptions = reduceMergeExpantions(options, plugins);
    constructor(expandOptions)
  } 
}



module.exports = {
  extendPage,
  extendComponent
}
