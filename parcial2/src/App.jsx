import { useState } from "react";
import Keypad from "./components/Keypad";
import Display from "./components/Display";
import "./App.css";

function App() {
  const [operation, setOperation] = useState("");
  const [current, setCurrent] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {

    if (!isNaN(value) || value === "," || value === ".") {
      let input = value === "," ? "." : value;

      if (input === "." && current === "") {
        input = "0.";
      }

      if (input === "." && current.includes(".")) return;

      if (result) {
        setOperation(value === "," ? "0," : value);
        setCurrent(input);
        setResult("");
        return;
      }

      const newValue = current + input;
      setCurrent(newValue);
      setOperation(operation + (value === "," ? "," : value));

      return;
    }

    if (value === "C") {
      setOperation("");
      setCurrent("");
      setResult("");
      return;
    }

    if (value === "←") {
      if (!operation) return;

      const newOperation = operation.slice(0, -1).trimEnd();
      setOperation(newOperation);

      const parts = newOperation.split(" ");

      if (parts.length === 1) {
        setCurrent(parts[0] || "");
      } else {
        const lastPart = parts[parts.length - 1];
        setCurrent(lastPart);
      }

      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      if (!operation || operation.endsWith(" ")) return;

      setOperation(operation + " " + value + " ");
      setCurrent("");
      setResult(""); 

      return;
    }

    if (value === "=") {
      if (!operation) return;

      try {
        const expression = operation.replace(/,/g, ".");
        let calc = eval(expression);

        const resultStr = parseFloat(calc.toFixed(10)).toString();

        setResult(resultStr);
        setCurrent(resultStr);
        setOperation(resultStr);

      } catch (error) {
        setResult("Error");
      }

      return;
    }
  };

  const format = (val) => val?.replace(".", ",");

  return (
    <div className="container">
      <div className="calculator">
        <h1>La mejor calculadora</h1>
        <Display
          operation={format(operation)}
          result={format(result)}
        />
        <Keypad onButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;