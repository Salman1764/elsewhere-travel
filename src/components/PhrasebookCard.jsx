import { useState } from "react";
import { Volume2, VolumeX, Sparkles, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { getPhrasebookForDestination } from "../data/phrasebooks";

function PhrasebookCard({ destinationId, country, destinationName }) {
  const phrasebook = getPhrasebookForDestination(destinationId, country);
  const [playingIndex, setPlayingIndex] = useState(null);

  const speakPhrase = (phraseText, langCode, index) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(phraseText);
    utterance.lang = langCode || "en-US";
    utterance.rate = 0.88; // Natural, deliberate pronunciation pace

    setPlayingIndex(index);

    utterance.onend = () => {
      setPlayingIndex(null);
    };

    utterance.onerror = () => {
      setPlayingIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="phrasebook-card">
      <div className="phrasebook-card__header">
        <div>
          <div className="phrasebook-card__badge">
            <MessageSquare size={13} />
            <span>LOCAL LANGUAGE PHRASEBOOK</span>
          </div>
          <h3>Essential phrases in {destinationName}</h3>
          <p className="phrasebook-lang-tag">
            Language: <strong>{phrasebook.language}</strong> • Tap 🔊 to listen
          </p>
        </div>
      </div>

      <div className="phrasebook-grid">
        {phrasebook.phrases.map((item, idx) => {
          const isPlaying = playingIndex === idx;

          return (
            <motion.div
              key={item.text}
              className={`phrase-item ${isPlaying ? "phrase-item--playing" : ""}`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
            >
              <div className="phrase-item__content">
                <div className="phrase-item__primary">
                  <strong>{item.text}</strong>
                  {item.script && item.script !== item.text && (
                    <span className="phrase-script">({item.script})</span>
                  )}
                </div>
                <div className="phrase-item__meaning">{item.meaning}</div>
              </div>

              <button
                type="button"
                className={`phrase-item__audio-btn ${isPlaying ? "phrase-item__audio-btn--active" : ""}`}
                onClick={() => speakPhrase(item.text, phrasebook.code, idx)}
                title={`Listen to pronunciation: ${item.text}`}
                aria-label={`Listen to ${item.text}`}
              >
                {isPlaying ? (
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    <Volume2 size={16} />
                  </motion.div>
                ) : (
                  <Volume2 size={16} />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PhrasebookCard;
