import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";

export interface Hotel {
  id: string;
  name: string;
  location: string;
  province: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  stars: number;
  image: string;
  images: string[];
  amenities: string[];
  policies: string[];
  rooms: Room[];
  featured?: boolean;
  promotion?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  bedType: string;
  size: number;
  amenities: string[];
  image: string;
}

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "The Siam Heritage Resort",
    location: "หาดป่าตอง, ภูเก็ต",
    province: "ภูเก็ต",
    description: "รีสอร์ทหรูระดับ 5 ดาว ริมหาดป่าตอง พร้อมวิวทะเลอันดามันแบบพาโนรามา สระว่ายน้ำอินฟินิตี้ และสปาระดับโลก",
    rating: 9.2,
    reviewCount: 1247,
    pricePerNight: 4500,
    originalPrice: 6000,
    stars: 5,
    image: hotel1,
    images: [hotel1, hotel2, hotel3, hotel4],
    amenities: ["WiFi ฟรี", "สระว่ายน้ำ", "สปา", "ฟิตเนส", "ร้านอาหาร", "ที่จอดรถ", "รถรับส่งสนามบิน"],
    policies: ["ยกเลิกฟรีภายใน 24 ชม.", "จ่ายหน้าที่พัก"],
    featured: true,
    promotion: "ลด 25%",
    rooms: [
      {
        id: "r1",
        name: "Deluxe Ocean View",
        description: "ห้องดีลักซ์วิวทะเล พร้อมระเบียงส่วนตัว",
        pricePerNight: 4500,
        maxGuests: 2,
        bedType: "เตียงคิงไซส์",
        size: 45,
        amenities: ["วิวทะเล", "ระเบียง", "อ่างอาบน้ำ", "มินิบาร์"],
        image: hotel2,
      },
      {
        id: "r2",
        name: "Premium Suite",
        description: "สวีทหรูหรา พร้อมห้องนั่งเล่นแยก",
        pricePerNight: 7500,
        maxGuests: 3,
        bedType: "เตียงคิงไซส์",
        size: 75,
        amenities: ["วิวทะเล", "ระเบียง", "จากุซซี่", "ห้องนั่งเล่น"],
        image: hotel2,
      },
    ],
  },
  {
    id: "2",
    name: "Chiang Mai Mountain Lodge",
    location: "แม่ริม, เชียงใหม่",
    province: "เชียงใหม่",
    description: "ที่พักกลางขุนเขา บรรยากาศสงบเงียบ ล้อมรอบด้วยธรรมชาติ เหมาะสำหรับการพักผ่อนอย่างแท้จริง",
    rating: 9.5,
    reviewCount: 892,
    pricePerNight: 3200,
    stars: 4,
    image: hotel3,
    images: [hotel3, hotel1, hotel2, hotel4],
    amenities: ["WiFi ฟรี", "สระว่ายน้ำ", "ร้านอาหาร", "ที่จอดรถ", "สวน"],
    policies: ["ยกเลิกฟรีภายใน 48 ชม."],
    featured: true,
    rooms: [
      {
        id: "r3",
        name: "Mountain View Room",
        description: "ห้องพักวิวภูเขา บรรยากาศสดชื่น",
        pricePerNight: 3200,
        maxGuests: 2,
        bedType: "เตียงคิงไซส์",
        size: 40,
        amenities: ["วิวภูเขา", "ระเบียง", "เครื่องทำน้ำอุ่น"],
        image: hotel3,
      },
    ],
  },
  {
    id: "3",
    name: "Bangkok Skyline Hotel",
    location: "สุขุมวิท, กรุงเทพฯ",
    province: "กรุงเทพฯ",
    description: "โรงแรมหรูใจกลางกรุงเทพฯ ใกล้ BTS และห้างสรรพสินค้าชั้นนำ พร้อมวิวเมืองที่สวยงาม",
    rating: 8.8,
    reviewCount: 2156,
    pricePerNight: 2800,
    originalPrice: 3500,
    stars: 5,
    image: hotel4,
    images: [hotel4, hotel1, hotel2, hotel3],
    amenities: ["WiFi ฟรี", "สระว่ายน้ำ", "ฟิตเนส", "ร้านอาหาร", "บาร์"],
    policies: ["ยกเลิกฟรีภายใน 24 ชม.", "จ่ายหน้าที่พัก"],
    promotion: "ลด 20%",
    rooms: [
      {
        id: "r4",
        name: "Superior City View",
        description: "ห้องซูพีเรียวิวเมือง",
        pricePerNight: 2800,
        maxGuests: 2,
        bedType: "เตียงควีนไซส์",
        size: 35,
        amenities: ["วิวเมือง", "มินิบาร์"],
        image: hotel4,
      },
    ],
  },
  {
    id: "4",
    name: "Krabi Beachfront Villa",
    location: "อ่าวนาง, กระบี่",
    province: "กระบี่",
    description: "วิลล่าริมหาดส่วนตัว วิวทะเลอันดามัน เงียบสงบ เหมาะสำหรับฮันนีมูน",
    rating: 9.7,
    reviewCount: 543,
    pricePerNight: 8500,
    stars: 5,
    image: hotel1,
    images: [hotel1, hotel2, hotel3, hotel4],
    amenities: ["WiFi ฟรี", "สระส่วนตัว", "หาดส่วนตัว", "บัตเลอร์", "สปา"],
    policies: ["ยกเลิกฟรีภายใน 72 ชม."],
    featured: true,
    rooms: [
      {
        id: "r5",
        name: "Beachfront Pool Villa",
        description: "วิลล่าพูลริมหาด",
        pricePerNight: 8500,
        maxGuests: 2,
        bedType: "เตียงคิงไซส์",
        size: 120,
        amenities: ["สระส่วนตัว", "หาดส่วนตัว", "จากุซซี่"],
        image: hotel1,
      },
    ],
  },
  {
    id: "5",
    name: "Hua Hin Grand Resort",
    location: "ชะอำ, หัวหิน",
    province: "ประจวบคีรีขันธ์",
    description: "รีสอร์ทครอบครัวขนาดใหญ่ ติดหาดชะอำ มีกิจกรรมมากมายสำหรับทุกวัย",
    rating: 8.5,
    reviewCount: 1876,
    pricePerNight: 2200,
    stars: 4,
    image: hotel2,
    images: [hotel2, hotel1, hotel3, hotel4],
    amenities: ["WiFi ฟรี", "สระว่ายน้ำ", "สนามเด็กเล่น", "ร้านอาหาร", "ที่จอดรถ"],
    policies: ["ยกเลิกฟรีภายใน 24 ชม."],
    rooms: [
      {
        id: "r6",
        name: "Family Room",
        description: "ห้องครอบครัว พร้อมเตียงเสริม",
        pricePerNight: 2200,
        maxGuests: 4,
        bedType: "เตียงคิงไซส์ + เตียงเสริม",
        size: 50,
        amenities: ["วิวสวน", "ระเบียง"],
        image: hotel2,
      },
    ],
  },
  {
    id: "6",
    name: "Pattaya Ocean View",
    location: "จอมเทียน, พัทยา",
    province: "ชลบุรี",
    description: "โรงแรมวิวทะเลพัทยา ใกล้แหล่งบันเทิงและร้านอาหาร",
    rating: 8.2,
    reviewCount: 987,
    pricePerNight: 1800,
    originalPrice: 2400,
    stars: 4,
    image: hotel4,
    images: [hotel4, hotel1, hotel2, hotel3],
    amenities: ["WiFi ฟรี", "สระว่ายน้ำ", "ฟิตเนส", "ร้านอาหาร"],
    policies: ["จ่ายหน้าที่พัก"],
    promotion: "ลด 25%",
    rooms: [
      {
        id: "r7",
        name: "Sea View Room",
        description: "ห้องวิวทะเล",
        pricePerNight: 1800,
        maxGuests: 2,
        bedType: "เตียงควีนไซส์",
        size: 32,
        amenities: ["วิวทะเล"],
        image: hotel4,
      },
    ],
  },
];

export const provinces = [
  "กรุงเทพฯ",
  "ภูเก็ต",
  "เชียงใหม่",
  "กระบี่",
  "ประจวบคีรีขันธ์",
  "ชลบุรี",
  "สมุย",
  "พังงา",
];

export const amenitiesOptions = [
  "WiFi ฟรี",
  "สระว่ายน้ำ",
  "สปา",
  "ฟิตเนส",
  "ร้านอาหาร",
  "ที่จอดรถ",
  "รถรับส่งสนามบิน",
];
