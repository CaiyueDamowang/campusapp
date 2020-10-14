
const promisify = (api) => {
  if (typeof api !== 'function') throw new Error(`${api} is not a function`)
  return (option) => 
    new Promise((resolve, reject) => {
      api({
        ...option,
        success: result => resolve(result),
        fail: reason => reject(reason),
      })
    })


  return 
}

module.exports = {
  promisify

}