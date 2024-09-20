import React, { useRef, useState, useEffect } from "react";

interface RouletteProps {
  initialVelocity: number; // Velocity in pixels per frame (positive for right, negative for left)
  items: string[] | number[]
}

const Roulette: React.FC<RouletteProps> = ({ initialVelocity, items }) => {
  const RouletteRef = useRef<HTMLDivElement>(null);
  const [velocity, setVelocity] = useState<number>(initialVelocity);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Use `requestAnimationFrame` to gradually scroll with deceleration
  useEffect(() => {
    if (!isSpinning && velocity !== 0) {
      setIsSpinning(true);

      const spinRoulette = (v = velocity) => {
        if (RouletteRef.current) {
          const maxScrollLeft =
            RouletteRef.current.scrollWidth - RouletteRef.current.clientWidth;

          // Scroll by velocity amount
          RouletteRef.current.scrollBy({
            left: v,
          });

          // Get current scroll position
          let currentScrollLeft = RouletteRef.current.scrollLeft;

          // Looping logic: if the Roulette reaches the end, reset to the start
          if (currentScrollLeft >= maxScrollLeft && v > 0) {
            RouletteRef.current.scrollLeft = 0; // Jump back to the beginning
          } else if (currentScrollLeft <= 0 && v < 0) {
            RouletteRef.current.scrollLeft = maxScrollLeft; // Jump to the end
          }

          // Apply friction to reduce velocity over time
          const newVelocity = v * 0.5; // Reduce by 5% each frame
          setVelocity(newVelocity)

          // If the velocity is close to 0, stop the animation
          if (Math.abs(newVelocity) < 0.5) {
            setVelocity(0);
            setIsSpinning(false);
          } else {
            setVelocity(newVelocity);
            requestAnimationFrame(spinRoulette);
          }
        }
      };

      requestAnimationFrame(spinRoulette);
    }
  }, [velocity, isSpinning]);

  // Optional: Start a new spin on button click with a different velocity
  const startSpin = (newVelocity: number) => {
    setVelocity(newVelocity);
    setIsSpinning(false);
  };

  return (
    <div className="relative w-full">
      {/* Left Button to Restart Spin */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        onClick={() => startSpin(-20)} // Negative for left spin
      >
        &#9664;
      </button>

      {/* Roulette Container */}
      <div
        className="flex overflow-x-scroll scrollbar-hide space-x-4"
        ref={RouletteRef}
      >
        {/* Roulette Items */}
        {items.map(item => (
          <div
            key={item}
            className="min-w-[300px] h-64 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Right Button to Restart Spin */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        onClick={() => startSpin(20)} // Positive for right spin
      >
        &#9654;
      </button>
    </div>
  );
};

export default Roulette;
