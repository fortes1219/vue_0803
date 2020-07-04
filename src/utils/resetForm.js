export const resetForm = (target) => {
  const reset = (obj) => {
    Object.keys(obj).map(key => {
      if (obj[key] === Object(obj[key])) {
        reset(obj[key])
        if (obj[key] instanceof Array) {
          obj[key] = []
        }
        return
      }
      else {
        obj[key] = ''
      }
    })
  }
  reset(target)
}