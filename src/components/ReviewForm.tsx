import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewFormProps {
  hotelId: string;
  onSubmit?: (review: {
    name: string;
    rating: number;
    comment: string;
  }) => void;
}

const ReviewForm = ({ hotelId, onSubmit }: ReviewFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "กรุณากรอกชื่อ",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "กรุณาให้คะแนน",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "กรุณาเขียนรีวิว",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit({ name, rating, comment });
    }

    toast({
      title: "ส่งรีวิวเรียบร้อย!",
      description: "ขอบคุณสำหรับความคิดเห็นของคุณ",
    });

    // Reset form
    setName("");
    setRating(0);
    setComment("");
    setIsExpanded(false);
    setIsSubmitting(false);
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return "ยอดเยี่ยม";
    if (rating >= 8) return "ดีมาก";
    if (rating >= 7) return "ดี";
    if (rating >= 6) return "พอใช้";
    if (rating >= 5) return "ปานกลาง";
    return "เลือกคะแนน";
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="bg-card rounded-xl p-6 shadow-soft">
      <h3 className="font-display text-xl font-semibold mb-4">
        เขียนรีวิวของคุณ
      </h3>

      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full py-4 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          คลิกเพื่อเขียนรีวิว
        </button>
      ) : (
        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium mb-2">ชื่อของคุณ</label>
              <Input
                placeholder="กรอกชื่อที่ต้องการแสดง"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">
                ให้คะแนน:{" "}
                <span className="text-accent">{getRatingLabel(displayRating)}</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        value <= displayRating
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium mb-2">
                รีวิวของคุณ
              </label>
              <Textarea
                placeholder="แชร์ประสบการณ์การเข้าพักของคุณ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="bg-secondary resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsExpanded(false)}
                className="flex-1"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                variant="gold"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "กำลังส่ง..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    ส่งรีวิว
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ReviewForm;
