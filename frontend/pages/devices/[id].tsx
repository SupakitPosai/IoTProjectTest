import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import api from '@/api';
import Snackbar from '@/utils/Snackbar';

const Page: NextPageWithLayout =() => {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ name: '' });

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        var response = await api.devicesOne(String(id));
        delete response._id
        setForm(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchDevice();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // var tmp = {...form}
      // delete tmp._id
      const response =  await  api.devicesUpdate(String(id),form)
      console.log(response);
      await Snackbar.success('Update success !')
      await router.push('/devices')
    } catch (error) {
      console.error(error);
      await Snackbar.error('Update Failed !')
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Edit Device</Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="name" label="Device Name" fullWidth margin="normal" value={form.name} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary">Save</Button>
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
