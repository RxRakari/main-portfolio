import { FiX, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../context/theme-context";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}: DeleteModalProps) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl border overflow-hidden ${
          theme === "dark"
            ? "bg-black/80 border-white/10 text-white"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/10">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200/20 transition"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6 text-sm leading-relaxed">
          {message}
        </div>

        {/* Actions */}
        <div className="px-5 py-4 flex justify-end gap-3 border-t border-gray-200/10">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
              theme === "dark"
                ? "bg-red-500/20 hover:bg-red-500/30 text-red-300"
                : "bg-red-100 hover:bg-red-200 text-red-700"
            }`}
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;