import { useState } from "react";

export default function Grid3({
  placement,
  solved,
  values,
  third,
  mistakesCount,
  setMistakesCount,
  onCellChange,
  initialGrid,
}) {
  const [textColor, setTextColor] = useState("");

  let border;
  switch (placement) {
    case "top":
      border = "border-t-4 border-r-4";
      break;
    case "3x3":
      border = "border-b-4 border-r-4";
      break;
    default:
      border = "border-r-4";
  }

  return (
    <div className={`flex ${border} border-[#0077b6] text-2xl`}>
      {values.map((value, index) => (
        <div
          key={index}
          className="border-r-2 border-b-2 border-gray-500 p-2 w-[60px] h-[60px] flex items-center justify-center transition hover:bg-black"
          style={{
            borderRight: [2, 5, 8].includes(index) ? "none" : "2px solid gray",
            borderLeft: index % 3 === 0 ? "4px solid #0077b6" : "none",
            borderBottom: third ? "none" : "2px solid gray",
          }}
        >
          {initialGrid[index] !== undefined ? (
            <span className="items-center justify-center transition">
              {initialGrid[index]}
            </span>
          ) : (
            <input
              onChange={(e) => {
                const value = e.target.value;
                onCellChange(index, value);
                if (value && Number(value) === solved[index]) {
                  setTextColor("text-[#0077b6]");
                } else if (value) {
                  setTextColor("text-red-500");
                } else {
                  setTextColor("");
                }
              }}
              className={`border-none outline-none w-full justify-items-center p-0 m-0 font-inherit bg-transparent ${textColor}`}
              maxLength="1"
            />
          )}
        </div>
      ))}
    </div>
  );
}
