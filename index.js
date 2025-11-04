const express = require('express');
const qr = require('qrcode'); // Importamos la biblioteca de QR
const app = express();
const port = 3000;

// Una ruta base para saber que está vivo
app.get('/', (req, res) => {
  res.send('Servicio de QR está funcionando. Usa /qr?text=tu_texto');
});

// --- Esta es la nueva ruta "Llamativa" ---
app.get('/qr', async (req, res) => {
  // 1. Obtenemos el texto de la URL (Query Parameter)
  const texto = req.query.text;

  // 2. Validamos si el texto existe
  if (!texto) {
    return res.status(400).send('Error: El parámetro "text" es obligatorio.');
  }

  try {
    // 3. Generamos el QR como un Buffer (un conjunto de datos de imagen)
    const bufferImagen = await qr.toBuffer(texto);

    // 4. Devolvemos la imagen
    res.set('Content-Type', 'image/png'); // Le decimos al navegador que es una imagen PNG
    res.send(bufferImagen);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error al generar el código QR.');
  }
});
// ------------------------------------------

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Microservicio de QR escuchando en http://localhost:${port}`);
});