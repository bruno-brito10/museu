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

    async removerUsuario (email: string, id_usuario: number) {
        const admin = await this.repositorioUsuario.encontarUsuarioPorEmail(email);

        if (admin?.papeis != 'admin') {
            throw new ErroCustomizado ('Usuário nao tem Autorização',403);
        } 

        await this.repositorioUsuario.removerUsuario(id_usuario);
    }

    async removerConta (id: number) {
        const usuario = await this.repositorioUsuario.encontrarUsuarioPorId(id);
        if (!usuario) {
            throw new ErroCustomizado ('Usuário Não Encontrado',404);
        } 

        await this.repositorioUsuario.removerUsuario(id);
    }

    async atualizarUsuario (id: number, nome?: string, senha?: string) {
        const usuario = await this.repositorioUsuario.encontrarUsuarioPorId(id);
        if (!usuario) {
            throw new ErroCustomizado('Usuário Nao Encontrsado',404);
        }
        const attUsuario = usuario;
        attUsuario.nome = nome? nome: usuario.nome;
        attUsuario.senha = senha? senha: usuario.senha;
        await this.repositorioUsuario.atualizarUsuario(attUsuario);
    }

    async login(email: string, senha:string): Promise<IUsuario> {
        const usuario = await this.repositorioUsuario.encontarUsuarioPorEmail(email);
        if (!usuario || usuario?.senha != senha) {
            throw new ErroCustomizado("Credenciais Inválidas",401);
        }
        return usuario;
    }

    async liberarUsuario(idAdmin: number, idUsuario: number) {
        const usuarioAdmin = await this.repositorioUsuario.encontrarUsuarioPorId(idAdmin);
        if (usuarioAdmin?.papeis != "admin") {
            throw new ErroCustomizado("usuario nao tem permisao",403);
        }
        await this.repositorioUsuario.liberarUsuario(idUsuario);
    }

}