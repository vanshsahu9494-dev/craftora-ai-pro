import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Tag,
  Globe,
  Languages,
  ChevronRight,
  ArrowRight,
  Star,
  Users,
  ShoppingBag,
  Leaf,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5DED4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1A5E4B] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-['Playfair_Display']">C</span>
              </div>
              <span className="text-xl font-bold text-[#1A5E4B] font-['Playfair_Display']">
                Craft<span className="text-[#C46828]">ora</span>{" "}
                <span className="text-[#1A5E4B]">AI</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {["Home", "For Artisans", "For Buyers", "About"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-sm font-medium text-[#6B5E50] hover:text-[#1A5E4B] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-[#1A5E4B] hover:bg-[#1A5E4B]/5 font-medium"
                onClick={() => navigate("/role")}
              >
                Login
              </Button>
              <Button
                className="bg-[#C46828] hover:bg-[#B35A20] text-white font-medium px-5"
                onClick={() => navigate("/role")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-[#1A5E4B]/10 text-[#1A5E4B] px-4 py-1.5 rounded-full text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Artisan Platform
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#1A5E4B]">Empowering</span>{" "}
                <span className="text-[#C46828]">Artisans,</span>
                <br />
                <span className="text-[#1A5E4B]">Connecting Markets</span>
              </h1>

              <p className="text-lg text-[#6B5E50] max-w-lg leading-relaxed">
                Craftora AI helps artisans showcase their craft, get AI-powered
                product cataloguing, smart pricing and connect with global buyers.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#1A5E4B] hover:bg-[#164E3E] text-white px-8 py-6 text-base font-medium"
                  onClick={() => navigate("/role")}
                >
                  Explore Marketplace
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C46828] text-[#C46828] hover:bg-[#C46828]/5 px-8 py-6 text-base font-medium"
                  onClick={() => navigate("/role")}
                >
                  Join as Artisan
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=500&fit=crop"
                  alt="Artisan crafting"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A5E4B]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#C46828] rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#2D1B0E] text-sm">
                          Popewadi - Smart Cataloging
                        </p>
                        <p className="text-xs text-[#6B5E50]">
                          AI-Powered Product Analysis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs font-semibold text-[#2D1B0E]">Eco-Friendly</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-1/2 -left-6 bg-white rounded-xl p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#1A5E4B]/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#1A5E4B]" />
                  </div>
                  <span className="text-xs font-semibold text-[#2D1B0E]">Global Reach</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-y border-[#E5DED4]" id="for-artisans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1A5E4B] mb-4">
              Everything You Need
            </h2>
            <p className="text-[#6B5E50] max-w-2xl mx-auto">
              Powerful AI tools designed to help artisans digitize their craft and reach global markets
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "AI Product Cataloging",
                desc: "Photo→AI→Professional listing",
                color: "bg-[#1A5E4B]/10 text-[#1A5E4B]",
              },
              {
                icon: <Tag className="w-6 h-6" />,
                title: "Smart Pricing",
                desc: "Based on market trends & material",
                color: "bg-[#C46828]/10 text-[#C46828]",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Market Linkage",
                desc: "B2B, B2C & bulk orders",
                color: "bg-[#1A5E4B]/10 text-[#1A5E4B]",
              },
              {
                icon: <Languages className="w-6 h-6" />,
                title: "Multilingual Support",
                desc: "In local languages",
                color: "bg-[#C46828]/10 text-[#C46828]",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="bg-[#FDF8F0] rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-[#E5DED4] hover:border-[#1A5E4B]/30 group"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-[#2D1B0E] mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B5E50]">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-[#C46828] uppercase tracking-wider mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl font-bold text-[#1A5E4B]">
              Traditional Craft • Modern Technology • Wider Opportunities
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Upload Photo",
                desc: "Take a photo of your handcrafted product",
                img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=200&fit=crop",
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "Our AI generates a professional catalog entry",
                img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
              },
              {
                step: "03",
                title: "Edit & Publish",
                desc: "Review and customize your product listing",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
              },
              {
                step: "04",
                title: "Sell Globally",
                desc: "Connect with buyers worldwide",
                img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="rounded-xl overflow-hidden shadow-md mb-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-[#C46828]/30 font-['Playfair_Display']">
                    {item.step}
                  </span>
                  <h3 className="font-semibold text-[#2D1B0E]">{item.title}</h3>
                </div>
                <p className="text-sm text-[#6B5E50]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-16 bg-white border-y border-[#E5DED4]" id="for-buyers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold text-[#C46828] uppercase tracking-wider mb-2">
                For Buyers
              </p>
              <h2 className="text-3xl font-bold text-[#1A5E4B] mb-4">
                Discover Authentic Crafts Directly from Artisans
              </h2>
              <p className="text-[#6B5E50] mb-6 leading-relaxed">
                Explore unique handmade products and support rural artisans.
                Every purchase directly supports a family's livelihood and
                preserves centuries-old craft traditions.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { num: "500+", label: "Artisans" },
                  { num: "2,000+", label: "Products" },
                  { num: "50+", label: "Categories" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 bg-[#FDF8F0] rounded-xl border border-[#E5DED4]"
                  >
                    <p className="text-2xl font-bold text-[#1A5E4B]">
                      {stat.num}
                    </p>
                    <p className="text-xs text-[#6B5E50]">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="bg-[#1A5E4B] hover:bg-[#164E3E] text-white"
                onClick={() => navigate("/role")}
              >
                Browse Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1595158299241-06a7ca6e2e16?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1612196808214-b7e239e5f6dc?w=300&h=300&fit=crop",
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={img}
                    alt="Craft product"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#1A5E4B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Artisans Across India
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Join hundreds of artisans who have transformed their craft business with Craftora AI
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Ramesh Kumar",
                craft: "Basket Weaver, Rajasthan",
                quote:
                  "Craftora AI helped me reach buyers I never could before. My sales increased 3x in just 2 months!",
                rating: 5,
              },
              {
                name: "Sita Devi",
                craft: "Potter, Uttar Pradesh",
                quote:
                  "The AI cataloging tool is amazing. It created beautiful product listings from simple phone photos.",
                rating: 5,
              },
              {
                name: "Vikram Singh",
                craft: "Wood Carver, Madhya Pradesh",
                quote:
                  "I can now communicate with international buyers in Hindi and English. Craftora bridges the language gap.",
                rating: 5,
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[#C46828] text-[#C46828]"
                    />
                  ))}
                </div>
                <p className="text-white/90 text-sm mb-4 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C46828]/30 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-white/60 text-xs">{t.craft}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FDF8F0]" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#1A5E4B] mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-[#6B5E50] mb-8 max-w-xl mx-auto">
              Whether you're an artisan looking to go digital or a buyer seeking authentic handcrafted products, Craftora AI is here for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#C46828] hover:bg-[#B35A20] text-white px-8 py-6 text-base font-medium"
                onClick={() => navigate("/role")}
              >
                <Users className="mr-2 w-5 h-5" />
                Join as Artisan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#1A5E4B] text-[#1A5E4B] hover:bg-[#1A5E4B]/5 px-8 py-6 text-base font-medium"
                onClick={() => navigate("/role")}
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                Browse as Buyer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D1B0E] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#1A5E4B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-['Playfair_Display']">
                    C
                  </span>
                </div>
                <span className="text-lg font-bold font-['Playfair_Display']">
                  Craft<span className="text-[#C46828]">ora</span> AI
                </span>
              </div>
              <p className="text-white/60 text-sm">
                From Artisan Craft to Global Market
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: ["Marketplace", "AI Cataloging", "Smart Pricing"],
              },
              {
                title: "Company",
                links: ["About Us", "Contact", "Careers"],
              },
              {
                title: "Support",
                links: ["Help Center", "Terms", "Privacy"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/60 text-sm hover:text-[#C46828] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-white/40 text-sm">
              © 2026 Craftora AI. All rights reserved. Built for SIH 2026.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
