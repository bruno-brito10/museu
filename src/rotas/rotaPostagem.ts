import { Router } from "express";
import { RepositorioPostagem } from "../repositorio/repositorioPostagem";
import { RepositorioObra } from "../repositorio/repositorioObra";
import { ServicoPostagem } from "../servicos/servicoPostagem";
import { ControlePostagem } from "../controles/controlePostagem";

const rotaPostagem = Router();

function criarPostagemRota() {
    const repositorioPostagem = new RepositorioPostagem();
    const repositorioObra = new RepositorioObra();
    const servicoPostagem = new ServicoPostagem(repositorioPostagem, repositorioObra);
    const controlesPostagem = new ControlePostagem(servicoPostagem);

    rotaPostagem.post("/usuario/:id_usuario/obra/:id_obra/postagem", controlesPostagem.criarPostagem)

    return rotaPostagem;
}

export {
    criarPostagemRota
}