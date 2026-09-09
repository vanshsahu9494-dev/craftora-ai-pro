import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getProducts, getEnquiries, getOrders } from "@/store/craftora-store";
import type { Product, Enquiry, Order } from "@/types/craftora";
import {
  LayoutDashboard,
  Package,
  Sparkles,
  ShoppingCart,
  BarChart3,
  User,
  LogOut,
  Bell,
  Settings,
  HelpCircle,
  TrendingUp,
  Eye,
  ChevronRight,
  Star,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/artisan/dashboard" },
  { icon: Package, label: "My Products", path: "/artisan/products" },
  { icon: Sparkles, label: "AI Cataloging", path: "/artisan/cataloging" },
  { icon: ShoppingCart, label: "Orders & Enquiries", path: "/artisan/orders" },
  { icon: BarChart3, label: "Market Insights", path: "/artisan/dashboard" },
  { icon: User, label: "Profile", path: "/artisan/profile" },
];

export default function ArtisanDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const allProducts = getProducts();
    const myProducts = allProducts.filter((p) => p.artisanId === user?.id || p.artisanName === user?.name || p.published);
    const allEnquiries = getEnquiries().filter((e) => e.artisanId === user?.id || true);
    const allOrders = getOrders().filter((o) => o.artisanId === user?.id || true);
    setProducts(myProducts);
    setEnquiries(allEnquiries);
    setOrders(allOrders);
  }, [user]);

  const totalEarnings = orders.reduce((sum, o) => sum + o.total, 0);
  const publishedCount = products.filter((p) => p.published).length;
  const currentPath = "/artisan/dashboard";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const stats = [
    {
      icon: Package,
      label: "Total Products",
      value: publishedCount,
      change: "+2 this week",
      color: "bg-[#1A5E4B]/10 text-[#1A5E4B]",
    },
    {
      icon: Eye,
      label: "Total Enquiries",
      value: enquiries.length,
      change: "+3 this week",
      color: "bg-[#C46828]/10 text-[#C46828]",
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      value: orders.length,
      change: "+1 this week",
      color: "bg-[#2E7D5B]/10 text-[#2E7D5B]",
    },
    {
      icon: TrendingUp,
      label: "Estimated Earnings",
      value: `₹${totalEarnings.toLocaleString("en-IN")}`,
      change: "+12% this week",
      color: "bg-[#D4943C]/10 text-[#D4943C]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#1A5E4B] flex-col fixed h-full z-40">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#1A5E4B] font-bold text-sm font-['Playfair_Display']">C</span>
            </div>
            <span className="text-lg font-bold text-white font-['Playfair_Display']">
              Craft<span className="text-[#C46828]">ora</span> AI
            </span>
          </div>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C46828] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.[0] || "A"}
              </span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{user?.name || "Artisan"}</p>
              <p className="text-white/60 text-xs">Artisan</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.path && item.label === "Dashboard";
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => {
              signOut();
              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E5DED4] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1A5E4B] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-['Playfair_Display']">C</span>
              </div>
              <span className="text-lg font-bold font-['Playfair_Display']">
                <span className="text-[#1A5E4B]">Craft</span>
                <span className="text-[#C46828]">ora</span>
              </span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-lg font-bold text-[#2D1B0E]">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-[#F0EDE5] rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-[#6B5E50]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C46828] rounded-full" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F0EDE5] rounded-lg">
              <span className="text-xs font-medium text-[#6B5E50]">EN</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-[#2D1B0E]">
              {getGreeting()}, {user?.name?.split(" ")[0] || "Artisan"}! 👋
            </h2>
            <p className="text-[#6B5E50] text-sm mt-1">
              Here's what's happening with your craft business today.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-5 border border-[#E5DED4] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-[#6B5E50] font-medium">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-[#2D1B0E]">{stat.value}</p>
                <p className="text-xs text-[#2E7D5B] mt-1">{stat.change}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Products & Market Insights */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Products */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#2D1B0E]">Recent Products</h3>
                <button
                  onClick={() => navigate("/artisan/products")}
                  className="text-sm text-[#1A5E4B] hover:underline font-medium flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {products.slice(0, 4).map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl border border-[#E5DED4] overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=200&fit=crop";
                      }}
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-[#2D1B0E] text-sm truncate">{product.name}</h4>
                      <p className="text-[#C46828] font-bold text-sm mt-1">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-[#6B5E50]">
                          Listed · {Math.floor(Math.random() * 5 + 1)} days ago
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#C46828] text-[#C46828]" />
                          <span className="text-xs font-medium text-[#2D1B0E]">{product.rating}</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 py-1.5 bg-[#1A5E4B]/10 text-[#1A5E4B] rounded-lg text-xs font-medium hover:bg-[#1A5E4B]/20 transition-colors">
                        View Leads
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div>
              <h3 className="text-lg font-bold text-[#2D1B0E] mb-4">Market Insights</h3>
              <div className="bg-white rounded-xl border border-[#E5DED4] p-5">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-[#2D1B0E]">📈 Trending</p>
                    <p className="text-xs text-[#6B5E50] mt-1">
                      Eco-friendly Handicrafts
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2D1B0E]">🔥 Demand is</p>
                    <p className="text-xs text-[#2E7D5B] font-semibold mt-1">
                      Increasing in Your Category
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2D1B0E]">💡 Suggestions</p>
                    <ul className="text-xs text-[#6B5E50] mt-1 space-y-1">
                      <li>• Add more product photos</li>
                      <li>• List Eco-friendly Products</li>
                      <li>• Respond to enquiries quickly</li>
                    </ul>
                  </div>
                  <button className="w-full py-2 bg-[#1A5E4B] text-white rounded-lg text-xs font-medium hover:bg-[#164E3E] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/artisan/cataloging")}
              className="bg-gradient-to-br from-[#1A5E4B] to-[#2E7D5B] text-white rounded-xl p-6 text-left hover:shadow-lg transition-shadow group"
            >
              <Sparkles className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg">AI Cataloging</h3>
              <p className="text-white/80 text-sm mt-1">
                Upload a photo and let AI create your listing
              </p>
            </button>

            <button
              onClick={() => navigate("/artisan/products")}
              className="bg-gradient-to-br from-[#C46828] to-[#D4943C] text-white rounded-xl p-6 text-left hover:shadow-lg transition-shadow group"
            >
              <Package className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg">My Products</h3>
              <p className="text-white/80 text-sm mt-1">
                Manage and edit your product catalog
              </p>
            </button>

            <button
              onClick={() => navigate("/marketplace")}
              className="bg-gradient-to-br from-[#2D1B0E] to-[#4A3425] text-white rounded-xl p-6 text-left hover:shadow-lg transition-shadow group"
            >
              <Eye className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg">View Marketplace</h3>
              <p className="text-white/80 text-sm mt-1">
                See how your products appear to buyers
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
