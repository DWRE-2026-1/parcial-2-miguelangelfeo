function Display({ operation, result }) {
  return (
    <div className="display">
      <div className="operation">{operation || "0"}</div>
      <div className="result">{result}</div>
    </div>
  );
}

export default Display;