import axios from 'axios';

export async function login(email, password) {
  const user = await axios.post(
    'http://localhost:3001/login',
    {
      email,
      password,
    },
  )
    .then((result) => result.data)
    .catch((error) => console.log(error));

  return user;
}

export async function register(name, email, password) {
  const isCreated = await axios.post(
    'http://localhost:3001/register',
    {
      name,
      email,
      password,
    },
  )
    .then((result) => result)
    .catch((error) => console.log(error));
  console.log(isCreated);
  return !!isCreated;
}
