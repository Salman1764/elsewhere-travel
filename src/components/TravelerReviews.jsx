import { useState, useEffect } from "react";
import { Star, MessageSquarePlus, User, CheckCircle2, ThumbsUp, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_REVIEWS = {
  kyoto: [
    {
      id: "rev-1",
      author: "Elena Rostova",
      badge: "Verified Traveler • Solo Explorer",
      rating: 5,
      date: "2 weeks ago",
      text: "Waking up at 5:30 AM to walk Fushimi Inari without the crowds was the highlight of my entire year. The morning mist filtering through the vermilion torii gates is truly unforgettable.",
      likes: 24,
    },
    {
      id: "rev-2",
      author: "Marcus Vance",
      badge: "Verified Traveler • Cultural Connoisseur",
      rating: 5,
      date: "Last month",
      text: "Gion at twilight feels like stepping back into the Edo period. Don't skip the small tea houses tucked down Shirakawa canal—the matcha parfaits are heavenly.",
      likes: 18,
    },
  ],
  mumbai: [
    {
      id: "rev-3",
      author: "Priya Sundaram",
      badge: "Verified Traveler • Food & Heritage",
      rating: 5,
      date: "3 days ago",
      text: "The architectural grandeur of CST station lit up at night will stop you in your tracks. Watching the sunset along Marine Drive with cutting chai is the true heartbeat of Mumbai.",
      likes: 31,
    },
    {
      id: "rev-4",
      author: "David Chen",
      badge: "Verified Traveler • Architecture Trekker",
      rating: 5,
      date: "2 weeks ago",
      text: "The ferry ride across the harbor to the Elephanta Caves gave us stunning skyline views of the Gateway. Outstanding coastal energy and warmth from locals!",
      likes: 15,
    },
  ],
};

function TravelerReviews({ destinationId, destinationName }) {
  const storageKey = `elsewhere_reviews_${destinationId}`;

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_REVIEWS[destinationId] || [
      {
        id: "rev-gen-1",
        author: "Sophie Laurent",
        badge: "Verified Traveler • Global Explorer",
        rating: 5,
        date: "Recently visited",
        text: `Exploring ${destinationName} surpassed all my expectations. The cultural depth, breathtaking architecture, and welcoming locals made this an unforgettable journey.`,
        likes: 12,
      },
    ];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("Solo Traveler");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch {
      // Ignore
    }
  }, [reviews, storageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !reviewText.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      badge: `Verified Traveler • ${tag}`,
      rating,
      date: "Just now",
      text: reviewText.trim(),
      likes: 0,
    };

    setReviews([newReview, ...reviews]);
    setAuthor("");
    setReviewText("");
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsFormOpen(false);
    }, 1800);
  };

  return (
    <section className="traveler-reviews-section">
      <div className="traveler-reviews__header">
        <div>
          <div className="traveler-reviews__badge">
            <Sparkles size={13} />
            <span>COMMUNITY GUESTBOOK</span>
          </div>
          <h3>Traveler stories & verified tips for {destinationName}</h3>
          <p>Real experiences shared by curious travelers who explored this destination</p>
        </div>

        <button
          type="button"
          className="leave-review-cta"
          onClick={() => setIsFormOpen((prev) => !prev)}
        >
          <MessageSquarePlus size={15} />
          <span>{isFormOpen ? "Cancel Note" : "Write a Traveler Note"}</span>
        </button>
      </div>

      {/* Interactive Review Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.form
            className="traveler-review-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {submittedMessage ? (
              <div className="review-success-banner">
                <CheckCircle2 size={20} className="text-emerald" />
                <span>Thank you! Your travel note has been added to {destinationName}'s guestbook.</span>
              </div>
            ) : (
              <>
                <div className="review-form-row">
                  <div className="review-form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Lin"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>

                  <div className="review-form-group">
                    <label>Travel Style</label>
                    <select value={tag} onChange={(e) => setTag(e.target.value)}>
                      <option value="Solo Explorer">Solo Explorer</option>
                      <option value="Couple Getaway">Couple Getaway</option>
                      <option value="Cultural Connoisseur">Cultural Connoisseur</option>
                      <option value="Adventure Seeker">Adventure Seeker</option>
                      <option value="Foodie Explorer">Foodie Explorer</option>
                    </select>
                  </div>

                  <div className="review-form-group">
                    <label>Rating</label>
                    <div className="star-rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="star-btn"
                          onClick={() => setRating(star)}
                        >
                          <Star
                            size={18}
                            fill={star <= rating ? "#f5a623" : "none"}
                            stroke="#f5a623"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="review-form-group">
                  <label>Your Insider Experience or Tip</label>
                  <textarea
                    rows={3}
                    placeholder={`What was the most memorable moment or best tip for someone visiting ${destinationName}?`}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="submit-review-btn">
                  <Send size={14} />
                  <span>Publish Note to Guestbook</span>
                </button>
              </>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews Grid */}
      <div className="reviews-grid">
        {reviews.map((rev) => (
          <motion.div
            key={rev.id}
            className="review-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="review-card__top">
              <div className="review-card__author-info">
                <div className="review-avatar">
                  <User size={16} />
                </div>
                <div>
                  <strong>{rev.author}</strong>
                  <span className="review-badge">{rev.badge}</span>
                </div>
              </div>

              <div className="review-card__stars">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#f5a623" stroke="#f5a623" />
                ))}
              </div>
            </div>

            <p className="review-card__text">"{rev.text}"</p>

            <div className="review-card__footer">
              <span className="review-date">{rev.date}</span>
              <span className="review-verified">
                <CheckCircle2 size={12} />
                <span>Verified Visitor</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TravelerReviews;
