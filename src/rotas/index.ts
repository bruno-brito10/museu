import express from 'express';
import cors from 'cors';
import { criarUsuarioRotas } from './rotasUsuarios';
import { criarRotasObra } from './rotaObras';
import { criarPostagemRota } from './rotaPostagem';
import path from 'path';

async function exportApp (){
    const app = express();
    app.use (cors());
    app.use(express.json())
    app.use('/uploads',express.static(path.join(__dirname, "..", "..",'uploads')));
    app.use(express.urlencoded({ extended: true }));
    app.use(criarUsuarioRotas());
    app.use(criarRotasObra())
    app.use(criarPostagemRota())

    return app;

}

export { exportApp }