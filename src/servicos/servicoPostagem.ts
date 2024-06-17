import pool from "../config/db";
import { ErroCustomizado } from "../erroCustomizado/erroCustomizado";
import { IPostagem } from "../interfaces/interfacePostagem";
import { RepositorioObra } from "../repositorio/repositorioObra";
import { RepositorioPostagem } from "../repositorio/repositorioPostagem";
import { RepositorioUsuario } from "../repositorio/repositorioUsuario";

export class ServicoPostagem {
    constructor(
        private repositorioPostagem: RepositorioPostagem,
        private repositorioObra: RepositorioObra
    ) {}

    async criarPostagem (idUsuario: number, idObra: number, mensagem: string ) {
        const obra = await this.repositorioObra.buscarObraPorId(idUsuario, idObra);

        if(!obra) {
            throw new ErroCustomizado("Obra não encontrada", 404);
        }

        await this.repositorioPostagem.criarPostagem(idUsuario, idObra, mensagem);
    }

    async listarPotagens(idUsuario: number, idObra: number): Promise<IPostagem[]> {
        const obra = await this.repositorioObra.buscarObraPorId(idUsuario, idObra);

        if (!obra) {
            throw new ErroCustomizado("Obra nao encontradada",404);
        } 

        return await this.repositorioPostagem.listarPostagens(idUsuario, idObra);
    }
}