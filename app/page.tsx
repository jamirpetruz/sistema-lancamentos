import { signIn } from "@/auth";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center bg-white px-16 py-32 dark:bg-black">

        <form
          className="flex w-full max-w-sm flex-col gap-4 border border-gray-300 p-4 rounded-md shadow-md dark:border-gray-700 dark:bg-gray-800"
          action={async (formData) => {
            "use server"
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: "/comprovantes", // Rota para onde o usuário será enviado
            })
          }}
        >
          <strong className="text-center text-xl font-bold text-gray-800 dark:text-white">Bem-vindo</strong>
          <label>Email</label>
          <input
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            type="email"
          />
          <label>Password</label>
          <input
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            type="password"
          />
          <button className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
