import dotenv from 'dotenv';
import app from './app';

dotenv.config();
// Configurações da porta do servidor
const port = process.env.PORT || 8080;

// Listando a porta que o servidor está rodando
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
