const test = {
  test: 1,
  testing: {
    hello: 3,
    world: 2,
  }

}

console.log({
  ...test,
  'testing.hello': 100
})