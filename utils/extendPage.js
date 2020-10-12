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
    console.log(optionsKeys)
    throw new Error(`${conflictKey} has already exsist， check out`);
  }
  // -- dev --

  return Object.assign(options, expantion);
};

const reduceMergeExpantions = (initialContext, expantions) => {
  const reducer = (context, expantion) => extendOptions(context, expantion)
  return expantions.reduce(reducer, initialContext);
};

const extendComponent = (plugins) => {
  const constructor = Component
  return (options) => {
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
