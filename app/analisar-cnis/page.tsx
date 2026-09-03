import UploadCNIS from "./components/UploadCNIS";

export default function AnalisarCNIS() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#0F4C5C]">
          Análise Inteligente de CNIS
        </h1>

        <p className="mt-4 text-gray-600">
          Envie o arquivo CNIS em PDF para análise automática pela Inteligência
          Artificial.
        </p>

        <div className="mt-8">
          <UploadCNIS />
        </div>
      </div>
    </main>
  );
}