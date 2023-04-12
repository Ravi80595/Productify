import { useState } from 'react';
import { Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedData = JSON.parse(localStorage.getItem('userData'));
  if (storedData && storedData.email === email && storedData.password === password) {
    console.log('Login Successful!');
    localStorage.setItem('loginToken', JSON.stringify('randomTokenHere'));
    navigate('/')
  } else {
    console.log('Invalid Credentials!');
  }
  };

  return (
    <div style={{ maxWidth: '20%', padding:"20px", margin: 'auto',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            autoComplete="username"
          />
          <TextField
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            autoComplete="current-password"
          />
          <div display='flex'>
          <Button primary submit>
            Login
          </Button>
          <Link to='/signup'>
          <Button>Signup</Button>
          </Link>
          </div>
        </FormLayout>
      </Form>
    </div>
  );
}

export default Login;
