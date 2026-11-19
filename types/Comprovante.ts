export interface IComprovante {
    comprovanteId: number
    data: string
    valor: number
    status: 'pendente' | 'aprovado' | 'rejeitado'
    pedidoExterno: number
    observacao: string
    img: string
}