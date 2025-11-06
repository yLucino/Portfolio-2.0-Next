import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-dark-blue text-light-white">
      <h1 className="text-cian text-4xl font-semibold">
        🌐 404 - Página Não Encontrada
      </h1>

      <Link href={'/'}>
        <p className="mt-4 text-gray-400 underline hover:text-cian transition-all">
          Voltar para a página inicial
        </p>
      </Link>
    </div>
  );
}