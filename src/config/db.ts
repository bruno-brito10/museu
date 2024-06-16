import { Pool } from 'pg';

const  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'museu',
    password: '1234',
    port: 5433,

});

const criarTabelaUsuarios = async () => {
    const client = await pool.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                senha VARCHAR(100) NOT NULL,
                papeis VARCHAR(100) NOT NULL,
                liberado BOOLEAN DEFAULT false
            );
        `;
        await client.query(query);
        console.info('tabela "usuaríos" foi criada');
    } catch (error) {
        console.error('Erro ao Criar Tabela de Usuaríos: ', error );
    } finally {
        client.release();
    }
}

const criarTabelaObra = async () => {
    const client = await pool.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS obradearte (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                autor VARCHAR(100) NOT NULL,
                dono INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
                url_foto VARCHAR(255) NOT NULL,
                descricao TEXT NOT NULL
            );
        `;

        await client.query(query);
        console.log('Tabela "obradearte" foi criada');
    } catch(error) {
        console.error('Erro ao criar tabela de obra', error);
    } finally {
        client.release();
    }
}

const criarTabelaPostagem = async () => {
    const client = await pool.connect();
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS postagem  (
            id SERIAL PRIMARY KEY,
            id_usuario INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
            id_obra INTEGER REFERENCES obradearte(id) ON DELETE CASCADE,
            mensagem TEXT NOT NULL
        );
        
        `;

        await client.query(query);
        console.log('tabela "postagem" foi criada');
    } catch(error) {
        console.error('Erro ao criar tabela de postagem', error);
    } finally {
        client.release();
    }
}

const criarTabelas = async () => {
    await criarTabelaUsuarios();
    await criarTabelaObra();
    await criarTabelaPostagem();
}

criarTabelas();

export default pool;