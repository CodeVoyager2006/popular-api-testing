import { useState } from "react";
import "./Share-Button.css";
import ShareWidget from "./Share-Widget";

function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Change this if you want to share a specific URL (e.g., a video page URL passed via props)
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "https://example.com";

  const shareTitle =
    typeof document !== "undefined" ? document.title : "Check this out";

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Share
      </button>

      <ShareWidget
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url={shareUrl}
        title={shareTitle}
      />
    </>
  );
}

export default ShareButton;
