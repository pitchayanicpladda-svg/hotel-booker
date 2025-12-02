import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal, Star, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import HotelCard from "@/components/HotelCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { hotels, amenitiesOptions } from "@/data/hotels";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get("location") || "";

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const filteredHotels = useMemo(() => {
    let result = hotels;

    // Filter by location
    if (locationParam) {
      result = result.filter(
        (h) =>
          h.province.includes(locationParam) ||
          h.location.includes(locationParam) ||
          h.name.includes(locationParam)
      );
    }

    // Filter by price
    result = result.filter(
      (h) => h.pricePerNight >= priceRange[0] && h.pricePerNight <= priceRange[1]
    );

    // Filter by stars
    if (selectedStars.length > 0) {
      result = result.filter((h) => selectedStars.includes(h.stars));
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      result = result.filter((h) =>
        selectedAmenities.every((a) => h.amenities.includes(a))
      );
    }

    // Filter by policies
    if (selectedPolicies.length > 0) {
      result = result.filter((h) =>
        selectedPolicies.some((p) => h.policies.some((hp) => hp.includes(p)))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price-high":
        result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [locationParam, priceRange, selectedStars, selectedAmenities, selectedPolicies, sortBy]);

  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const togglePolicy = (policy: string) => {
    setSelectedPolicies((prev) =>
      prev.includes(policy) ? prev.filter((p) => p !== policy) : [...prev, policy]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedStars([]);
    setSelectedAmenities([]);
    setSelectedPolicies([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Search Header */}
      <section className="pt-28 pb-8 bg-secondary">
        <div className="container mx-auto px-4">
          <SearchBox variant="compact" />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-80 flex-shrink-0 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    ตัวกรอง
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-accent hover:underline"
                  >
                    ล้างทั้งหมด
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-medium mb-4">ราคาต่อคืน</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={10000}
                    step={500}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>฿{priceRange[0].toLocaleString()}</span>
                    <span>฿{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-8">
                  <h4 className="font-medium mb-4">ระดับดาว</h4>
                  <div className="flex flex-wrap gap-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        onClick={() => toggleStar(star)}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-all ${
                          selectedStars.includes(star)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border hover:border-accent"
                        }`}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            selectedStars.includes(star)
                              ? "fill-accent text-accent"
                              : ""
                          }`}
                        />
                        {star}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h4 className="font-medium mb-4">สิ่งอำนวยความสะดวก</h4>
                  <div className="space-y-3">
                    {amenitiesOptions.map((amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Policies */}
                <div>
                  <h4 className="font-medium mb-4">นโยบาย</h4>
                  <div className="space-y-3">
                    {["ยกเลิกฟรี", "จ่ายหน้าที่พัก"].map((policy) => (
                      <label
                        key={policy}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedPolicies.includes(policy)}
                          onCheckedChange={() => togglePolicy(policy)}
                        />
                        <span className="text-sm">{policy}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    {locationParam
                      ? `โรงแรมใน${locationParam}`
                      : "โรงแรมทั้งหมด"}
                  </h1>
                  <p className="text-muted-foreground">
                    พบ {filteredHotels.length} โรงแรม
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4" />
                    ตัวกรอง
                  </Button>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="recommended">แนะนำ</option>
                    <option value="price-low">ราคาต่ำ - สูง</option>
                    <option value="price-high">ราคาสูง - ต่ำ</option>
                    <option value="rating">คะแนนรีวิว</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedStars.length > 0 ||
                selectedAmenities.length > 0 ||
                selectedPolicies.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedStars.map((star) => (
                    <span
                      key={`star-${star}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                    >
                      {star} ดาว
                      <button onClick={() => toggleStar(star)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedAmenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                    >
                      {amenity}
                      <button onClick={() => toggleAmenity(amenity)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedPolicies.map((policy) => (
                    <span
                      key={policy}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                    >
                      {policy}
                      <button onClick={() => togglePolicy(policy)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Hotel Grid */}
              {filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredHotels.map((hotel, index) => (
                    <HotelCard key={hotel.id} hotel={hotel} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-xl text-muted-foreground mb-4">
                    ไม่พบโรงแรมที่ตรงกับเงื่อนไข
                  </p>
                  <Button onClick={clearFilters} variant="gold">
                    ล้างตัวกรองทั้งหมด
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchPage;
