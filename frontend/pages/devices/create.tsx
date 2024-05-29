import React, { ReactElement, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import api from '@/api';
import Snackbar from '@/utils/Snackbar';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const [form, setForm] = useState({ name: '' });
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
      const response =  await  api.devicesCreate(form)
      console.log(response);
      await Snackbar.success('Create success !')
      await router.push('/devices')
    } catch (error) {
      console.error(error);
      await Snackbar.error('Create Failed !')
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Create Device</Typography>
       
        <form onSubmit={handleSubmit}>
          <TextField name="name" label="Device Name" fullWidth margin="normal" onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary">Create</Button>
        </form>
      </Box>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page;
