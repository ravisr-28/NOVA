import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import '../../styles/components.css';

const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Select...',
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
      <div className="select-wrapper">
        <select
          id={id}
          ref={ref}
          className={`select-native ${error ? 'error' : ''}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="select-chevron" />
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
