import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  getProducts,
  saveEnquiry,
  saveOrder,
  generateId,
  getCurrentUser,
} from "@/store/craftora-store";
import type { Product } from "@/types/craftora";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  MessageCircle,
  Shield,
  Leaf,
  Package,
  User,
  Home,
  Eye,
  CheckCircle,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquirySent, setEnquirySent] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const all = getProducts();
    const found = all.find((p) => p.id === id);
    setProduct(found || null);
  }, [id]);

  const handleEnquiry = () => {
    const currentUser = getCurrentUser();
    if (!product || !enquiryMessage.trim()) return;
    saveEnquiry({
      id: generateId(),
      productId: product.id,
      productName: product.name,
      buyerName: currentUser?.name || "Buyer",
      buyerEmail: currentUser?.email || "buyer@example.com",
      message: enquiryMessage,
      artisanId: product.artisanId,
      createdAt: new Date().toISOString(),
      status: "new",
    });
    setEnquirySent(true);
    setEnquiryMessage("");
  };

  const handleOrder = () => {
    const currentUser = getCurrentUser();
    if (!product) return;
    saveOrder({
      id: generateId(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      buyerId: currentUser?.id || "buyer",
      buyerName: currentUser?.name || "Buyer",
      artisanId: product.artisanId,
      artisanName: product.artisanName,
      quantity,
      total: product.price * quantity,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    setOrderPlaced(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-[#6B5E50]/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#2D1B0E] mb-2">Product Not Found</h2>
          <Button onClick={() => navigate("/marketplace")} className="mt-4">Back to Marketplace</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5DED4] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F0EDE5] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#6B5E50]" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1A5E4B] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-['Playfair_Display']">C</span>
              </div>
              <span className="text-lg font-bold font-['Playfair_Display']">
                <span className="text-[#1A5E4B]">Craft</span><span className="text-[#C46828]">ora</span> <span className="text-[#1A5E4B]">AI</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#F0EDE5] rounded-lg"><Heart className="w-5 h-5 text-[#6B5E50]" /></button>
            <button className="p-2 hover:bg-[#F0EDE5] rounded-lg"><Share2 className="w-5 h-5 text-[#6B5E50]" /></button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32 lg:pb-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-2xl overflow-hidden border border-[#E5DED4] bg-white">
              <img src={product.image} alt={product.name} className="w-full h-[400px] object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=500&fit=crop"; }} />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#2D1B0E] mb-2">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#C46828]">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="text-sm text-[#6B5E50]">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#1A5E4B]/10 text-[#1A5E4B] text-xs rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-[#C46828] text-[#C46828]" : "text-[#E5DED4]"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-[#2D1B0E]">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-[#2D1B0E] mb-2">Description</h3>
              <p className="text-sm text-[#6B5E50] leading-relaxed">{product.description}</p>
            </div>

            {/* Materials */}
            <div>
              <h3 className="font-semibold text-[#2D1B0E] mb-2">Materials</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((mat) => (
                  <span key={mat} className="px-3 py-1 bg-[#F0EDE5] text-[#6B5E50] text-xs rounded-full">{mat}</span>
                ))}
              </div>
            </div>

            {/* Seller */}
            <div className="bg-[#FDF8F0] rounded-xl p-4 border border-[#E5DED4]">
              <h3 className="font-semibold text-[#2D1B0E] mb-2 text-sm">Seller</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A5E4B] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{product.artisanName[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-[#2D1B0E] text-sm">{product.artisanName}</p>
                  <p className="text-xs text-[#6B5E50] flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#2E7D5B]" /> Verified Artisan
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity & Order */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#2D1B0E]">Quantity:</span>
                <div className="flex items-center border border-[#E5DED4] rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 hover:bg-[#F0EDE5] transition-colors rounded-l-lg">-</button>
                  <span className="px-4 py-1.5 text-sm font-medium text-[#2D1B0E] border-x border-[#E5DED4]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 hover:bg-[#F0EDE5] transition-colors rounded-r-lg">+</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-[#C46828] hover:bg-[#B35A20] text-white py-6 text-base font-medium" onClick={handleOrder}>
                  <ShoppingCart className="w-5 h-5 mr-2" /> Order Now
                </Button>
                <Button variant="outline" className="border-[#1A5E4B] text-[#1A5E4B] py-6 text-base font-medium" onClick={() => setShowEnquiryForm(true)}>
                  <MessageCircle className="w-5 h-5 mr-2" /> Enquire
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-3">
              {product.ecoFriendly && (
                <div className="flex items-center gap-1 text-[#2E7D5B] text-xs font-medium">
                  <Leaf className="w-4 h-4" /> Eco-Friendly
                </div>
              )}
              {product.handmade && (
                <div className="flex items-center gap-1 text-[#C46828] text-xs font-medium">
                  <Package className="w-4 h-4" /> Handmade
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => !enquirySent && setShowEnquiryForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {enquirySent ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-[#2E7D5B] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#2D1B0E] mb-2">Enquiry Sent!</h3>
                <p className="text-sm text-[#6B5E50] mb-4">The artisan will respond to your enquiry soon.</p>
                <Button onClick={() => { setShowEnquiryForm(false); setEnquirySent(false); }} className="bg-[#1A5E4B] text-white">Done</Button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#2D1B0E] mb-4">Send Enquiry</h3>
                <textarea
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  placeholder="Type your message to the artisan…"
                  className="w-full px-4 py-3 border border-[#E5DED4] rounded-xl text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30"
                />
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setShowEnquiryForm(false)} className="flex-1">Cancel</Button>
                  <Button className="flex-1 bg-[#1A5E4B] text-white" onClick={handleEnquiry} disabled={!enquiryMessage.trim()}>Send</Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Order Success Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setOrderPlaced(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <CheckCircle className="w-12 h-12 text-[#2E7D5B] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#2D1B0E] mb-2">Order Placed!</h3>
            <p className="text-sm text-[#6B5E50] mb-1">Your order for <strong>{product.name}</strong> has been placed.</p>
            <p className="text-sm text-[#6B5E50] mb-4">Total: ₹{(product.price * quantity).toLocaleString("en-IN")}</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setOrderPlaced(false)} className="flex-1">Continue Shopping</Button>
              <Button className="flex-1 bg-[#1A5E4B] text-white" onClick={() => { setOrderPlaced(false); navigate("/buyer/orders"); }}>View Orders</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5DED4] z-40 px-4 py-2 flex justify-around">
        <button onClick={() => navigate("/marketplace")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <Home className="w-5 h-5" /> <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => navigate("/marketplace")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <Eye className="w-5 h-5" /> <span className="text-[10px]">Explore</span>
        </button>
        <button onClick={() => navigate("/buyer/orders")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <ShoppingCart className="w-5 h-5" /> <span className="text-[10px]">Orders</span>
        </button>
        <button onClick={() => navigate("/role")} className="flex flex-col items-center gap-0.5 p-2 text-[#6B5E50]">
          <User className="w-5 h-5" /> <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
}
