import { Request,Response } from "express";
import { ServicosUsuario } from "../servicos/servicosUsuario";
import { IUsuario } from "../interfaces/interfaceUsuario";
import { send } from "process";
import { ErroCustomizado } from "../erroCustomizado/erroCustomizado";

export class ControleUsuario {

    constructor(private servicoUsuario: ServicosUsuario) {}
    criarUsuario = async (req:Request,res:Response) => {
        const usuario = req.body as IUsuario;
        usuario.liberado = false
        try{
            await this.servicoUsuario.criarUsuario (usuario);
            res.status(201).send('usuário salvo com sucesso');

            
        }catch(error) { 
            console.error(error) 
            res.status(500).send('Erro ao salvar o usuário');

        }
    }

    removerUsuario = async (req:Request,res:Response)=> {
        const email = req.params.email as string;
        const id = parseInt(req.params.id);
        try {
             await this.servicoUsuario.removerUsuario(email,id);
             res.status(200).send('Usuário Removido')
        } catch (error) {
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({error: 'Erro de Servidor Interno'});
            }
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

    removerConta = async (req:Request,res:Response)=> {
        const id = parseInt(req.params.id);
        try{
            await this.servicoUsuario.removerConta(id);
            res.status(200).send('Usuário Removido');
        } catch (error){
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({ error: 'Erro do Servidor Interno'});
            }
        }
    }

    atualizarUsuario = async (req:Request,res:Response)=> {
        const id = parseInt(req.params.id);
        const senha = req.body.senha;
        const nome = req.body.nome;
        try {
            if (!senha && !nome) {
                throw new ErroCustomizado('Sem parametros Validos',412);
            }
            await this.servicoUsuario.atualizarUsuario(id, nome, senha);
            res.status(200).send('Usuaário Atualizado');
        } catch (error){
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({ error: 'Erro do Servidor Interno'});
            }
        }

    }

    login = async(req:Request,res:Response) => {
        const email = req.body.email;
        const senha = req.body.senha;
        try {
            const usuario = await this.servicoUsuario.login(email, senha);
            res.status(200).json(usuario);
        } catch (error){
            console.error(error)
            if (error instanceof ErroCustomizado) {
                res.status(error.status).send({error: error.message});
            } else {
                res.status(500).send({ error: 'Erro do Servidor Interno'});
            }
        }
    }

    liberarUsuario = async(req:Request,res:Response) => {
        const idAdmin = parseInt(req.params.id_admin);
        const idUsuario = parseInt(req.params.id_usuario);
        try {
            await this.servicoUsuario.liberarUsuario(idAdmin, idUsuario);
            res.status(200).send("Usuario atualizado");
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