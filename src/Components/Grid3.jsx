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
    <div className={`flex ${border} border-[#000] text-2xl`}>
      {values.map((value, index) => {
        const isPrefilled = initialGrid[index] !== undefined;
        const correctValue = solved[index];

        return (
          <div
            key={index}
            className="border-r-2 border-b-2 border-gray-500 p-2 w-[60px] h-[60px] flex items-center bg-white justify-center transition hover:bg-[#c3903f]"
            style={{
              borderRight: [2, 5, 8].includes(index)
                ? "none"
                : "2px solid gray",
              borderLeft: index % 3 === 0 ? "4px solid #000" : "none",
              borderBottom: third ? "none" : "2px solid gray",
            }}
          >
            {isPrefilled ? (
              <span className="text-black">{initialGrid[index]}</span>
            ) : (
              <input
                type="number"
                value={value ?? ""}
                onChange={(e) => onCellChange(index, e.target.value)}
                className={`text-center w-full h-full bg-transparent border-none outline-none text-2xl ${
                  value === correctValue
                    ? "text-[#034732]"
                    : value !== undefined
                    ? "text-red-500"
                    : ""
                }`}
                maxLength={1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
