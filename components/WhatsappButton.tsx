import { MessageCircle } from "lucide-react";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5566992083796"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3.5 sm:px-5 sm:py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
      aria-label="Falar com a Ágil Assessoria pelo WhatsApp"
    >
      <MessageCircle size={28} />

      <span className="hidden sm:block font-bold">
        Fale conosco
      </span>
    </a>
  );
}