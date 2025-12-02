import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="font-display text-xl font-bold text-foreground">S</span>
              </div>
              <span className="font-display text-2xl font-semibold">StaySiam</span>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              ค้นหาและจองโรงแรมที่ดีที่สุดในประเทศไทย ด้วยราคาสุดพิเศษและบริการระดับโลก
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">ลิงก์ด่วน</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  ค้นหาโรงแรม
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  โปรโมชั่น
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">จุดหมายยอดนิยม</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/search?location=ภูเก็ต" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  โรงแรมในภูเก็ต
                </Link>
              </li>
              <li>
                <Link to="/search?location=เชียงใหม่" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  โรงแรมในเชียงใหม่
                </Link>
              </li>
              <li>
                <Link to="/search?location=กรุงเทพฯ" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  โรงแรมในกรุงเทพฯ
                </Link>
              </li>
              <li>
                <Link to="/search?location=กระบี่" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  โรงแรมในกระบี่
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">ติดต่อเรา</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-accent" />
                <span className="text-primary-foreground/80">
                  123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/80">02-123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/80">support@staysiam.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 StaySiam. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-accent transition-colors">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-accent transition-colors">
                ข้อกำหนดการใช้งาน
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
