import '../../styles/components.css';

const Loader = ({ size = 'md', fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="page-loader">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className={`loader loader-${size}`} />
    </div>
  );
};

export default Loader;
