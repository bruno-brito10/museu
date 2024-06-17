import pool from "../config/db";
import { IPostagem } from "../interfaces/interfacePostagem";

export class RepositorioPostagem {

    async criarPostagem (idUsuario: number, idObra: number, mensagem: string ) {
        const client = await pool.connect();
        try{
            const query = `
                INSERT INTO postagem (id_usuario, id_obra, mensagem)
                VALUES ($1, $2, $3)
                RETURNING id, id_usuario, id_obra, mensagem;
            `;

            const res = await client.query(query, [idUsuario, idObra, mensagem]);
            return res.rows[0];
        } finally { 
            client.release()
        }

    }

    async listarPostagens (idUsuario: number, idObra: number): Promise<IPostagem[]> {
        const client = await pool.connect();
        try {
            const query = `
                SELECT * FROM postagem
                WHERE id_usuario = $1 AND id_obra = $2;
            `;
            const res = await client.query(query, [idUsuario, idObra]);
            return res.rows;

        } finally {
            client.release();
            
        }
    }
}