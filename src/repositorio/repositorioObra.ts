import pool from "../config/db";
import { IObraArte } from "../interfaces/obraArte";

export class RepositorioObra {
    async criarObra(obraDeArte: IObraArte) {
        const client = await pool.connect();
        try {
            const query = `
                INSERT INTO obradearte (nome, autor, dono, url_foto, descricao)
                VALUES ($1, $2, $3, $4, $5);
            `;
            await client.query(query, [obraDeArte.nome, obraDeArte.autor, obraDeArte.dono, obraDeArte.url_foto, obraDeArte.descricao]);
        } finally {
            client.release();
        }
    }
    async listarObrasPorIdUsuario(id: number): Promise <IObraArte[]> {
        const client = await pool.connect();
        try {
            const resposta = await client.query('SELECT * FROM obradearte WHERE dono = $1', [id]);
            return resposta.rows;
        } finally {
            client.release();
        }
    }
}