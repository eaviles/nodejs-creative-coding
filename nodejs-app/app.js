{
  console.log('Hello, world!');
}

{
  const you = 'world';
  console.log('Hello, ' + you + '!');
  console.log(`Hello, ${you}!`);
}

{
  let you = 'world';
  you = 'planet';
  console.log(`Hello, ${you}!`);
}

{
  const person = {
    firstName: 'Edgardo',
    lastName: 'Avilés'
  };
  console.log(person);
  person.age = 18;
  console.log(person);

  console.log(`${person.firstName} ${person.lastName}`);
  const { firstName, lastName, age } = person;
  console.log(`${firstName} ${lastName}`);
  const human = { firstName, favoriteColor: 'blue' };
  console.log(human);
}

{
  function hello(you) {
    console.log(`Hello, ${you}!`);
  }
  hello('world');
}

{
  const { hello } = require('./hello.js');
  hello('planet');
}

{
  const { v4 } = require('uuid');
  console.log(v4());
}
