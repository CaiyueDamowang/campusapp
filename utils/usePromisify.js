const promiseCach = new Map()
const promisify = (api) => {
  if (typeof api !== 'function') throw new Error(`${api} is not a function`)

  const hasAlreadyPromisify = promiseCach.has(api)
  if (hasAlreadyPromisify) {
    return promiseCach.get(api)
  }

  const promisifyCallback = (option) => 
    new Promise((resolve, reject) => {
      api({
        ...option,
        success: result => resolve(result),
        fail: reason => reject(reason),
      })
    })

  promiseCach.set(api, promisifyCallback)
  return promisifyCallback
}

const usePromisify = () => {
  return {
    promisify
  }
}

module.exports = usePromisify