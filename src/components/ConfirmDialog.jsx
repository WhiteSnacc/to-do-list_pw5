import Modal from './Modal.jsx';

export default function ConfirmDialog({ onCancel, onConfirm }) {
  return (
    <Modal onClose={onCancel} title="Konfirmasi Hapus">
      <p className="text-center text-sm text-slate-600">
        Yakin ingin menghapus todo ini?
      </p>
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
        <button
          className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          onClick={onCancel}
          type="button"
        >
          Batal
        </button>
        <button
          className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
          onClick={onConfirm}
          type="button"
        >
          Hapus
        </button>
      </div>
    </Modal>
  );
}
