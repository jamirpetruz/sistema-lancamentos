
"use client";

import { useState } from "react";
import {
  FiSearch,
  FiEye,
  FiFilter,
  FiPlus,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";

export interface IComprovante {
  comprovanteId: number;
  data: string;
  valor: number;
  status: "pendente" | "aprovado" | "rejeitado";
  pedidoExterno: number;
  observacao: string;
  img: string;
}

const comprovantesIniciais: IComprovante[] = [
  {
    comprovanteId: 1,
    data: "2026-11-19",
    valor: 1250.5,
    status: "pendente",
    pedidoExterno: 10245,
    observacao: "",
    img: "",
  },
  {
    comprovanteId: 2,
    data: "2026-11-18",
    valor: 3500,
    status: "aprovado",
    pedidoExterno: 10246,
    observacao: "",
    img: "",
  },
  {
    comprovanteId: 3,
    data: "2026-11-17",
    valor: 890.75,
    status: "rejeitado",
    pedidoExterno: 10247,
    observacao: "",
    img: "",
  },
  {
    comprovanteId: 4,
    data: "2026-11-16",
    valor: 2100,
    status: "pendente",
    pedidoExterno: 10248,
    observacao: "",
    img: "",
  },
];

const statusConfig = {
  pendente: {
    label: "Pendente",
    className: "bg-amber-50 text-amber-700 ring-amber-600/20",
  },
  aprovado: {
    label: "Aprovado",
    className: "bg-green-50 text-green-700 ring-green-600/20",
  },
  rejeitado: {
    label: "Rejeitado",
    className: "bg-red-50 text-red-700 ring-red-600/20",
  },
};

export default function ComprovantesPage() {
  const [comprovantes] = useState<IComprovante[]>(comprovantesIniciais);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const comprovantesFiltrados = comprovantes.filter((item) => {
    const correspondeBusca =
      item.comprovanteId.toString().includes(busca) ||
      item.pedidoExterno.toString().includes(busca);

    const correspondeStatus =
      filtroStatus === "todos" || item.status === filtroStatus;

    return correspondeBusca && correspondeStatus;
  });

  const formatarData = (data: string) => {
    return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const totais = {
    todos: comprovantes.length,
    pendentes: comprovantes.filter((c) => c.status === "pendente").length,
    aprovados: comprovantes.filter((c) => c.status === "aprovado").length,
    rejeitados: comprovantes.filter((c) => c.status === "rejeitado").length,
  };

  return (
    <div className="space-y-6">

      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Comprovantes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie e acompanhe os comprovantes recebidos.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          <FiPlus size={17} />
          Novo comprovante
        </button>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800">
            {totais.todos}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="mt-2 text-2xl font-semibold text-amber-600">
            {totais.pendentes}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Aprovados</p>
          <p className="mt-2 text-2xl font-semibold text-green-600">
            {totais.aprovados}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Rejeitados</p>
          <p className="mt-2 text-2xl font-semibold text-red-600">
            {totais.rejeitados}
          </p>
        </div>

      </div>

      {/* Listagem */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        {/* Filtros */}
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-sm">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Buscar por ID ou pedido..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <FiFilter size={17} className="text-gray-400" />

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none focus:border-blue-500"
            >
              <option value="todos">Todos os status</option>
              <option value="pendente">Pendentes</option>
              <option value="aprovado">Aprovados</option>
              <option value="rejeitado">Rejeitados</option>
            </select>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">ID</th>
                <th className="px-5 py-4 font-medium">Data Envio</th>
                <th className="px-5 py-4 font-medium">Pedido externo</th>
                <th className="px-5 py-4 font-medium">Valor</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {comprovantesFiltrados.map((item) => {
                const status = statusConfig[item.status];

                return (
                  <tr
                    key={item.comprovanteId}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-700">
                      #{item.comprovanteId}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-400" size={15} />
                        {formatarData(item.data)}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      #{item.pedidoExterno}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-800">
                      {formatarValor(item.valor)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        title="Visualizar comprovante"
                        onClick={() => {
                          window.location.href = `/comprovantes/detalhes/${item.comprovanteId}`;
                        }}
                        className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FiEye size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {comprovantesFiltrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <FiFileText
                      size={28}
                      className="mx-auto mb-3 text-gray-300"
                    />
                    <p className="font-medium text-gray-600">
                      Nenhum comprovante encontrado
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Tente alterar os filtros da pesquisa.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Rodapé */}
        <div className="flex flex-col gap-2 border-t border-gray-200 px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Exibindo {comprovantesFiltrados.length} de {comprovantes.length} registros
          </span>
        </div>

      </div>
    </div>
  );
}
