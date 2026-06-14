import {
  FaStickyNote,
  FaStar,
  FaUser,
  FaBriefcase,
  FaBookOpen,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";
export const NOTE_TYPES = [
  {
    value: "Generic",
    label: "Generic",
    icon: FaStickyNote,
    color: "#64748b",
  },
  {
    value: "Important",
    label: "Important",
    icon: FaStar,
    color: "#dc2626",
  },
  {
    value: "Personal",
    label: "Personal",
    icon: FaUser,
    color: "#9333ea",
  },
  {
    value: "Work",
    label: "Work",
    icon: FaBriefcase,
    color: "#2563eb",
  },
  {
    value: "Study",
    label: "Study",
    icon: FaBookOpen,
    color: "#0891b2",
  },
  {
    value: "Todo",
    label: "Todo",
    icon: FaCheckCircle,
    color: "#16a34a",
  },
  {
    value: "Reminder",
    label: "Reminder",
    icon: FaBell,
    color: "#ea580c",
  },
];
