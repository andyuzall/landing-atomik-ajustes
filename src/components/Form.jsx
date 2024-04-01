import React, { useEffect, useState } from 'react';
import style from '../css/Form.css';
import Footer from './Footer';
import SendIcon from '@mui/icons-material/Send';
import { Button, Typography } from '@mui/material';

const Form = ({ userData }) => {

  // Estado para almacenar el listado de clientes
  const [clientes, setClientes] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fechaSolicitud: '',
    identificadorCampana: '',
    cliente: '',
    ajuste: '',
    numeroMultiplicar: '',
    ajusteConsumo: '',
    observaciones: ''
  })

  useEffect(() => {
    fetch('data/clientes.json')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
      try {
        const formEle = document.querySelector("form");
        const dataBase = new FormData(formEle);
        const res = await fetch('https://script.google.com/macros/s/AKfycbxKTg6EjqLSSyXr3Xd9sPGyYZ-g3flHMfusjmr1gk0QbGLXVg_IfdYBD5ixCBmwok6Q/exec', {
          method: "POST",
          body: dataBase
        });
        if(res.ok) {
          setFormData({
            fechaSolicitud: '',
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


  return (
    <div>
      <form onSubmit={handleSubmit} id='form' required>
        <label className='divs-form-date'>
          <Typography
          component='h6'
          variant='h6'>
            Fecha de solicitud
          </Typography>
          <input 
          type="date" 
          id='fechaSolicitud'
          name='fechaSolicitud'
          className='input'
          value={formData.fechaSolicitud}
          onChange={handleInputChange}
          required />
        </label>
        <div className='divs-form'>
          <select 
          id='cliente'
          name='cliente'
          className='input'
          value={formData.cliente}
          onChange={handleInputChange}
          required>
            <option value="">Seleccione el cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.nombre}>{cliente.nombre}</option>
            ))}
          </select>
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