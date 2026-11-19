import { getSQLServerPool } from "@/config/db";
import { IUsuario } from "@/types/Usuario";
import bcrypt from 'bcrypt';

export async function createUsuario(usuario: IUsuario): Promise<boolean> {
    const pool = await getSQLServerPool();
    try {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
        const result = await pool.request()
            .input('nome', usuario.nome)
            .input('email', usuario.email)
            .input('senha', usuario.senha)
            .input('status', usuario.status)
            .input('role', usuario.role)
            .query(`
                INSERT INTO dbo.usuarios(nome, email, senha, status, role) VALUES(
                    @nome, @email, @senha, @status, @role
                )
            `);
        return result.rowsAffected[0] === 1;
    } catch (error) {
        console.error("Error creating user:", error);
        return false;
    }
}

export async function getUsuarioByEmail(email: string): Promise<IUsuario | null> {
    const pool = await getSQLServerPool();
    try {
        const result = await pool.request()
            .input('email', email)
            .query(`
                SELECT * FROM dbo.usuarios WHERE email = @email
            `);
        return result.recordset[0] || null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}