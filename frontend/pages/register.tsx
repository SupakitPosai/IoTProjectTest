import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import api from '@/api';
import Snackbar from '@/utils/Snackbar';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.register(form)
      console.log(response);
      // await enqueueSnackbar('Login success !', { variant: "success" })
      await Snackbar.success('Register success !')
      await router.push('/login')

    } catch (error: any) {
      // await enqueueSnackbar('Login Failed  !', { variant: "error" })
      await Snackbar.error('Register Failed !')
      console.error(error.error);
    }
  };

  return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>Register</Typography>
          <form onSubmit={handleSubmit}>
            <TextField name="username" label="Username" fullWidth margin="normal" onChange={handleChange} />
            <TextField name="email" label="Email" type="email" fullWidth margin="normal" onChange={handleChange} />
            <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">Register</Button>
          </form>
        </Box>
      </Container>

  );
};

export default Register;
