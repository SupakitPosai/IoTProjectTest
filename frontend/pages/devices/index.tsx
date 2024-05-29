import React, { ReactElement, useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Link } from '@mui/material';
import axios from 'axios';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import api from '@/api';
import Snackbar from '@/utils/Snackbar';

const  Page: NextPageWithLayout = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.devicesList({});
        setDevices(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDevices();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.devicesDelete(id);

      setDevices(devices.filter((device: any) => device._id !== id));
      await Snackbar.success('Delete success !')
    } catch (error) {
      console.error(error);
      await Snackbar.success('Delete Failed !')
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Devices</Typography>
        <Button href='/devices/create'>Create</Button>
        <List>
          {devices.map((device: any) => (
            <ListItem key={device.id} secondaryAction={
              <Button variant="contained" color="secondary" onClick={() => handleDelete(device._id)}>Delete</Button>
            }>
              <ListItemText ><Link href={`/devices/${device._id}`} >{device._id}</Link></ListItemText>
              <ListItemText primary={device.name} />
            </ListItem>
          ))}
        </List>
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
