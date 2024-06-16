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


}

