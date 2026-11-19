
/*
export interface IUser{
    userId: number
    nome: string
    email: string
    senha: string
    status: boolean
    role: 'admin' | 'user'
}
*/

CREATE TABLE usuarios(
    userId INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    status BIT NOT NULL DEFAULT 1,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')),
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
);
/*
export interface IComprovante {
    comprovanteId: number
    data: string
    valor: number
    status: 'pendente' | 'aprovado' | 'rejeitado'
    pedidoExterno: number
    observacao: string
    img: string
}
*/
CREATE TABLE comprovantes(
    comprovanteId INT IDENTITY(1,1) PRIMARY KEY,
    data DATETIME NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
    pedidoExterno INT NOT NULL,
    observacao TEXT,
    img VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);