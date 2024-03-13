import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(__dirname, 'client/build')));


// Ruta de fallback para servir la aplicación React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
  
  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
  });