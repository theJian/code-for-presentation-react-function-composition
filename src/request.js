const request = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500)
})

export default request
