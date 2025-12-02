import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, CreditCard, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import HotelCard from "@/components/HotelCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { hotels } from "@/data/hotels";
import heroImage from "@/assets/hero-pool.jpg";

const Index = () => {
  const featuredHotels = hotels.filter((h) => h.featured);
  const promotionHotels = hotels.filter((h) => h.promotion);

  const features = [
    {
      icon: Shield,
      title: "จองปลอดภัย 100%",
      description: "การจองทุกรายการได้รับการคุ้มครองและยืนยันทันที",
    },
    {
      icon: Clock,
      title: "ยกเลิกฟรี",
      description: "ยืดหยุ่นการเปลี่ยนแปลงแผนการเดินทางของคุณ",
    },
    {
      icon: CreditCard,
      title: "ราคาดีที่สุด",
      description: "รับประกันราคาถูกที่สุด พร้อมโปรโมชั่นพิเศษ",
    },
    {
      icon: Headphones,
      title: "บริการ 24/7",
      description: "ทีมงานพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Thai resort with infinity pool overlooking the ocean at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/90 via-teal-dark/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6"
            >
              ยินดีต้อนรับสู่ StaySiam
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
            >
              ค้นพบที่พักในฝัน
              <span className="block text-accent">ทั่วประเทศไทย</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-primary-foreground/80 mb-10 max-w-xl"
            >
              จองโรงแรมหรู รีสอร์ทติดทะเล และที่พักสุดพิเศษกว่า 10,000 แห่ง
              ในราคาที่ดีที่สุด
            </motion.p>

            {/* Search Box */}
            <div className="max-w-4xl">
              <SearchBox variant="hero" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-accent rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-accent font-medium mb-2 block"
              >
                แนะนำสำหรับคุณ
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-3xl md:text-4xl font-bold text-foreground"
              >
                โรงแรมยอดนิยม
              </motion.h2>
            </div>
            <Link to="/search">
              <Button variant="ghost" className="gap-2">
                ดูทั้งหมด
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <HotelCard key={hotel.id} hotel={hotel} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-medium mb-2 block"
            >
              ข้อเสนอพิเศษ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-bold text-primary-foreground"
            >
              โปรโมชั่นสุดคุ้ม
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotionHotels.map((hotel, index) => (
              <HotelCard key={hotel.id} hotel={hotel} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-teal-dark to-teal rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                พร้อมเริ่มการเดินทางของคุณแล้วหรือยัง?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                สมัครสมาชิกวันนี้ รับส่วนลดพิเศษสำหรับการจองครั้งแรก
                และสิทธิพิเศษมากมาย
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gold" size="xl">
                  สมัครสมาชิกฟรี
                </Button>
                <Button variant="outline-light" size="xl">
                  ดูโปรโมชั่นทั้งหมด
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
