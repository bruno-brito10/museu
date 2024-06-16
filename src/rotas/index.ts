import express from 'express';
import cors from 'cors';
import { criarUsuarioRotas } from './rotasUsuarios';
import { criarRotasObra } from './rotaObras';

async function exportApp (){
    const app = express();
    app.use (cors());
    app.use(express.json())
    app.use('/uploads', express.static('uploads'));
    app.use(criarUsuarioRotas());
    app.use(criarRotasObra())

    return app;

}

export { exportApp }