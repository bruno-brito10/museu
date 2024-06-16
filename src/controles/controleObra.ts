import { Request, Response } from "express";
import { ServicoObra } from "../servicos/servicoObra";
import { ErroCustomizado } from "../erroCustomizado/erroCustomizado";
import { IObraArte } from "../interfaces/obraArte";

export class ControleObra{
    constructor (private servicoObra: ServicoObra ) {}
    criarObra = async (req:Request,res:Response) => {
        try{
            const { nome, autor, dono, descricao } =req.body;
            const url_foto = req.file?.path;

            if (!nome || !autor || !dono || !url_foto || !descricao) {
                throw new ErroCustomizado('Campos Imvalidos',400);
            } 
            const obra:IObraArte = {
                nome, 
                autor,
                dono,
                url_foto,
                descricao,
            }
            await this.servicoObra.criarObra(obra) ;
            res.status(201).send('Obra de Arte Salva com Sucesso')
        } catch (error) {
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({error: 'Erro de Servidor Interno'})
            }
        }
    }
    
    listarObrasPorIdUsuario = async (req:Request,res:Response) => {
        try {
            const id = parseInt(req.params.id);
            const obras = await this.servicoObra.listarObrasPorIdUsuario(id);
            res.status(200).json(obras);
        } catch (error) {
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({error: 'Erro de Servidor Interno'})
            }
        }
    }

    buscarObraPorId = async (req: Request, res: Response) => {
        try {
            const idUsuario = parseInt(req.params.id_usuario);
            const idObra = parseInt(req.params.id_obra);
            const obra = await this.servicoObra.buscarObraPorId(idUsuario, idObra);
            res.status(200).json(obra);
        
        } catch (error) {
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            }
        }
    }

}