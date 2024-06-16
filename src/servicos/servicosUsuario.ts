import { ErroCustomizado } from "../erroCustomizado/erroCustomizado";
import { IUsuario } from "../interfaces/interfaceUsuario";
import { RepositorioUsuario } from "../repositorio/repositorioUsuario";

export class ServicosUsuario {

    constructor (private repositorioUsuario:RepositorioUsuario) {}
    async criarUsuario (usuario: IUsuario) {
        const { email } = usuario;
        const existeUsuario = await  this.repositorioUsuario.encontarUsuarioPorEmail(email);

        if (existeUsuario){
            
            throw new Error('usuario já existe')
        }

        await this.repositorioUsuario.salvarUsuario(usuario);
    }

    async listarTodosUsuarios (email: string): Promise<IUsuario[]> {
        const admin = await this.repositorioUsuario.encontarUsuarioPorEmail(email);

        if (admin?.papeis != 'admin') {
            throw new ErroCustomizado ('Usuário não tem Autorização',403)
        }

        const usuarios = await this.repositorioUsuario.listarTodosUsuarios();
        return usuarios;
}
}