import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getOrders, getEnquiries } from "@/store/craftora-store";
import type { Order, Enquiry } from "@/types/craftora";
import {
  ArrowLeft,
  Package,
  ShoppingCart,
  MessageCircle,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  LayoutDashboard,
  Sparkles,
  BarChart3,
  LogOut,
  User,
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

const statusColors: Record<string, string> = {
  new: "bg-green-100 text-green-700",
  replied: "bg-blue-100 text-blue-700",
  closed: "bg-gray-100 text-gray-500",
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

export default function ArtisanOrders() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [activeTab, setActiveTab] = useState<"enquiries" | "orders">("enquiries");

  useEffect(() => {
    setOrders(getOrders());
    setEnquiries(getEnquiries());
  }, []);

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
                item.path === "/artisan/orders" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
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
          <h1 className="text-lg font-bold text-[#2D1B0E]">Orders & Enquiries</h1>
        </header>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab("enquiries")}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${activeTab === "enquiries" ? "bg-[#1A5E4B] text-white" : "bg-white text-[#6B5E50] border border-[#E5DED4] hover:bg-[#F0EDE5]"}`}>
              <MessageCircle className="w-4 h-4" /> Enquiries ({enquiries.length})
            </button>
            <button onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${activeTab === "orders" ? "bg-[#1A5E4B] text-white" : "bg-white text-[#6B5E50] border border-[#E5DED4] hover:bg-[#F0EDE5]"}`}>
              <ShoppingCart className="w-4 h-4" /> Orders ({orders.length})
            </button>
          </div>

          {/* Enquiries */}
          {activeTab === "enquiries" && (
            <div className="space-y-4">
              {enquiries.map((enq, i) => (
                <motion.div key={enq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-[#E5DED4] p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[#2D1B0E] text-sm">{enq.productName}</h3>
                      <p className="text-xs text-[#6B5E50]">From {enq.buyerName}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[enq.status]}`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B5E50] bg-[#FDF8F0] p-3 rounded-lg">{enq.message}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-[#6B5E50]">{new Date(enq.createdAt).toLocaleDateString("en-IN")}</span>
                    <Button variant="outline" size="sm" className="text-xs border-[#1A5E4B] text-[#1A5E4B]">
                      Reply
                    </Button>
                  </div>
                </motion.div>
              ))}
              {enquiries.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-[#6B5E50]/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#2D1B0E]">No Enquiries Yet</h3>
                  <p className="text-sm text-[#6B5E50]">Enquiries from buyers will appear here</p>
                </div>
              )}
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.map((order, i) => {
                const statusIcon = order.status === "delivered" ? CheckCircle :
                  order.status === "shipped" ? Truck : Clock;
                const StatusIcon = statusIcon;
                return (
                  <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl border border-[#E5DED4] p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <img src={order.productImage} alt={order.productName}
                        className="w-16 h-16 rounded-lg object-cover border border-[#E5DED4]"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=80&h=80&fit=crop"; }} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-[#2D1B0E] text-sm">{order.productName}</h3>
                            <p className="text-xs text-[#6B5E50]">Buyer: {order.buyerName}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" /> {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[#C46828] font-bold">₹{order.total.toLocaleString("en-IN")}</span>
                          <span className="text-xs text-[#6B5E50]">Qty: {order.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {orders.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-[#6B5E50]/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#2D1B0E]">No Orders Yet</h3>
                  <p className="text-sm text-[#6B5E50]">Orders from buyers will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
