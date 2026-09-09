import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getProducts, deleteProduct } from "@/store/craftora-store";
import type { Product } from "@/types/craftora";
import {
  Package,
  Plus,
  Search,
  Eye,
  Trash2,
  Sparkles,
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  LogOut,
  User,
  Star,
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

export default function ArtisanProducts() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filtered = products.filter(
    (p) =>
      p.published &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
  };

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex">
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
                item.path === "/artisan/products" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
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
        <header className="bg-white border-b border-[#E5DED4] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 bg-[#1A5E4B] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-['Playfair_Display']">C</span>
            </div>
          </div>
          <h1 className="text-lg font-bold text-[#2D1B0E]">My Products</h1>
          <Button className="bg-[#C46828] hover:bg-[#B35A20] text-white text-sm" onClick={() => navigate("/artisan/cataloging")}>
            <Plus className="w-4 h-4 mr-1" /> Add Product
          </Button>
        </header>

        <div className="p-6">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#6B5E50]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-96 pl-10 pr-4 py-2.5 border border-[#E5DED4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-xl border border-[#E5DED4] overflow-hidden hover:shadow-md transition-shadow"
              >
                <img src={product.image} alt={product.name} className="w-full h-44 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop"; }} />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#2D1B0E] text-sm line-clamp-1">{product.name}</h3>
                    <span className="text-[#C46828] font-bold text-sm whitespace-nowrap ml-2">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B5E50] mb-2">{product.category}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 fill-[#C46828] text-[#C46828]" />
                    <span className="text-xs font-medium">{product.rating || 4.5}</span>
                    <span className="text-xs text-[#6B5E50]">({product.reviewCount || 0} reviews)</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate("/marketplace/" + product.id)}
                      className="flex-1 py-1.5 bg-[#1A5E4B]/10 text-[#1A5E4B] rounded-lg text-xs font-medium hover:bg-[#1A5E4B]/20 transition-colors flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button onClick={() => handleDelete(product.id)}
                      className="py-1.5 px-3 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-[#6B5E50]/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2D1B0E] mb-2">No Products Found</h3>
              <p className="text-sm text-[#6B5E50] mb-4">Start by adding your first product using AI Cataloging</p>
              <Button className="bg-[#1A5E4B] hover:bg-[#164E3E] text-white" onClick={() => navigate("/artisan/cataloging")}>
                <Sparkles className="w-4 h-4 mr-2" /> AI Cataloging
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
