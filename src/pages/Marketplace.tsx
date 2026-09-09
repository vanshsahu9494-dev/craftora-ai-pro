import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getProducts } from "@/store/craftora-store";
import type { Product } from "@/types/craftora";
import { CATEGORIES } from "@/types/craftora";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Star,
  Sparkles,
  Package,
  Home,
  Eye,
  Menu,
  X,
} from "lucide-react";

export default function Marketplace() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts().filter((p) => p.published));
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryIcons: Record<string, string> = {
    All: "🛍️",
    "Home Decor": "🏠",
    Handicrafts: "🎨",
    "Fashion & Textiles": "👗",
    Jewellery: "💍",
    Woodwork: "🪵",
    "Pottery & Ceramics": "🏺",
    "Paintings & Art": "🖼️",
    Others: "📦",
  };

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5DED4] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="w-8 h-8 bg-[#1A5E4B] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-['Playfair_Display']">C</span>
              </div>
              <span className="text-xl font-bold font-['Playfair_Display']">
                <span className="text-[#1A5E4B]">Craft</span>
                <span className="text-[#C46828]">ora</span>{" "}
                <span className="text-[#1A5E4B]">AI</span>
              </span>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#6B5E50]" />
                <input
                  type="text"
                  placeholder="Search for products, artisans, or categories…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FDF8F0] border border-[#E5DED4] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-[#F0EDE5] rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-[#6B5E50]" />
              </button>
              <button onClick={() => navigate("/buyer/orders")} className="p-2 hover:bg-[#F0EDE5] rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-[#6B5E50]" />
              </button>
              {user ? (
                <button onClick={() => navigate(user.role === "artisan" ? "/artisan/dashboard" : "/buyer/orders")} className="w-8 h-8 rounded-full bg-[#1A5E4B] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{user.name[0]}</span>
                </button>
              ) : (
                <Button variant="ghost" className="text-[#1A5E4B] text-sm" onClick={() => navigate("/role")}>
                  <User className="w-4 h-4 mr-1" /> Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#6B5E50]" />
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FDF8F0] border border-[#E5DED4] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#1A5E4B] to-[#2E7D5B] rounded-2xl p-8 mb-8 text-white overflow-hidden relative"
        >
          <div className="relative z-10 max-w-lg">
            <h2 className="text-3xl font-bold font-['Playfair_Display'] mb-2">
              Authentic Crafts Directly from Artisans
            </h2>
            <p className="text-white/80 mb-4">
              Explore unique handmade products and support rural artisans.
            </p>
            <Button className="bg-white text-[#1A5E4B] hover:bg-white/90 font-medium" onClick={() => setSelectedCategory("All")}>
              Shop Now
            </Button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
            <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <div className="hidden lg:block w-56 shrink-0">
            <h3 className="font-semibold text-[#2D1B0E] mb-4">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === "All" ? "bg-[#1A5E4B] text-white" : "text-[#6B5E50] hover:bg-[#F0EDE5]"
                }`}
              >
                <span>{categoryIcons["All"]}</span> All Products
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat ? "bg-[#1A5E4B] text-white" : "text-[#6B5E50] hover:bg-[#F0EDE5]"
                  }`}
                >
                  <span>{categoryIcons[cat] || "📦"}</span> {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile categories */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5DED4] z-40 px-4 py-2 flex gap-2 overflow-x-auto">
            {["All", ...CATEGORIES].map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  selectedCategory === cat ? "bg-[#1A5E4B] text-white" : "bg-[#F0EDE5] text-[#6B5E50]"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#2D1B0E]">
                Featured Products
                <span className="text-sm font-normal text-[#6B5E50] ml-2">({filtered.length})</span>
              </h3>
              <button onClick={() => setSelectedCategory("All")} className="text-sm text-[#1A5E4B] hover:underline font-medium">
                View All
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-xl border border-[#E5DED4] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate("/marketplace/" + product.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop";
                      }}
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                      onClick={(e) => { e.stopPropagation(); }}>
                      <Heart className="w-4 h-4 text-[#C46828]" />
                    </button>
                    {product.ecoFriendly && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#2E7D5B]/90 text-white text-xs rounded-full font-medium">
                        🌿 Eco
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-[#2D1B0E] text-sm line-clamp-1 mb-1">{product.name}</h4>
                    <p className="text-xs text-[#6B5E50] mb-2">{product.category}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-[#C46828] text-[#C46828]" />
                      <span className="text-xs font-medium text-[#2D1B0E]">{product.rating}</span>
                      <span className="text-xs text-[#6B5E50]">({product.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#C46828] font-bold text-lg">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#6B5E50] bg-[#F0EDE5] px-2 py-1 rounded-full">
                        {product.materials?.[0] || "Handmade"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-[#6B5E50]/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#2D1B0E]">No Products Found</h3>
                <p className="text-sm text-[#6B5E50]">Try a different search or category</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5DED4] z-50 px-4 py-2 flex justify-around">
        <button onClick={() => navigate("/marketplace")} className="flex flex-col items-center gap-0.5 p-2 text-[#1A5E4B]">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => navigate("/marketplace")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <Eye className="w-5 h-5" />
          <span className="text-[10px] font-medium">Explore</span>
        </button>
        <button onClick={() => navigate("/buyer/orders")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Orders</span>
        </button>
        <button onClick={() => navigate("/role")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}
