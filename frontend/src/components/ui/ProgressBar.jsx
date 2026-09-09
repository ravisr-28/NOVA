import '../../styles/components.css';

const ProgressBar = ({ value = 0, label = '', showPercent = true }) => {
  const percent = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className="progress-bar-container">
      {(label || showPercent) && (
        <div className="progress-bar-label">
          <span>{label}</span>
          {showPercent && <span>{percent}%</span>}
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
