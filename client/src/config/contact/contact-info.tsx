import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: "Email",
      value: "kalejaiyecaleb@example.com",
      link: "mailto:kalejaiyecaleb@example.com"
    },
    {
      icon: <FaPhoneAlt className="text-2xl" />,
      label: "Phone",
      value: "+234 (70) 64-019926",
      link: "tel:+2347064019926"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      label: "Location",
      value: "Kaduna, Nigeria",
      link: null
    }
  ];