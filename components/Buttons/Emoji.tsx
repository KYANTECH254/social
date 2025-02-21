"use client";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function Emoji({ onSelect }: { onSelect: (emoji: any) => void }) {

  return (
    <div className="relative">
      <div className="absolute bottom-16 left-0 z-10 bg-white shadow-lg rounded-lg">
        <Picker data={data} onEmojiSelect={onSelect} />
      </div>
    </div>
  );
}
