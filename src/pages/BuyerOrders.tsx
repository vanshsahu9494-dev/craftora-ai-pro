import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getOrders } from "@/store/craftora-store";
import type { Order } from "@/types/craftora";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Home,
  Eye,
  ShoppingCart,
  User,
} from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
};

export default function BuyerOrders() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const tabs = ["all", "pending", "processing", "shipped", "delivered"];
  const filtered = orders.filter(
    (o) => activeTab === "all" || o.status === activeTab
  );

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      <header className="bg-white border-b border-[#E5DED4] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F0EDE5] rounded-lg">
            <ArrowLeft className="w-5 h-5 text-[#6B5E50]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A5E4B] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-['Playfair_Display']">C</span>
            </div>
            <span className="text-lg font-bold font-['Playfair_Display']">
              <span className="text-[#1A5E4B]">Craft</span><span className="text-[#C46828]">ora</span>
            </span>
          </div>
          <h1 className="text-lg font-bold text-[#2D1B0E] ml-4">My Orders</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-[#1A5E4B] text-white"
                  : "bg-white text-[#6B5E50] border border-[#E5DED4] hover:bg-[#F0EDE5]"
              }`}
            >
              {tab === "all" ? "All Orders" : tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filtered.map((order, i) => {
            const StatusIcon = statusIcons[order.status] || Clock;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-[#E5DED4] p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-20 h-20 rounded-lg object-cover border border-[#E5DED4]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=100&h=100&fit=crop";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[#2D1B0E] text-sm">{order.productName}</h3>
                        <p className="text-xs text-[#6B5E50] mt-0.5">by {order.artisanName}</p>
                        <p className="text-xs text-[#6B5E50]">Order #{order.id.slice(-6).toUpperCase()}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-sm">
                        <span className="text-[#C46828] font-bold">₹{order.total.toLocaleString("en-IN")}</span>
                        <span className="text-[#6B5E50] text-xs ml-2">×{order.quantity}</span>
                      </div>
                      <span className="text-xs text-[#6B5E50]">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-[#6B5E50]/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#2D1B0E]">No Orders Yet</h3>
            <p className="text-sm text-[#6B5E50] mb-4">Browse the marketplace and place your first order</p>
            <Button className="bg-[#1A5E4B] text-white" onClick={() => navigate("/marketplace")}>
              Browse Marketplace
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5DED4] z-40 px-4 py-2 flex justify-around">
        <button onClick={() => navigate("/marketplace")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <Home className="w-5 h-5" /> <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => navigate("/marketplace")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <Eye className="w-5 h-5" /> <span className="text-[10px]">Explore</span>
        </button>
        <button onClick={() => navigate("/buyer/orders")} className="flex flex-col items-center gap-0.5 p-2 text-[#1A5E4B]">
          <ShoppingCart className="w-5 h-5" /> <span className="text-[10px]">Orders</span>
        </button>
        <button onClick={() => navigate("/role")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <User className="w-5 h-5" /> <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
}
