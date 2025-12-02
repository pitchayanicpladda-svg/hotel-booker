import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { motion } from "framer-motion";
import { provinces } from "@/data/hotels";

interface SearchBoxProps {
  variant?: "hero" | "compact";
}

const SearchBox = ({ variant = "hero" }: SearchBoxProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkIn) params.set("checkIn", checkIn.toISOString());
    if (checkOut) params.set("checkOut", checkOut.toISOString());
    params.set("guests", guests.toString());
    navigate(`/search?${params.toString()}`);
  };

  const isHero = variant === "hero";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`${
        isHero
          ? "bg-card/95 backdrop-blur-md rounded-2xl shadow-elevated p-6"
          : "bg-card rounded-xl shadow-card p-4"
      }`}
    >
      <div
        className={`grid gap-4 ${
          isHero ? "md:grid-cols-4 lg:grid-cols-5" : "md:grid-cols-5"
        }`}
      >
        {/* Location */}
        <div className={`relative ${isHero ? "md:col-span-1 lg:col-span-1" : ""}`}>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            สถานที่
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="จังหวัด หรือชื่อโรงแรม"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setShowLocationDropdown(true)}
              onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card rounded-lg shadow-card border border-border z-10 max-h-48 overflow-y-auto">
                {provinces
                  .filter((p) =>
                    p.toLowerCase().includes(location.toLowerCase())
                  )
                  .map((province) => (
                    <button
                      key={province}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                      onClick={() => {
                        setLocation(province);
                        setShowLocationDropdown(false);
                      }}
                    >
                      {province}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Check-in */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            วันที่เข้าพัก
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center gap-2 pl-3 pr-4 py-3 rounded-lg border border-input bg-background hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all text-left">
                <CalendarDays className="w-5 h-5 text-muted-foreground" />
                <span className={checkIn ? "text-foreground" : "text-muted-foreground"}>
                  {checkIn
                    ? format(checkIn, "dd MMM yyyy", { locale: th })
                    : "เลือกวันที่"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            วันที่ออก
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center gap-2 pl-3 pr-4 py-3 rounded-lg border border-input bg-background hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all text-left">
                <CalendarDays className="w-5 h-5 text-muted-foreground" />
                <span className={checkOut ? "text-foreground" : "text-muted-foreground"}>
                  {checkOut
                    ? format(checkOut, "dd MMM yyyy", { locale: th })
                    : "เลือกวันที่"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) =>
                  date < new Date() || (checkIn ? date <= checkIn : false)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            จำนวนผู้เข้าพัก
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} คน
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            variant="gold"
            size="lg"
            className="w-full gap-2"
          >
            <Search className="w-5 h-5" />
            ค้นหา
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBox;
