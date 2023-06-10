export default function SecondaryButton({ onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`w-full  py-4 text-white tracking-wide capitalize rounded-sm shadow-lg transition-shadow duration-500 ${
        isActive
          ? "hover:shadow-indigo-500/50 bg-indigo-500 pointer-events-auto"
          : "bg-slate-200 hover:shadow-slate-500/50 pointer-events-none"
      }`}
    >
      Next
    </button>
  );
}
