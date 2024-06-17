import { ErroCustomizado } from "../erroCustomizado/erroCustomizado";
import { IObraArte } from "../interfaces/obraArte";
import { RepositorioObra } from "../repositorio/repositorioObra";
import { RepositorioUsuario } from "../repositorio/repositorioUsuario";

export class ServicoObra {
    constructor (
        private repositorioObra:RepositorioObra,
        private repositorioUsuario: RepositorioUsuario
    ) {}

   async criarObra(obraDeArte: IObraArte) {
     await this.repositorioObra.criarObra(obraDeArte)
   }

   async listarObrasPorIdUsuario(id: number): Promise <IObraArte[]> {
    const usuario = await this.repositorioUsuario.encontrarUsuarioPorId(id);
    if (!usuario) {
        throw new ErroCustomizado('Usuário nao Encontrado',404); 
    }
    const obras = await this.repositorioObra.listarObrasPorIdUsuario(id);
    return obras;

   }

   async buscarObraPorId (idUsuario: number, idObra: number): Promise<IObraArte> {
        const obra = await this.repositorioObra.buscarObraPorId(idUsuario, idObra);
        if (!obra) {
            throw new ErroCustomizado('Obra nao Encontrada',404);
        }

        return obra;
   }

   async removerObraDeArte(idUsuario: number, idObra: number) {
        const obra = await this.repositorioObra.buscarObraPorId(idUsuario, idObra);
        if (!obra) {
            throw new ErroCustomizado('Obra nao encontrada',404);
        }
        
        await this.repositorioObra.removerObra(idUsuario, idObra)
   }

   async atualizarObra (
        idUsuario: number,
        idObra: number,
        nome: string,
        autor: string,
        descricao: string,
    ) {
        const obra = await this.repositorioObra.buscarObraPorId(idUsuario, idObra);

        if (!obra) {
            throw new ErroCustomizado('Obra nao encontrada',404);
        }

        const novaObra = obra;

        novaObra.nome = nome? nome: obra.nome;
        novaObra.autor = autor? autor: obra.autor;
        novaObra.descricao = descricao? descricao: obra.descricao;

        await this.repositorioObra.atualizarObra(novaObra);
   }


}

