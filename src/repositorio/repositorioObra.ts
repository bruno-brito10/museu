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

    async listarObra(): Promise<IObraArte[]> {
        const client = await pool.connect();
        try {
            const resposta = await client.query("SELECT * FROM obradearte");
            return resposta.rows;
        } finally { 
            client.release();
        }
    }

    async buscarObraPorId (idUsuario: number, idObra: number): Promise <IObraArte | null> {
        const client = await pool.connect();
        try {
            const query = 'SELECT * FROM obradearte WHERE dono = $1 AND id = $2';
            const res = await client.query(query, [idUsuario, idObra]);
            return res.rows.length > 0 ? res.rows[0] :null;
        } finally {
            client.release();
        }
    }

    async removerObra (idUsuario: number, idObra: number): Promise <boolean> {
        const client = await pool.connect();
        try {
            const query = 'DELETE FROM obradearte WHERE dono = $1 AND id = $2';
            const res = await client.query(query, [idUsuario, idObra]);
            return res.rowCount != null && res.rowCount > 0;
        } finally {
            client.release();
        }
    }

    async atualizarObra (obra: IObraArte): Promise<boolean> {
        const client = await pool.connect();
        try {
            const query = `
                UPDATE obradearte
                SET nome = $1, autor = $2, descricao = $3, url_foto = $4
                WHERE dono = $5 AND id = $6
            `;
            const res = await client.query(query, [obra.nome,obra.autor, obra.descricao, obra.url_foto, obra.dono, obra.id]);
            return res.rowCount != null && res.rowCount > 0;
        } finally {
            client.release()
        }
    }

}