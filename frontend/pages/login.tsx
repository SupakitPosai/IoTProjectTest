import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { useRouter } from 'next/router';
import api from '@/api';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Snackbar from '@/utils/Snackbar';

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // var request = NextRequest
      const response = await api.login(form)
      console.log(response);
      // await enqueueSnackbar('Login success !', { variant: "success" })
      await Snackbar.success('Login success !')
      await setCookie('token', response.token, { maxAge: response.expiresIn });
      await router.push('/')

    } catch (error: any) {
      // await enqueueSnackbar('Login Failed  !', { variant: "error" })
      await Snackbar.error('Login Failed !')
      console.error(error.error);
    }
  };

  return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField name="username" label="Username" fullWidth margin="normal" onChange={handleChange} />
            <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">Login</Button>
          </form>
          <Typography variant="body2" component="p" mt={1}> Please apply for membership. <Link href="/register">Register</Link></Typography>
          
        </Box>
      </Container>
    
  );
};

export default Login;
