"use client";
import { useState, useEffect } from 'react';

export default function TypewriterText({ text, speed = 30 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <p className="text-sm font-medium text-slate-300 leading-relaxed">{displayedText}</p>;
}