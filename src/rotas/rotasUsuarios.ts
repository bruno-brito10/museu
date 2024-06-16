import { Router } from "express";
import { ControleUsuario } from "../controles/controlesUsuarios";
import { RepositorioUsuario } from "../repositorio/repositorioUsuario";
import { ServicosUsuario } from "../servicos/servicosUsuario";

const rotasUsuario = Router();

function criarUsuarioRotas() {

    const repositorioUsuario = new RepositorioUsuario();
    const servicosUsuario = new ServicosUsuario(repositorioUsuario);
    const controlesUsuario = new ControleUsuario(servicosUsuario);

    rotasUsuario.post('/usuarios/novo', controlesUsuario.criarUsuario );
    rotasUsuario.get('/listar-usuarios/:email',controlesUsuario.listarTodosUsuarios)
    return rotasUsuario;


}

export {
    criarUsuarioRotas 
}
