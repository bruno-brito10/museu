export interface IUsuario {
    id ?: number;
    nome: string;
    email: string;
    senha: string;
    papeis: string;
    liberado?: boolean;
}