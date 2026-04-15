import Button from "./Button";

function Keypad({ onButtonClick }) {
  const buttons = [
    "C", "←", "=", "*",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "/",
    "0", ","
  ];

  return (
    <div className="keypad">
      {buttons.map((btn, index) => (
        <Button key={index} value={btn} onClick={onButtonClick} />
      ))}
    </div>
  );
}

export default Keypad;