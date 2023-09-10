import dotenv from 'dotenv';
import app from './app';

dotenv.config();
// Configurações da porta do servidor
const port = process.env.APP_PORT;

// Listando a porta que o servidor está rodando
app.listen(port);
