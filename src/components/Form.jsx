import React, { useEffect, useState } from 'react';
import style from '../css/Form.css';
import Footer from './Footer';
import Header from './Header.jsx';
import SendIcon from '@mui/icons-material/Send';
import { Button, Typography } from '@mui/material';
import Select from 'react-select';

const Form = ({ userData }) => {

  // Estado para almacenar el listado de clientes
  const [clientes, setClientes] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    identificadorCampana: '',
    cliente: '',
    ajuste: '',
    numeroMultiplicar: '',
    ajusteConsumo: '',
    observaciones: ''
  })

  useEffect(() => {
    fetchSheetDataClient();
  }, []);


  // este fetch es para leer los clientes del sistema
  const fetchSheetDataClient = async () => {
    const API_KEY = process.env.REACT_APP_GOOGLE_SCRIPT_URL
    try {
      const respuesta = await fetch(API_KEY);
      const dataClients = await respuesta.json();
      setClientes(dataClients.map(item => ({ value: item[0], label: item[0] })));
    } catch (error) {
      console.error('Error en el fetching de datos:', error)
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value});
    if (id === 'ajuste') {
      setSelectedOption(value);
    }
  }

  

  // manejamos el cambio en el segundo select
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectChangeClientes = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setFormData({ ...formData, cliente: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
      try {
        const formEle = document.querySelector("form");
        const dataBase = new FormData(formEle);

        const currentDate = new Date();
        dataBase.append('fechaSolicitud', currentDate.toISOString());

        const res = await fetch('https://script.google.com/macros/s/AKfycbxKTg6EjqLSSyXr3Xd9sPGyYZ-g3flHMfusjmr1gk0QbGLXVg_IfdYBD5ixCBmwok6Q/exec', {
          method: "POST",
          body: dataBase
        });
        if(res.ok) {
          setFormData({
            identificadorCampana: '',
            cliente: '',
            ajuste: '',
            numeroMultiplicar: '',
            ajusteConsumo: '',
            observaciones: ''
        });
          setSuccess(true); 
          setTimeout(() => {
            setSuccess(false); 
          }, 3000);
        } else {
          throw new Error('Error al enviar los datos');
        }
      } catch(error) {
        console.log(error);
      };
    setSending(false);
}

const selectedValue = clientes.find(client => client.value === formData.cliente);




  return (
    <div>
      <Header  userData={userData}/>
      <form onSubmit={handleSubmit} id='form' required>
        <div className='divs-form'>
          <Select
          id='cliente'
          name='cliente'
          className='input'
          classNamePrefix='input'
          onChange={handleSelectChangeClientes}
          value={selectedValue}
          options={clientes}
          placeholder='Seleccione el cliente'
          isClearable
          />
        </div>
        <div className='divs-form'>
          <select
          id='ajuste'
          name='ajuste'
          className='input'
          value={formData.ajuste} 
          onChange={handleInputChange}
          required>
            <option value=''>Seleccione el tipo de ajuste</option>
            <option value='Objetivo'>Objetivo</option>
            <option value='Consumo'>Consumo</option>
            <option value='Ambas'>Ambas</option>
          </select>
        </div>
        {selectedOption && (
          <>
            {selectedOption === 'Objetivo' && (
              <div className='divs-form'>
                <input 
                type="number"
                name='numeroMultiplicar'
                id='numeroMultiplicar'
                className='input'
                value={formData.numeroMultiplicar}
                onChange={handleInputChange}
                placeholder='Número a multiplicar'
                required
              />
              </div>
            )}
            {selectedOption === 'Consumo' && (
              <div className='divs-form'>
                <input 
                type='number'
                name='ajusteConsumo'
                id='ajusteConsumo'
                className='input'
                value={formData.ajusteConsumo}
                onChange={handleInputChange}
                placeholder='Ajuste de consumo'
                required
              />
              </div>
            )}
            {selectedOption === 'Ambas' && (
              <>
              <div className='divs-form'>
              <input 
                type="number"
                name='numeroMultiplicar'
                id='numeroMultiplicar'
                className='input'
                value={formData.numeroMultiplicar}
                onChange={handleInputChange}
                placeholder='Ajuste de objetivo'
                required
              />
              </div>
              <div className='divs-form'>
              <input 
                type='number'
                name='ajusteConsumo'
                id='ajusteConsumo'
                className='input'
                value={formData.ajusteConsumo}
                onChange={handleInputChange}
                placeholder='Ajuste de consumo'
              />
              </div>
            </>
            )}
          </>
        )}
        <div className='divs-form'>
          <input 
          type="text"
          name='identificadorCampana'
          id='identificadorCampana'
          className='input'
          value={formData.identificadorCampana}
          onChange={handleInputChange}
          placeholder='Identificador de campaña'
          required
          />
        </div>
        <div className='divs-form'>
          <textarea 
          className='observaciones'
          name='observaciones'
          id='observaciones'
          placeholder='Descripción del cambio, fechas en las cual ajustar, detalles de interés.'
          value={formData.observaciones}
          onChange={handleInputChange}
          >
          </textarea>
        </div>
          <Button 
          type='submit'
          variant='contained' 
          color='secondary'
          size='large'
          fullWidth={false}
          endIcon={sending ? null : <SendIcon />}
          disabled={sending}>
          {sending ? 'Enviando ...' : 'Solicitar ajuste'}
          </Button>
      {success && ( 
        <div className='exito'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
					  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
				  </svg>
        </div>
       )}
      </form>
    <Footer />
    </div>
  )
}

export default Form