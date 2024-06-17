import { Request, Response } from "express";
import { ServicoPostagem } from "../servicos/servicoPostagem";
import { ErroCustomizado } from "../erroCustomizado/erroCustomizado";

export class ControlePostagem {
    constructor(private servicePostagem: ServicoPostagem) {}

    criarPostagem = async (req: Request, res:Response) => {
        const idUsuario = parseInt(req.params.id_usuario);
        const idObra = parseInt(req.params.id_obra);

        const mensagem = req.body.mensagem;

        try {
            await this.servicePostagem.criarPostagem(idUsuario, idObra, mensagem);
            res.status(201).send("Postagem criada");
        } catch(error) {
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({ error: 'Erro do Servidor Interno'});
            }
        }
    }

    listarPostagens = async(req:Request,res:Response) => {
        const idUsuario = parseInt(req.params.id_usuario);
        const idObra = parseInt(req.params.id_obra);
        try {
            const postagens = await this.servicePostagem.listarPotagens(idUsuario, idObra);
            res.status(200).json(postagens)

        }catch(error) {
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({ error: 'Erro do Servidor Interno'});
            }
        }
    }
}