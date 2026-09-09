import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, ShoppingBag, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<"artisan" | "buyer" | null>(null);
  const [step, setStep] = useState<"role" | "details">("role");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { signInAsRole } = useAuth();

  const handleContinue = () => {
    if (step === "role" && selectedRole) {
      setStep("details");
    } else if (step === "details" && name.trim()) {
      signInAsRole(selectedRole!, name.trim());
      if (selectedRole === "artisan") {
        navigate("/artisan/dashboard");
      } else {
        navigate("/marketplace");
      }
    }
  };

  const handleQuickLogin = (role: "artisan" | "buyer") => {
    signInAsRole(role);
    if (role === "artisan") {
      navigate("/artisan/dashboard");
    } else {
      navigate("/marketplace");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-[#6B5E50] hover:text-[#1A5E4B] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#1A5E4B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg font-['Playfair_Display']">C</span>
            </div>
            <span className="text-2xl font-bold font-['Playfair_Display']">
              <span className="text-[#1A5E4B]">Craft</span>
              <span className="text-[#C46828]">ora</span>{" "}
              <span className="text-[#1A5E4B]">AI</span>
            </span>
          </div>
          <p className="text-sm text-[#C46828] font-['Playfair_Display'] italic">
            — From Artisan Craft to Global Market —
          </p>
        </div>

        {step === "role" ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E5DED4]">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#2D1B0E] mb-2">
                Welcome Back!
              </h1>
              <p className="text-[#6B5E50]">Choose your role to continue</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  role: "artisan" as const,
                  icon: <Palette className="w-10 h-10" />,
                  title: "Artisan",
                  desc: "Showcase your craft, get AI support, sell globally",
                  color: "from-[#1A5E4B] to-[#2E7D5B]",
                },
                {
                  role: "buyer" as const,
                  icon: <ShoppingBag className="w-10 h-10" />,
                  title: "Buyer",
                  desc: "Discover authentic crafts, connect with artisans",
                  color: "from-[#C46828] to-[#D4943C]",
                },
              ].map((option) => (
                <motion.button
                  key={option.role}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole(option.role)}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedRole === option.role
                      ? "border-[#1A5E4B] bg-[#1A5E4B]/5 shadow-md"
                      : "border-[#E5DED4] bg-[#FDF8F0] hover:border-[#1A5E4B]/50"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-white mb-4`}
                  >
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#2D1B0E] mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-[#6B5E50]">{option.desc}</p>
                  {selectedRole === option.role && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 bg-[#1A5E4B] rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <Button
              className="w-full bg-[#1A5E4B] hover:bg-[#164E3E] text-white py-6 text-base font-medium"
              onClick={handleContinue}
              disabled={!selectedRole}
            >
              Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E5DED4]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-[#6B5E50]">
                    Quick Demo Access
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  variant="outline"
                  className="border-[#1A5E4B] text-[#1A5E4B] hover:bg-[#1A5E4B]/5"
                  onClick={() => handleQuickLogin("artisan")}
                >
                  Quick Login as Artisan
                </Button>
                <Button
                  variant="outline"
                  className="border-[#C46828] text-[#C46828] hover:bg-[#C46828]/5"
                  onClick={() => handleQuickLogin("buyer")}
                >
                  Quick Login as Buyer
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E5DED4]">
            <button
              onClick={() => setStep("role")}
              className="flex items-center gap-2 text-sm text-[#6B5E50] hover:text-[#1A5E4B] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Change role
            </button>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#2D1B0E] mb-2">
                {selectedRole === "artisan" ? "Join as Artisan" : "Join as Buyer"}
              </h1>
              <p className="text-[#6B5E50]">Enter your details to get started</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B0E] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder={
                    selectedRole === "artisan"
                      ? "e.g., Ramesh Kumar"
                      : "e.g., Priya Mehta"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5DED4] rounded-xl text-[#2D1B0E] placeholder:text-[#6B5E50]/60 focus:outline-none focus:ring-2 focus:ring-[#1A5E4B]/30 focus:border-[#1A5E4B] transition-all"
                  autoFocus
                />
              </div>

              <Button
                className="w-full bg-[#1A5E4B] hover:bg-[#164E3E] text-white py-6 text-base font-medium"
                onClick={handleContinue}
                disabled={!name.trim()}
              >
                {selectedRole === "artisan" ? "Enter Dashboard" : "Browse Marketplace"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-[#6B5E50] mt-6">
          Login • Don't have an account?{" "}
          <span className="text-[#C46828] font-medium">Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
}
