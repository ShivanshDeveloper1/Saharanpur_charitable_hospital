"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
const phoneNumber = "919876543210"; // Replace with your WhatsApp number
const message = "Hi, I would like to know more about your services.";

return (
<a
href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
target="_blank"
rel="noopener noreferrer"
aria-label="Chat with us on WhatsApp"
className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
> <MessageCircle size={30} strokeWidth={2} /> </a>
);
}
