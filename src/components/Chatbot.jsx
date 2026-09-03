import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateTravelAssistantResponse } from "../services/aiTravelBrain";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I'm your Elsewhere travel assistant. Where would you like to go?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmedMessage,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.reply) {
        throw new Error(data.error || "Falling back to intelligent travel brain.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch {
      // Natural thinking pause for realistic conversational feel
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Generate bespoke, detailed response for whatever was asked
      const aiReply = generateTravelAssistantResponse(trimmedMessage);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: aiReply,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="chatbot"
            aria-label="Elsewhere AI travel assistant"
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.96,
              transformOrigin: "bottom right",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.96,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <header className="chatbot__header">
              <div>
                <span className="chatbot__eyebrow-glow">
                  <Sparkles size={13} />
                  ELSEWHERE AI
                </span>
                <h2 className="chatbot__title-typo">
                  <em>Travel assistant</em>
                </h2>
              </div>

              <motion.button
                type="button"
                className="chatbot__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close travel assistant"
                whileHover={{
                  scale: 1.08,
                  rotate: 5,
                }}
                whileTap={{
                  scale: 0.92,
                }}
              >
                <X size={20} />
              </motion.button>
            </header>

            <div className="chatbot__messages">
              <AnimatePresence initial={false}>
                {messages.map((item) => (
                  <motion.div
                    key={item.id}
                    className={
                      item.role === "user"
                        ? "chatbot__message chatbot__message--user"
                        : "chatbot__message chatbot__message--assistant"
                    }
                    initial={{
                      opacity: 0,
                      y: 10,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                  <ReactMarkdown>{item.text}</ReactMarkdown>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="chatbot__message chatbot__message--assistant"
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                    }}
                  >
                    <motion.span
                      className="chatbot__typing"
                      animate={{
                        opacity: [0.45, 1, 0.45],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Thinking...
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form
              className="chatbot__form"
              onSubmit={sendMessage}
            >
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask about a destination..."
                aria-label="Message the travel assistant"
                disabled={isLoading}
              />

              <motion.button
                type="submit"
                aria-label="Send message"
                disabled={!message.trim() || isLoading}
                whileHover={
                  message.trim() && !isLoading
                    ? {
                        scale: 1.08,
                      }
                    : undefined
                }
                whileTap={
                  message.trim() && !isLoading
                    ? {
                        scale: 0.92,
                      }
                    : undefined
                }
              >
                <Send size={18} />
              </motion.button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="chatbot__toggle"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={
          isOpen ? "Close travel assistant" : "Open travel assistant"
        }
        aria-expanded={isOpen}
        whileHover={{
          y: -3,
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.96,
        }}
      >
        <motion.span
          animate={{
            rotate: isOpen ? 0 : [0, -4, 4, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: isOpen ? 0 : Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          {isOpen ? <X size={22} /> : <Bot size={22} />}
        </motion.span>

        <span>{isOpen ? "Close" : "Ask Elsewhere"}</span>
      </motion.button>
    </>
  );
}

export default Chatbot;