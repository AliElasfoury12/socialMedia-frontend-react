const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)(?=.*[^\w\s])\S{8,64}$/
console.log(passwordRegex.test("Aa1afjdy."));

