import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Building2,
  QrCode,
  Check,
  ChevronLeft,
  Calendar,
  Users,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hotels } from "@/data/hotels";
import { useToast } from "@/hooks/use-toast";

const BookingPage = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const hotel = hotels.find((h) => h.id === hotelId);
  const room = hotel?.rooms.find((r) => r.id === roomId);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  if (!hotel || !room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลการจอง</h1>
          <Button onClick={() => navigate("/search")}>กลับไปค้นหา</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดตรวจสอบและกรอกข้อมูลที่จำเป็นทั้งหมด",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast({
        title: "กรุณาเลือกวิธีชำระเงิน",
        description: "โปรดเลือกวิธีชำระเงินที่ต้องการ",
        variant: "destructive",
      });
      return;
    }

    // Simulate payment success
    toast({
      title: "การจองสำเร็จ!",
      description: "ระบบได้ส่งรายละเอียดการจองไปยังอีเมลของคุณแล้ว",
    });
    setStep(3);
  };

  const nights = 2; // Mock data
  const totalPrice = room.pricePerNight * nights;
  const serviceFee = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + serviceFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            กลับ
          </button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s
                      ? "bg-accent text-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                <span
                  className={`hidden sm:block ${
                    step >= s ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s === 1 && "ข้อมูลผู้จอง"}
                  {s === 2 && "ชำระเงิน"}
                  {s === 3 && "ยืนยัน"}
                </span>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      step > s ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-2xl p-8 shadow-soft"
                >
                  <h2 className="font-display text-2xl font-semibold mb-6">
                    ข้อมูลผู้จอง
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">ชื่อ *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="ชื่อจริง"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">นามสกุล *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="นามสกุล"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">อีเมล *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0xx-xxx-xxxx"
                        className="mt-2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="specialRequests">
                        คำขอพิเศษ (ไม่บังคับ)
                      </Label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder="เช่น ห้องชั้นสูง, เตียงเสริม"
                        className="mt-2 w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent min-h-[100px] resize-none"
                      />
                    </div>
                  </div>

                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full mt-8"
                    onClick={handleSubmit}
                  >
                    ดำเนินการต่อ
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-2xl p-8 shadow-soft"
                >
                  <h2 className="font-display text-2xl font-semibold mb-6">
                    เลือกวิธีชำระเงิน
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        id: "credit",
                        icon: CreditCard,
                        title: "บัตรเครดิต/เดบิต",
                        description: "Visa, Mastercard, JCB",
                      },
                      {
                        id: "bank",
                        icon: Building2,
                        title: "โอนเงินผ่านธนาคาร",
                        description: "ธนาคารในประเทศไทย",
                      },
                      {
                        id: "promptpay",
                        icon: QrCode,
                        title: "PromptPay",
                        description: "สแกน QR Code เพื่อชำระเงิน",
                      },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === method.id
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            paymentMethod === method.id
                              ? "bg-accent text-foreground"
                              : "bg-secondary"
                          }`}
                        >
                          <method.icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold">{method.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                        {paymentMethod === method.id && (
                          <Check className="w-6 h-6 text-accent ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      ย้อนกลับ
                    </Button>
                    <Button
                      variant="gold"
                      size="lg"
                      className="flex-1"
                      onClick={handlePayment}
                    >
                      ชำระเงิน ฿{grandTotal.toLocaleString()}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-accent" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    การจองสำเร็จ!
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    หมายเลขการจอง: <span className="font-semibold">STY-2024-001234</span>
                  </p>
                  <p className="text-muted-foreground mb-8">
                    เราได้ส่งรายละเอียดการจองไปยัง {formData.email} แล้ว
                  </p>

                  <div className="bg-secondary rounded-xl p-6 mb-8 text-left">
                    <h3 className="font-semibold mb-4">รายละเอียดการจอง</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">โรงแรม:</span>{" "}
                        {hotel.name}
                      </p>
                      <p>
                        <span className="text-muted-foreground">ห้องพัก:</span>{" "}
                        {room.name}
                      </p>
                      <p>
                        <span className="text-muted-foreground">ผู้เข้าพัก:</span>{" "}
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p>
                        <span className="text-muted-foreground">ยอดรวม:</span>{" "}
                        ฿{grandTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => navigate("/")}
                    >
                      กลับหน้าแรก
                    </Button>
                    <Button
                      variant="gold"
                      size="lg"
                      className="flex-1"
                      onClick={() => navigate("/search")}
                    >
                      จองที่พักเพิ่ม
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl overflow-hidden shadow-card">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1">
                    {hotel.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {room.name}
                  </p>

                  <div className="space-y-3 py-4 border-y border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>15 - 17 ธ.ค. 2024 ({nights} คืน)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>2 ผู้เข้าพัก</span>
                    </div>
                  </div>

                  <div className="space-y-2 py-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ฿{room.pricePerNight.toLocaleString()} x {nights} คืน
                      </span>
                      <span>฿{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ค่าบริการและภาษี
                      </span>
                      <span>฿{serviceFee.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="font-semibold">ยอดรวมทั้งหมด</span>
                    <span className="text-2xl font-bold text-accent">
                      ฿{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingPage;
