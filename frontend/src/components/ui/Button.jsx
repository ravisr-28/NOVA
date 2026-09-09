import '../../styles/components.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconOnly = false,
  loading = false,
  className = '',
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    iconOnly ? 'btn-icon' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
          {!iconOnly && children}
        </>
      )}
    </button>
  );
};

export default Button;
