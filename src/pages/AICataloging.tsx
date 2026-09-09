import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { analyzeProduct } from "@/services/ai-analysis";
import {
  saveProduct,
  generateId,
  getCurrentUser,
} from "@/store/craftora-store";
import type { AIAnalysisResult } from "@/types/craftora";
import {
  Upload,
  Mic,
  MicOff,
  Image as ImageIcon,
  X,
  Check,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Save,
  Palette,
  FileText,
  Package,
  Tag,
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  LogOut,
  User,
  Eye,
} from "lucide-react";

const STEPS = [
  { num: 1, label: "Upload Photo", icon: Upload },
  { num: 2, label: "Add Voice / Text", icon: Mic },
  { num: 3, label: "AI Processing", icon: Sparkles },
  { num: 4, label: "Review & Publish", icon: Check },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/artisan/dashboard" },
  { icon: Package, label: "My Products", path: "/artisan/products" },
  { icon: Sparkles, label: "AI Cataloging", path: "/artisan/cataloging" },
  { icon: ShoppingCart, label: "Orders & Enquiries", path: "/artisan/orders" },
  { icon: BarChart3, label: "Market Insights", path: "/artisan/dashboard" },
  { icon: User, label: "Profile", path: "/artisan/profile" },
];

function SidebarNav({ currentPath }: { currentPath: string }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
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
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentPath === item.path
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => { signOut(); navigate("/"); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default function AICataloging() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [materials, setMaterials] = useState("");
  const [tags, setTags] = useState("");

  const {
    isListening,
    transcript,
    isSupported: speechSupported,
    language,
    setLanguage,
    startListening,
    stopListening,
  } = useVoiceAssistant((text) => {
    setDescription((prev) => (prev ? prev + " " + text : text));
  });

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const removeImage = useCallback(() => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const startAnalysis = useCallback(() => {
    setStep(3);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 4;
      });
    }, 100);
    setTimeout(() => {
      const result = analyzeProduct(productName || imagePreview || undefined);
      setAnalysisResult(result);
      setProductName(result.name);
      setCategory(result.category);
      setDescription((prev) => prev || result.description);
      setPrice(result.price.toString());
      setMaterials(result.materials.join(", "));
      setTags(result.tags.join(", "));
      setIsAnalyzing(false);
      clearInterval(interval);
      setAnalysisProgress(100);
    }, 2500);
  }, [productName, imagePreview, description]);

  const handlePublish = useCallback(() => {
    const currentUser = getCurrentUser();
    const product = {
      id: generateId(),
      name: productName,
      category,
      description,
      materials: materials.split(",").map((m) => m.trim()).filter(Boolean),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      price: parseInt(price) || 0,
      image: imagePreview || "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop",
      artisanId: currentUser?.id || "unknown",
      artisanName: currentUser?.name || "Artisan",
      rating: 0,
      reviewCount: 0,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ecoFriendly: analysisResult?.ecoFriendly ?? true,
      handmade: analysisResult?.handmade ?? true,
    };
    saveProduct(product);
    navigate("/artisan/products");
  }, [productName, category, description, materials, tags, price, imagePreview, analysisResult, navigate]);

  const analysisSteps = [
    { label: "Image enhancement", threshold: 20 },
    { label: "Product recognition", threshold: 40 },
    { label: "Description generation", threshold: 60 },
    { label: "Price suggestion", threshold: 80 },
    { label: "Category & tags", threshold: 100 },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex">
      <SidebarNav currentPath="/artisan/cataloging" />
      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-[#E5DED4] px-6 py-4 flex items-center sticky top-0 z-30">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F0EDE5] rounded-lg transition-colors mr-4">
            <ArrowLeft className="w-5 h-5 text-[#6B5E50]" />
          </button>
          <h1 className="text-lg font-bold text-[#2D1B0E]">AI Product Cataloging</h1>
        </header>

        <div className="p-6 max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step > s.num ? "bg-[#2E7D5B] text-white" :
                    step === s.num ? "bg-[#1A5E4B] text-white ring-4 ring-[#1A5E4B]/20" :
                    "bg-[#E5DED4] text-[#6B5E50]"
                  }`}>
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden sm:block ${step >= s.num ? "text-[#1A5E4B]" : "text-[#6B5E50]"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-2 mt-0 sm:-mt-5 ${step > s.num ? "bg-[#2E7D5B]" : "bg-[#E5DED4]"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Upload + Voice */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white rounded-2xl border border-[#E5DED4] p-8">
                <h2 className="text-xl font-bold text-[#2D1B0E] mb-2">AI Product Cataloging</h2>
                <p className="text-[#6B5E50] mb-6">Upload a photo and/or speak about your product. Let AI create a professional listing for you.</p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Upload */}
                  <div>
                    <h3 className="font-semibold text-[#2D1B0E] mb-3 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#C46828]" /> Upload Photo
                    </h3>
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Product preview" className="w-full h-64 object-cover rounded-xl border border-[#E5DED4]" />
                        <button onClick={removeImage} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                        <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 left-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-[#1A5E4B] hover:bg-white">
                          Change Photo
                        </button>
                      </div>
                    ) : (
                      <div onClick={() => fileInputRef.current?.click()} className="w-full h-64 border-2 border-dashed border-[#E5DED4] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1A5E4B] hover:bg-[#1A5E4B]/5 transition-all">
                        <ImageIcon className="w-12 h-12 text-[#6B5E50]/40 mb-3" />
                        <p className="text-sm font-medium text-[#6B5E50]">Click to upload or drag and drop</p>
                        <p className="text-xs text-[#6B5E50]/60 mt-1">JPG, PNG, WEBP</p>
                      </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleImageUpload} />
                  </div>

                  {/* Voice/Text */}
                  <div>
                    <h3 className="font-semibold text-[#2D1B0E] mb-3 flex items-center gap-2">
                      <Mic className="w-4 h-4 text-[#C46828]" /> Or Speak About Your Product
                    </h3>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your product... e.g., 'यह बहुत सुंदर है' or 'This is a handwoven bamboo basket'"
                      className="w-full h-32 p-4 border border-[#E5DED4] rounded-xl text-sm text-[#2D1B0E] placeholder:text-[#6B5E50]/50 focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30 resize-none"
                    />
                    {transcript && (
                      <div className="bg-[#1A5E4B]/10 text-[#1A5E4B] px-2 py-1 rounded text-xs mt-1 inline-block">
                        Voice input captured
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-3">
                      {speechSupported ? (
                        <>
                          <Button variant={isListening ? "default" : "outline"} className={isListening ? "bg-[#C46828] hover:bg-[#B35A20] text-white" : "border-[#C46828] text-[#C46828]"} onClick={isListening ? stopListening : startListening}>
                            {isListening ? <><MicOff className="w-4 h-4 mr-2" /> Stop</> : <><Mic className="w-4 h-4 mr-2" /> Start Recording</>}
                          </Button>
                          {isListening && (
                            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              <span className="text-xs text-red-500 font-medium">Listening…</span>
                            </motion.div>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-[#6B5E50] bg-[#F0EDE5] px-3 py-2 rounded-lg">
                          🎤 Voice not available — please type above.
                        </p>
                      )}
                    </div>
                    {speechSupported && (
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-[#6B5E50]">Language:</span>
                        <button onClick={() => setLanguage("hi-IN")} className={`px-3 py-1 rounded-full text-xs font-medium ${language === "hi-IN" ? "bg-[#1A5E4B] text-white" : "bg-[#F0EDE5] text-[#6B5E50]"}`}>हिन्दी</button>
                        <button onClick={() => setLanguage("en-IN")} className={`px-3 py-1 rounded-full text-xs font-medium ${language === "en-IN" ? "bg-[#1A5E4B] text-white" : "bg-[#F0EDE5] text-[#6B5E50]"}`}>English</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button className="bg-[#1A5E4B] hover:bg-[#164E3E] text-white px-8" onClick={startAnalysis} disabled={!imagePreview}>
                    <Sparkles className="w-4 h-4 mr-2" /> Analyze Product <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: AI Processing */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white rounded-2xl border border-[#E5DED4] p-8 text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1A5E4B] to-[#2E7D5B] rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-xl font-bold text-[#2D1B0E] mb-1">
                  {isAnalyzing ? "AI is analyzing your product…" : "Analysis Complete!"}
                </h2>
                <p className="text-[#6B5E50] text-sm mb-8">{isAnalyzing ? "This will only take a moment" : "Your product has been analyzed"}</p>

                <div className="max-w-md mx-auto space-y-4 text-left">
                  {analysisSteps.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${analysisProgress >= s.threshold ? "bg-[#2E7D5B] text-white" : "bg-[#E5DED4] text-[#6B5E50]"}`}>
                        {analysisProgress >= s.threshold ? <Check className="w-3 h-3" /> : <span className="text-xs">{i + 1}</span>}
                      </div>
                      <span className={`text-sm ${analysisProgress >= s.threshold ? "text-[#2E7D5B] font-medium" : "text-[#6B5E50]"}`}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="max-w-md mx-auto mt-6">
                  <div className="h-2 bg-[#E5DED4] rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-[#1A5E4B] to-[#2E7D5B] rounded-full" initial={{ width: 0 }} animate={{ width: `${analysisProgress}%` }} />
                  </div>
                  <p className="text-xs text-center text-[#6B5E50] mt-2">{analysisProgress}%</p>
                </div>

                {!isAnalyzing && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <Button className="bg-[#1A5E4B] hover:bg-[#164E3E] text-white px-8" onClick={() => setStep(4)}>
                      Review & Publish <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Publish */}
          {step === 4 && analysisResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white rounded-2xl border border-[#E5DED4] p-8">
                <h2 className="text-xl font-bold text-[#2D1B0E] mb-6">Review & Publish</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    {imagePreview && <img src={imagePreview} alt="Product" className="w-full h-64 object-cover rounded-xl border border-[#E5DED4]" />}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B0E] mb-1"><Package className="w-4 h-4 text-[#C46828]" /> Product Name</label>
                      <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full px-4 py-2.5 border border-[#E5DED4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B0E] mb-1"><Tag className="w-4 h-4 text-[#C46828]" /> Category</label>
                      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 border border-[#E5DED4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B0E] mb-1"><FileText className="w-4 h-4 text-[#C46828]" /> Description</label>
                      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 border border-[#E5DED4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30 resize-none h-24" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#2D1B0E] mb-1 block">₹ Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2.5 border border-[#E5DED4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B0E] mb-1"><Palette className="w-4 h-4 text-[#C46828]" /> Materials</label>
                        <input type="text" value={materials} onChange={(e) => setMaterials(e.target.value)} className="w-full px-4 py-2.5 border border-[#E5DED4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30" />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B0E] mb-1"><Tag className="w-4 h-4 text-[#C46828]" /> Tags (comma separated)</label>
                      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-4 py-2.5 border border-[#E5DED4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(1)} className="border-[#6B5E50] text-[#6B5E50]"><ArrowLeft className="w-4 h-4 mr-2" /> Edit Details</Button>
                  <Button className="bg-[#C46828] hover:bg-[#B35A20] text-white px-8" onClick={handlePublish}><Save className="w-4 h-4 mr-2" /> Publish Product</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
