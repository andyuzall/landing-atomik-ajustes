import React, { useEffect, useState } from 'react';
import style from '../css/Form.css';
import Footer from './Footer';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

const Form = ({ userData }) => {

  console.log(userData);
  const API_KEY = process.env.REACT_APP_DATA_BASE_URL;
  // Estado para almacenar el listado de clientes
  const [clientes, setClientes] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState({
    fechaSolicitud: '',
    identificadorCampana: '',
    cliente: '',
    ajuste: '',
    numeroMultiplicar: '',
    ajusteConsumo: '',
    observaciones: ''
  })

   // Estado para mostrar el mensaje emergente
   const [showMessage, setShowMessage] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const sendDataToSheet = async () => {
    try {
      const response = await fetch(API_KEY, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "fechaSolicitud": formData.fechaSolicitud,
          "identificadorCampana": formData.identificadorCampana,
          "cliente": formData.cliente,
          "ajuste": formData.ajuste,
          "numeroMultiplicar": formData.numeroMultiplicar,
          "ajusteConsumo": formData.ajusteConsumo,
          "observaciones": formData.observaciones
        })
      });

      if (response.ok) {
        setFormData({
          fechaSolicitud: '',
          identificadorCampana: '',
          cliente: '',
          ajuste: '',
          numeroMultiplicar: '',
          ajusteConsumo: '',
          observaciones: ''
        });
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } else {
        alert('Error al enviar los datos sin catch');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar los datos');
    }
  };
    console.log(formData)
    sendDataToSheet();
  };


  return (
    <div>
      <form onSubmit={handleSubmit} id='form' required>
        <div className='divs-form'>
          <p>
            Fecha de solicitud
          </p>
          <input 
          type="date" 
          id='fechaSolicitud'
          className='input'
          value={formData.fechaSolicitud}
          onChange={handleInputChange}
          required />
        </div>
        <div className='divs-form'>
          <p>Cliente</p>
          <select 
          id='cliente'
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
          <p>¿Que deseo ajustar?</p>
          <select
          id='ajuste'
          className='input'
          value={formData.ajuste} 
          onChange={handleInputChange}
          required>
            <option value=''>Seleccione el ajuste</option>
            <option value='Objetivo'>Objetivo</option>
            <option value='Consumo'>Consumo</option>
            <option value='Ambas'>Ambas</option>
          </select>
        </div>
        {selectedOption && (
          <>
            {selectedOption === 'Objetivo' && (
              <div className='divs-form'>
                <p>
                  Indicar el número a multiplicar
                </p>
                <input 
                type="number"
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
                <p>
                  Indicar el FM a ajustar
                </p>
                <input 
                type='number'
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
                <p>
                Indicar el número a multiplicar
                </p>
              <input 
                type="number"
                id='numeroMultiplicar'
                className='input'
                value={formData.numeroMultiplicar}
                onChange={handleInputChange}
                placeholder='Ajuste de objetivo'
                required
              />
              </div>
              <div className='divs-form'>
                <p>
                Indicar el FM a ajustar
                </p>
              <input 
                type='number'
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
          <p>
            ¿Cual es el identificador de la campaña?
          </p>
          <input 
          type="text"
          id='identificadorCampana'
          className='input'
          value={formData.identificadorCampana}
          onChange={handleInputChange}
          placeholder='Identificador de campaña'
          required
          />
        </div>
        <div className='divs-form'>
          <p>
              Observaciones de cambio
          </p>
          <textarea 
          className='observaciones'
          id='observaciones'
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
          endIcon={<SendIcon />}
          >Solicitar ajuste</Button>
      </form>
      {showMessage && ( 
        <div className='exito'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
					  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
				  </svg>
          <p>¡Datos enviados correctamente!</p>
        </div>
       )}
    <Footer />
    </div>
  )
}

export default Form