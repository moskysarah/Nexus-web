interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const styles = {
    primary: 'bg-nexus-primary text-white hover:bg-nexus-primary/90',
    secondary: 'bg-nexus-secondary text-white hover:bg-nexus-secondary/90',
    outline: 'border border-slate-700 text-slate-300 hover:bg-slate-800'
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`rounded-xl font-bold transition-all active:scale-95 ${styles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
