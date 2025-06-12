export default function Modes({ modes, setModes }) {
  const activeClass = "text-[#b91d2e]";
  const inactiveClass = " text-[#432818]";

  const baseClass = "px-4 py-2 border rounded transition";

  return (
    <div className="flex gap-3">
      <button
        className={`${baseClass} ${
          modes === "easy" ? activeClass : inactiveClass
        }`}
        onClick={() => setModes("easy")}
      >
        Easy
      </button>
      <button
        className={`${baseClass} ${
          modes === "medium" ? activeClass : inactiveClass
        }`}
        onClick={() => setModes("medium")}
      >
        Medium
      </button>
      <button
        className={`${baseClass} ${
          modes === "hard" ? activeClass : inactiveClass
        }`}
        onClick={() => setModes("hard")}
      >
        Hard
      </button>
      <button
        className={`${baseClass} ${
          modes === "extreme" ? activeClass : inactiveClass
        }`}
        onClick={() => setModes("extreme")}
      >
        Extreme
      </button>
    </div>
  );
}
