function Loader() {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <p>Verifying Face...</p>
    </div>
  );
}

const styles = {
  loaderContainer: {
    textAlign: "center",
    marginTop: "20px"
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "6px solid #ddd",
    borderTop: "6px solid #7b2ff7",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto"
  }
};

export default Loader;
