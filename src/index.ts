import { exportApp } from './rotas'
import pool from './config/db'

async function iniciar(){
    pool;
    const app = await exportApp();

    app.listen(3000,()=>{console.log ("servidor rodando em http://localhost:3000")})
}

iniciar()