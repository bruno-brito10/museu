import { Router } from "express";
import multer from 'multer';
import path from "path";
import { RepositorioObra } from "../repositorio/repositorioObra";
import { ServicoObra } from "../servicos/servicoObra";
import { ControleObra } from "../controles/controleObra";
import { RepositorioUsuario } from "../repositorio/repositorioUsuario";

const rotasObras = Router();

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload = multer ({storage})

function criarRotasObra() {

    const repositorioObra = new RepositorioObra();
    const repositorioUsuario = new RepositorioUsuario();
    const  servicoObra = new ServicoObra(repositorioObra, repositorioUsuario);
    const controleObra = new ControleObra(servicoObra);

    rotasObras.post('/criar-obras', upload.single('foto'), controleObra.criarObra);
    rotasObras.get('/listar-obras/:id', controleObra.listarObrasPorIdUsuario);
    rotasObras.get('/usuario/:id_usuario/obra/:id_obra', controleObra.buscarObraPorId);
    rotasObras.delete('/usuario/:id_usuario/obra/:id_obra', controleObra.removerObra)
    rotasObras.put('/usuario/:id_usuario/obra/:id_obra', controleObra.atualizarObra)
    return rotasObras;
}

export {
    criarRotasObra
}
