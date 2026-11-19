export interface IUsuario{
    userId?: number
    nome: string
    email: string
    senha: string
    status: boolean
    role: 'admin' | 'user'
}