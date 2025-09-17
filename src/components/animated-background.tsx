"use client";
import React, { useEffect, useState } from "react";

interface AnimatedElement {
  id: string;
  type:
    | "falling-ball"
    | "floating-particle"
    | "bouncing-circle"
    | "pulsing-dot";
  left: number;
  delay: number;
  duration: number;
}

export default function AnimatedBackground() {
  const [elements, setElements] = useState<AnimatedElement[]>([]);

  useEffect(() => {
    const createElements = () => {
      const newElements: AnimatedElement[] = [];

      // Create falling balls - optimized quantity
      for (let i = 0; i < 5; i++) {
        newElements.push({
          id: `falling-${i}`,
          type: "falling-ball",
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 10 + Math.random() * 3,
        });
      }

      // Create floating particles - reduced for performance
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: `floating-${i}`,
          type: "floating-particle",
          left: Math.random() * 100,
          delay: Math.random() * 6,
          duration: 12 + Math.random() * 4,
        });
      }

      // Create bouncing circles - balanced quantity
      for (let i = 0; i < 4; i++) {
        newElements.push({
          id: `bouncing-${i}`,
          type: "bouncing-circle",
          left: Math.random() * 100,
          delay: Math.random() * 4,
          duration: 8 + Math.random() * 3,
        });
      }

      // Create pulsing dots - optimized for performance
      for (let i = 0; i < 6; i++) {
        newElements.push({
          id: `pulsing-${i}`,
          type: "pulsing-dot",
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 5 + Math.random() * 2,
        });
      }

      setElements(newElements);
    };

    createElements();

    // Regenerate elements every 45 seconds for variety (optimized frequency)
    const interval = setInterval(createElements, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-animated-elements">
      {elements.map((element) => (
        <div
          key={element.id}
          className={element.type}
          style={{
            left: `${element.left}%`,
            top:
              element.type === "falling-ball"
                ? "-30px"
                : `${Math.random() * 70 + 15}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
