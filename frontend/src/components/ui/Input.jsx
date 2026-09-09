import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`form-input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
      {helperText && !error && (
        <span className="form-helper">{helperText}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
