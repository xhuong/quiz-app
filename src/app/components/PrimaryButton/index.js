export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-cyan-500 py-4 text-white tracking-wide rounded-md shadow-lg mb-2 transition-shadow duration-500 hover:shadow-cyan-500/50"
    >
      {children}
    </button>
  );
}
