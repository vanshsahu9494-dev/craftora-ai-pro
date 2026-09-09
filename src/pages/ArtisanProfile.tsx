import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Package,
  Sparkles,
  ShoppingCart,
  BarChart3,
  User,
  LogOut,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Shield,
  Edit,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/artisan/dashboard" },
  { icon: Package, label: "My Products", path: "/artisan/products" },
  { icon: Sparkles, label: "AI Cataloging", path: "/artisan/cataloging" },
  { icon: ShoppingCart, label: "Orders & Enquiries", path: "/artisan/orders" },
  { icon: BarChart3, label: "Market Insights", path: "/artisan/dashboard" },
  { icon: User, label: "Profile", path: "/artisan/profile" },
];

export default function ArtisanProfile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex">
      <aside className="hidden lg:flex w-64 bg-[#1A5E4B] flex-col fixed h-full z-40">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#1A5E4B] font-bold text-sm font-['Playfair_Display']">C</span>
            </div>
            <span className="text-lg font-bold text-white font-['Playfair_Display']">Craft<span className="text-[#C46828]">ora</span> AI</span>
          </div>
        </div>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C46828] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{user?.name?.[0] || "A"}</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{user?.name || "Artisan"}</p>
              <p className="text-white/60 text-xs">Artisan</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                item.path === "/artisan/profile" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={() => { signOut(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white">
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-[#E5DED4] px-6 py-4 flex items-center sticky top-0 z-30">
          <h1 className="text-lg font-bold text-[#2D1B0E]">Profile</h1>
        </header>

        <div className="p-6 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-[#E5DED4] overflow-hidden">
            {/* Cover */}
            <div className="h-32 bg-gradient-to-r from-[#1A5E4B] to-[#2E7D5B] relative">
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-full bg-[#C46828] border-4 border-white flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">{user?.name?.[0] || "A"}</span>
                </div>
              </div>
            </div>

            <div className="pt-14 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#2D1B0E]">{user?.name || "Artisan"}</h2>
                  <p className="text-sm text-[#6B5E50] flex items-center gap-1 mt-1">
                    <Shield className="w-4 h-4 text-[#2E7D5B]" /> Verified Artisan
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-[#1A5E4B] text-[#1A5E4B]">
                  <Edit className="w-4 h-4 mr-1" /> Edit Profile
                </Button>
              </div>

              <p className="text-sm text-[#6B5E50] mb-6 leading-relaxed">
                {user?.bio || "Master artisan with expertise in traditional Indian handicrafts."}
              </p>

              <div className="space-y-3">
                {[
                  { icon: Mail, label: "Email", value: user?.email || "artisan@craftora.com" },
                  { icon: Phone, label: "Phone", value: user?.phone || "+91 98765 43210" },
                  { icon: MapPin, label: "Location", value: user?.location || "Rajasthan, India" },
                  { icon: Calendar, label: "Member Since", value: user?.joinDate ? new Date(user.joinDate).toLocaleDateString("en-IN") : "September 2026" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-[#FDF8F0] rounded-lg">
                    <div className="w-8 h-8 bg-[#1A5E4B]/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#1A5E4B]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B5E50]">{item.label}</p>
                      <p className="text-sm font-medium text-[#2D1B0E]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
