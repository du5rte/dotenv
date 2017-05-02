function delay(val) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(val)
    }, 1000)
  })
}


// module.exports = Promise.resolve(delay({
//   JS_BASIC: 'basic',
// }).then((rs) => rs))

module.exports = {
  JS_BASIC: 'js_basic',
  // JS_PROMISE: 'my js promise'
}
