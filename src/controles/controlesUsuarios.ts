import { Request,Response } from "express";
import { ServicosUsuario } from "../servicos/servicosUsuario";
import { IUsuario } from "../interfaces/interfaceUsuario";
import { send } from "process";
import { ErroCustomizado } from "../erroCustomizado/erroCustomizado";

export class ControleUsuario {

    constructor(private servicoUsuario: ServicosUsuario) {}
    criarUsuario = async (req:Request,res:Response) => {
        const usuario = req.body as IUsuario;
        try{
            await this.servicoUsuario.criarUsuario (usuario);
            res.status(201).send('usuário salvo com sucesso');

            
        }catch(error) { 
            console.error(error) 
            res.status(500).send('Erro ao salvar o usuário');

        }
    }

    listarTodosUsuarios = async (req:Request,res:Response)=> {
        const email = req.params.email as string;
        try{
            const usuarios = await this.servicoUsuario.listarTodosUsuarios(email);
            res.status(200).json(usuarios);
        } catch (error){
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({ error: 'Erro do Servidor Interno'});
            }
        }


    }
}