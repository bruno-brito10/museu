import pool from "../config/db";

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
}