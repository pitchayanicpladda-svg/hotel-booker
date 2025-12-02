import { Link } from "react-router-dom";
import { Hotel } from "@/data/hotels";
import { Star, MapPin, Wifi, Car, Waves } from "lucide-react";
import { motion } from "framer-motion";

interface HotelCardProps {
  hotel: Hotel;
  index?: number;
}

const HotelCard = ({ hotel, index = 0 }: HotelCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("WiFi")) return <Wifi className="w-4 h-4" />;
    if (amenity.includes("ที่จอดรถ")) return <Car className="w-4 h-4" />;
    if (amenity.includes("สระ")) return <Waves className="w-4 h-4" />;
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/hotel/${hotel.id}`} className="block group">
        <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Promotion Badge */}
            {hotel.promotion && (
              <div className="absolute top-4 left-4 bg-accent text-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-gold">
                {hotel.promotion}
              </div>
            )}
            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              {hotel.rating}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-accent text-accent"
                />
              ))}
            </div>

            {/* Name */}
            <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
              {hotel.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
              <MapPin className="w-4 h-4" />
              {hotel.location}
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-3 mb-4">
              {hotel.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                >
                  {getAmenityIcon(amenity)}
                  {amenity}
                </span>
              ))}
            </div>

            {/* Policies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.policies.slice(0, 2).map((policy) => (
                <span
                  key={policy}
                  className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                >
                  {policy}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-end justify-between">
              <div>
                {hotel.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ฿{hotel.originalPrice.toLocaleString()}
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-accent">
                    ฿{hotel.pricePerNight.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">/คืน</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {hotel.reviewCount.toLocaleString()} รีวิว
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HotelCard;
