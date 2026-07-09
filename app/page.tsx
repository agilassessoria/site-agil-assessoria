import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Destaques from "@/components/Destaques";
import Sobre from "@/components/Sobre";
import Estatisticas from "@/components/Estatisticas";
import Diferenciais from "@/components/Diferenciais";
import Servicos from "@/components/Servicos";
import Depoimentos from "@/components/Depoimentos";
import Simulador from "@/components/Simulador";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Banner />
        <Destaques />
        <Sobre />
        <Estatisticas />
        <Diferenciais />
        <Servicos />
        <Depoimentos />
        <Simulador />
      </main>

      <Footer />

      <WhatsappButton />
    </>
  );
}