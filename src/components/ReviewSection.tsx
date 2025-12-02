import { useState } from "react";
import { Star, Filter } from "lucide-react";
import ReviewCard, { Review } from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewSectionProps {
  hotelId: string;
  hotelRating: number;
  reviewCount: number;
  initialReviews: Review[];
}

const ReviewSection = ({
  hotelId,
  hotelRating,
  reviewCount,
  initialReviews,
}: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [sortBy, setSortBy] = useState("newest");
  const [showAll, setShowAll] = useState(false);

  const handleNewReview = (newReview: {
    name: string;
    rating: number;
    comment: string;
  }) => {
    const review: Review = {
      id: `new-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      date: "เมื่อสักครู่",
      comment: newReview.comment,
      stayType: "เดินทางคนเดียว",
      helpfulCount: 0,
    };
    setReviews([review, ...reviews]);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0; // newest is default order
    }
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);

  const getRatingDistribution = () => {
    const distribution = {
      excellent: 0, // 9-10
      great: 0, // 7-8
      good: 0, // 5-6
      fair: 0, // 3-4
      poor: 0, // 1-2
    };

    reviews.forEach((r) => {
      if (r.rating >= 9) distribution.excellent++;
      else if (r.rating >= 7) distribution.great++;
      else if (r.rating >= 5) distribution.good++;
      else if (r.rating >= 3) distribution.fair++;
      else distribution.poor++;
    });

    return distribution;
  };

  const distribution = getRatingDistribution();
  const total = reviews.length || 1;

  return (
    <div className="space-y-8">
      {/* Header & Stats */}
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Overall Rating */}
          <div className="text-center md:pr-8 md:border-r border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-8 h-8 fill-accent text-accent" />
              <span className="text-5xl font-bold text-accent">
                {hotelRating.toFixed(1)}
              </span>
            </div>
            <p className="text-muted-foreground">
              จาก {reviewCount.toLocaleString()} รีวิว
            </p>
            <p className="text-sm text-foreground font-medium mt-1">
              {hotelRating >= 9
                ? "ยอดเยี่ยม"
                : hotelRating >= 8
                  ? "ดีมาก"
                  : hotelRating >= 7
                    ? "ดี"
                    : "พอใช้"}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {[
              { label: "ยอดเยี่ยม", count: distribution.excellent, color: "bg-green-600" },
              { label: "ดีมาก", count: distribution.great, color: "bg-primary" },
              { label: "ดี", count: distribution.good, color: "bg-blue-500" },
              { label: "พอใช้", count: distribution.fair, color: "bg-yellow-500" },
              { label: "ต้องปรับปรุง", count: distribution.poor, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-24">
                  {item.label}
                </span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all`}
                    style={{ width: `${(item.count / total) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      <ReviewForm hotelId={hotelId} onSubmit={handleNewReview} />

      {/* Filter & Sort */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">
          รีวิวทั้งหมด ({reviews.length})
        </h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-36 bg-card">
              <SelectValue placeholder="เรียงตาม" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">ล่าสุด</SelectItem>
              <SelectItem value="highest">คะแนนสูง</SelectItem>
              <SelectItem value="lowest">คะแนนต่ำ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>

      {/* Show More */}
      {reviews.length > 3 && !showAll && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            ดูรีวิวทั้งหมด ({reviews.length} รีวิว)
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
