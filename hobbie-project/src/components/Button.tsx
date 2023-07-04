interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-main font-bold
 my-4 p-4 before:trans text-accent py-4 rounded-xl hover:brightness-95 ${
   disabled ? "opacity-50 cursor-not-allowed" : ""
 }`}
      disabled={disabled}
    >
      <div className="flex items-center gap-4">{children}</div>
    </button>
  );
}
