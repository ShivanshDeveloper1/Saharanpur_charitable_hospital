import { FaPhoneAlt } from "react-icons/fa";

export default function MobileCallButton() {
  return (
    <div className="fixed bottom-6 left-6 z-50 md:hidden">
      {/* Pure CSS Pulse Effect ring (Zero JS overhead for instant open) */}
      <span className="absolute -inset-1 rounded-full bg-blue-600 opacity-75 animate-ping pointer-events-none" />

      {/* Single Phone Button opening Dialer */}
      <a
        href="tel:+917618550475" // Replace with your actual phone number
        aria-label="Call Now"
        className="relative flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl active:scale-95 transition-transform"
      >
        <FaPhoneAlt className="w-6 h-6 animate-bounce" />
      </a>
    </div>
  );
}