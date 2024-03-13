import { Box, Button, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React from 'react'
import style from '../css/Main.css';
import Atomo from './Atomo';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


const Main = ({ userData }) => {

  const navigate = useNavigate();

  const handleNavigateToForm = () => {
        navigate('/form');
    };

  return (
    <>
    <Header  userData={userData}/>
    <main className='main-form'>
        <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        height={200}
        width='auto'
        gap={2}
        >
        <Typography
        variant='h1'
        component='h1'
        color='grey'
        >
        Hola {userData && userData.given_name}!
        </Typography>
        <Typography
        variant='h3'
        component='h3'
        color='grey'
        >
        {userData && userData.email}
        </Typography>
        <Button 
        classes='MuiButton-fullWidth'
        variant='contained' 
        color='secondary'
        size='small'
        fullWidth={false}
        endIcon={<SendIcon />}
        onClick={handleNavigateToForm}
        >Completar Form</Button>
        </Box>
        <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height={200}
        width='auto'
        >
         <Atomo />  
        </Box>
    </main>
    </>
  )
}

export default Main