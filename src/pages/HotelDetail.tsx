import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Waves,
  Utensils,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  Users,
  BedDouble,
  Maximize,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { hotels, Hotel, Room } from "@/data/hotels";

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบโรงแรม</h1>
          <Button onClick={() => navigate("/search")}>กลับไปค้นหา</Button>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("WiFi")) return <Wifi className="w-5 h-5" />;
    if (amenity.includes("ที่จอดรถ")) return <Car className="w-5 h-5" />;
    if (amenity.includes("สระ")) return <Waves className="w-5 h-5" />;
    if (amenity.includes("ร้านอาหาร")) return <Utensils className="w-5 h-5" />;
    if (amenity.includes("ฟิตเนส")) return <Dumbbell className="w-5 h-5" />;
    return <Check className="w-5 h-5" />;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    navigate(`/booking/${hotel.id}/${room.id}`);
  };

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: "สมชาย ใจดี",
      rating: 9.5,
      date: "พ.ย. 2024",
      comment: "ที่พักสวยมาก บริการดีเยี่ยม วิวทะเลสุดยอด จะกลับมาพักอีกแน่นอน",
    },
    {
      id: 2,
      name: "วรรณา มาลัย",
      rating: 9.0,
      date: "ต.ค. 2024",
      comment: "ห้องสะอาด อาหารเช้าอร่อย พนักงานเป็นกันเอง",
    },
    {
      id: 3,
      name: "ธนา รุ่งเรือง",
      rating: 9.8,
      date: "ก.ย. 2024",
      comment: "สุดยอดมาก ดีกว่าที่คาดไว้อีก แนะนำเลยครับ",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Image Gallery */}
      <section className="pt-20">
        <div className="relative h-[60vh] overflow-hidden">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {hotel.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-accent w-8"
                    : "bg-primary-foreground/50 hover:bg-primary-foreground/80"
                }`}
              />
            ))}
          </div>

          {/* Promotion Badge */}
          {hotel.promotion && (
            <div className="absolute top-24 left-4 bg-accent text-foreground px-4 py-2 rounded-full font-semibold shadow-gold">
              {hotel.promotion}
            </div>
          )}
        </div>
      </section>

      {/* Hotel Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
                </div>
                <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                  {hotel.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    {hotel.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    {hotel.rating} ({hotel.reviewCount.toLocaleString()} รีวิว)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">
                  เกี่ยวกับที่พัก
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {hotel.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">
                  สิ่งอำนวยความสะดวก
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                    >
                      <span className="text-accent">
                        {getAmenityIcon(amenity)}
                      </span>
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rooms */}
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">
                  ประเภทห้องพัก
                </h2>
                <div className="space-y-4">
                  {hotel.rooms.map((room) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="font-display text-xl font-semibold mb-2">
                            {room.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {room.description}
                          </p>

                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              สูงสุด {room.maxGuests} ท่าน
                            </span>
                            <span className="flex items-center gap-1">
                              <BedDouble className="w-4 h-4" />
                              {room.bedType}
                            </span>
                            <span className="flex items-center gap-1">
                              <Maximize className="w-4 h-4" />
                              {room.size} ตร.ม.
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.map((amenity) => (
                              <span
                                key={amenity}
                                className="text-xs bg-secondary px-2 py-1 rounded-full"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-accent">
                                ฿{room.pricePerNight.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                /คืน
                              </span>
                            </div>
                            <Button
                              variant="gold"
                              onClick={() => handleBookRoom(room)}
                            >
                              เลือกห้องนี้
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">
                  รีวิวจากผู้เข้าพัก
                </h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-card rounded-xl p-6 shadow-soft"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          {review.rating}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl p-6 shadow-card">
                <div className="text-center mb-6">
                  {hotel.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ฿{hotel.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-accent">
                      ฿{hotel.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">/คืน</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    รวมภาษีและค่าธรรมเนียม
                  </p>
                </div>

                {/* Policies */}
                <div className="space-y-3 mb-6">
                  {hotel.policies.map((policy) => (
                    <div key={policy} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-sm">{policy}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="gold"
                  size="xl"
                  className="w-full"
                  onClick={() =>
                    hotel.rooms[0] && handleBookRoom(hotel.rooms[0])
                  }
                >
                  จองเลย
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  ยืนยันการจองทันที • ไม่มีค่าธรรมเนียมเพิ่มเติม
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HotelDetail;
