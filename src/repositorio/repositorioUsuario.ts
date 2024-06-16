import pool from "../config/db";
import { IUsuario } from "../interfaces/interfaceUsuario";

export class RepositorioUsuario {
    async encontarUsuarioPorEmail (email: string):Promise<IUsuario|null> {
        const client = await pool.connect();
        try {
            const resultado = await client.query('SELECT * FROM usuarios WHERE email = $1', [email]);
            return resultado.rows[0] || null;
        } finally {
            client.release();
        }
    }

    
    async salvarUsuario (usuario: IUsuario) {
        const client = await pool.connect();

        try {
            const query = `
            INSERT INTO usuarios (nome, email, senha, papeis, liberado)
            VALUES ($1, $2, $3, $4, $5);
            `;
            await client.query(query, [usuario.nome, usuario.email, usuario.senha, usuario.papeis, usuario.liberado])
        } finally {
            client.release ();
        }
    } 
    
        async listarTodosUsuarios():Promise<IUsuario[]>{
            const client = await pool.connect();
            try {
                const query = `SELECT * FROM usuarios WHERE papeis = $1`;
                const resultado = await client.query(query,['usuario']);
                return resultado.rows ;
            } finally {
                client.release();
            }

        }
    
}