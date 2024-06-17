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
    rotasUsuario.get('/listar-usuarios/:email',controlesUsuario.listarTodosUsuarios);
    rotasUsuario.delete('/remover-usuario/:email/:id', controlesUsuario.removerUsuario);
    rotasUsuario.delete('/remover-conta/:id', controlesUsuario.removerConta);
    rotasUsuario.put('/atualizar-usuario/:id', controlesUsuario.atualizarUsuario);
    rotasUsuario.get('/login',controlesUsuario.login);

    return rotasUsuario;
}

export {
    criarUsuarioRotas 
}
