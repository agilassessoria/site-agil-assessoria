import { MessageCircle } from "lucide-react";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5566992083796"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition duration-300 hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={34} />
    </a>
  );
}