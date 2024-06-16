import express from 'express';
import cors from 'cors';
import { criarUsuarioRotas } from './rotasUsuarios';

async function exportApp (){
    const app = express();
    app.use (cors());
    app.use(express.json())
    app.use(criarUsuarioRotas())

    return app;

}

export { exportApp }