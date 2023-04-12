import React, { useState } from 'react';
import {
  Button,
  Form,
  FormLayout,
  LegacyCard,
  TextField,
} from '@shopify/polaris';
import { Link } from 'react-router-dom';

const Authentication = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (name.length > 50) {
      alert('Name cannot exceed 50 characters');
      return;
    }
    if (email.length > 100) {
      alert('Email cannot exceed 100 characters');
      return;
    }
    if (password.length < 8 || password.length > 20) {
      alert('Password must be between 8 and 20 characters');
      return;
    }
    if (phone.length > 15) {
      alert('Phone number cannot exceed 15 digits');
      return;
    }
    const formData = {
      name,
      email,
      password,
      phone
    };
    localStorage.setItem('userData', JSON.stringify(formData));
    console.log(name,email,password,phone)
    alert('Signup Success')
  };

  return (
      <div style={{ maxWidth: '20%', padding:"20px", margin: 'auto',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={name}
              onChange={setName}
              label="Name"
              type="text"
              autoComplete="off"
              required
            />
            <TextField
              value={email}
              onChange={setEmail}
              label="Email"
              type="email"
              autoComplete="off"
              required
            />
            <TextField
              value={password}
              onChange={setPassword}
              label="Password"
              type="password"
              autoComplete="off"
              required
            />
            <TextField
              value={phone}
              onChange={setPhone}
              label="Phone Number"
              type="tel"
              autoComplete="off"
              required
            />
            <div display='flex'>
            <Button submit>Submit</Button>
            <Link to="/login">
            <Button>Login</Button>
            </Link>
            </div>
          </FormLayout>
        </Form>
      </div>
  );
};

export default Authentication;
