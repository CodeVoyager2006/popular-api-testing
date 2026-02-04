import { useEffect, useMemo, useState } from "react";
import "./Share-Widget.css";

function ShareWidget({ isOpen, onClose, url, title }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = useMemo(() => encodeURIComponent(url || ""), [url]);
  const encodedTitle = useMemo(() => encodeURIComponent(title || ""), [title]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll while open (optional but common)
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: do nothing (or you could show an error message)
    }
  };

  const handleNativeShare = async () => {
    try {
      if (!navigator.share) return;
      await navigator.share({ title, url });
      onClose?.();
    } catch {
      // user cancelled or share failed; ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="share-overlay"
      role="presentation"
      onClick={() => onClose?.()}
    >
      <div
        className="pop-up-widget"
        role="dialog"
        aria-modal="true"
        aria-label="Share"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="share-header">
          <h3 className="share-title">Share</h3>
          <button
            type="button"
            className="share-close"
            aria-label="Close share dialog"
            onClick={() => onClose?.()}
          >
            ×
          </button>
        </header>

        <section className="share-links">
          <ul>
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noreferrer"
              >
                X (Twitter)
              </a>
            </li>
            <li>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                Email
              </a>
            </li>
          </ul>
        </section>

        <section className="share-actions">
          {typeof navigator !== "undefined" && navigator.share ? (
            <button type="button" onClick={handleNativeShare}>
              Share via device…
            </button>
          ) : null}

          <div className="copy-row">
            <input
              className="share-url"
              type="text"
              readOnly
              value={url}
              aria-label="Share link"
            />
            <button type="button" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ShareWidget;
