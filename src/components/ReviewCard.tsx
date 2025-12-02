import { Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  stayType?: string;
  helpfulCount?: number;
}

interface ReviewCardProps {
  review: Review;
  index?: number;
}

const ReviewCard = ({ review, index = 0 }: ReviewCardProps) => {
  const [helpful, setHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);

  const handleHelpful = () => {
    if (!helpful) {
      setHelpful(true);
      setHelpfulCount((prev) => prev + 1);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "bg-green-600";
    if (rating >= 7) return "bg-primary";
    if (rating >= 5) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold shrink-0">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(review.name)
          )}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-foreground">{review.name}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{review.date}</span>
                {review.stayType && (
                  <>
                    <span>•</span>
                    <span>{review.stayType}</span>
                  </>
                )}
              </div>
            </div>
            <div
              className={`flex items-center gap-1 ${getRatingColor(review.rating)} text-primary-foreground px-3 py-1.5 rounded-lg font-semibold`}
            >
              <Star className="w-4 h-4 fill-current" />
              {review.rating.toFixed(1)}
            </div>
          </div>

          {/* Comment */}
          <p className="text-muted-foreground leading-relaxed mb-4">
            {review.comment}
          </p>

          {/* Helpful */}
          <button
            onClick={handleHelpful}
            className={`flex items-center gap-2 text-sm transition-colors ${
              helpful
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${helpful ? "fill-accent" : ""}`} />
            <span>
              {helpful ? "ขอบคุณสำหรับความคิดเห็น" : "รีวิวนี้มีประโยชน์"}
            </span>
            {helpfulCount > 0 && (
              <span className="text-muted-foreground">({helpfulCount})</span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
