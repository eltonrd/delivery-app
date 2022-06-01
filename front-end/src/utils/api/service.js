import axios from 'axios';

async function login(email, password) {
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

export default login;
