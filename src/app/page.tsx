"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Bot,
  Zap,
  Database,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Image from "next/image";

import { submitContactForm } from "./actions";

export default function LandingPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const result = await submitContactForm(formState);

      if (result.success) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 as const,
        delayChildren: 0.2 as const,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100 as const,
        damping: 20 as const,
      },
    },
  };

  return (
    <main className="min-h-screen selection:bg-teal-100 selection:text-teal-900">
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-lg shadow-slate-200/30 mx-auto left-0 right-0 top-2 max-w-[98%] rounded-2xl border border-white/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16 md:h-18" : "h-20 md:h-24"
          }`}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 ${
                scrolled
                  ? "w-[180px] h-12 md:w-[280px] md:h-14"
                  : "w-[220px] h-14 md:w-[400px] md:h-20"
              }`}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/assets/tidal-logo.png"
                alt="TIDAL Solutions"
                fill
                sizes="(max-width: 768px) 220px, 400px"
                className="object-contain object-left"
                priority
              />
            </motion.div>
          </div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 group cursor-pointer ${
              scrolled
                ? "px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full hover:shadow-lg hover:shadow-teal-200/50"
                : "text-slate-500 hover:text-teal-600"
            }`}
          >
            Start Automation{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.a>
        </div>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 text-teal-700 text-sm font-bold uppercase tracking-wider mb-8 shadow-sm"
          >
            <Zap size={14} fill="currentColor" className="text-teal-500" />
            AI Automation Agency
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.95] mb-8 uppercase tracking-tighter"
          >
            Streamline.
            <br />
            <span className="text-gradient">Automate.</span>
            <br />
            <span className="flex items-center gap-3 md:gap-4 text-slate-900">
              Grow.{" "}
              <Bot
                size={48}
                className="text-teal-600 animate-bounce"
                strokeWidth={2.5}
              />
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl leading-relaxed font-medium"
          >
            We help organizations understand how to integrate{" "}
            <span className="text-teal-600 font-bold">AI and automation</span>{" "}
            into their operations — turning complex processes into efficient,
            scalable systems.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 mb-4 text-lg text-slate-500 max-w-xl"
          >
            <p>
              Empower your business with the right strategy, tools, and
              implementation support to move confidently into the AI-driven
              future.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="#contact"
              className="px-10 py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-bold text-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-teal-200/50 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-300/50 active:translate-y-0"
            >
              Book a Consultation
              <ArrowRight size={20} />
            </a>
            <button className="px-10 py-5 bg-white text-slate-800 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer transform hover:-translate-y-1 active:translate-y-0">
              View Case Studies
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-200/40 to-cyan-200/40 blur-3xl rounded-full translate-x-10 translate-y-10" />
          <div className="relative bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 shadow-2xl shadow-slate-200/60 ring-1 ring-slate-50">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <div className="h-2 w-20 bg-slate-100 rounded-full" />
            </div>
            <div className="space-y-4">
              {/* Dynamic Abstract Items with staggered entrance */}
              {[
                {
                  icon: Database,
                  color: "green",
                  title: "New Lead Detected",
                  sub: "CRM Webhook • 2ms latency",
                  time: "09:41 AM",
                },
                {
                  icon: Bot,
                  color: "blue",
                  title: "Agent Reasoning",
                  sub: "GPT-4o • Classifying Intent",
                  time: null,
                },
                {
                  icon: CheckCircle2,
                  color: "teal",
                  title: "Workflow Complete",
                  sub: "Email Sent • CRM Updated",
                  time: "Done",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className={`flex items-center gap-4 p-4 ${
                    item.color === "teal"
                      ? "bg-teal-50/50 border border-teal-100 relative overflow-hidden"
                      : "bg-white border border-slate-100"
                  } rounded-xl shadow-sm`}
                >
                  {item.color === "teal" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                  )}
                  <div
                    className={`bg-${item.color}-50 p-2.5 rounded-lg border border-${item.color}-100`}
                  >
                    <item.icon size={18} className={`text-${item.color}-600`} />
                  </div>
                  <div>
                    <div
                      className={`text-sm font-bold text-${
                        item.color === "teal" ? "teal-900" : "slate-700"
                      }`}
                    >
                      {item.title}
                    </div>
                    <div
                      className={`text-xs text-${
                        item.color === "teal" ? "teal-600" : "slate-400"
                      } font-medium`}
                    >
                      {item.sub}
                    </div>
                  </div>
                  {item.time === "Done" ? (
                    <div className="ml-auto text-xs font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded">
                      Done
                    </div>
                  ) : item.time ? (
                    <div className="ml-auto text-xs font-mono text-slate-400">
                      {item.time}
                    </div>
                  ) : (
                    <div className="ml-auto flex gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-32 bg-gradient-to-b from-slate-50/80 to-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              Our Core <span className="text-gradient">Architectures</span>
            </h2>
            <p className="text-slate-500 mt-6 text-xl max-w-2xl mx-auto">
              Enterprise-grade solutions built on robust cloud infrastructure.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Intelligent Workflows",
                icon: Zap,
                desc: "Turn manual bottlenecks into self-driving systems. We integrate your stack to automate the busy work.",
                gradient: "from-amber-500 to-orange-500",
              },
              {
                title: "Custom AI Agents",
                icon: Bot,
                desc: "More than chatbots. We build purpose-driven AI that handles customer inquiries and internal ops 24/7.",
                gradient: "from-teal-500 to-cyan-500",
              },
              {
                title: "Scalable Infrastructure",
                icon: Database,
                desc: "Future-proof your data. We build the robust back-end systems needed to power advanced AI decision-making.",
                gradient: "from-violet-500 to-purple-500",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-teal-100/50 transition-all duration-500 group cursor-default"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="contact"
        className="py-32 px-6 bg-gradient-to-b from-white to-slate-50"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              Let's <span className="text-gradient">Automate</span> Your
              Business
            </h2>
            <p className="text-slate-500 mt-6 text-xl">
              Fill out the form below to trigger our AI onboarding agent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle2 size={40} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-3">
                  Inquiry Received!
                </h3>
                <p className="text-slate-600 text-lg">
                  Our AI agent is reviewing your details and will send a
                  confirmation email shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-teal-600 font-bold text-lg hover:underline cursor-pointer"
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all text-lg"
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all text-lg"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all text-lg resize-none"
                    placeholder="Describe the workflow or process you'd like to automate..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-5 rounded-2xl font-bold text-lg hover:from-teal-700 hover:to-teal-600 transition-all disabled:opacity-70 flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-teal-200/50 transform hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      Start Integration
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
                <p className="text-sm text-center text-slate-400 mt-6">
                  Powered by <span className="font-semibold">n8n & OpenAI</span>{" "}
                  • 100% Automated Response
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="relative w-[160px] h-20 opacity-90 hover:opacity-100 transition-opacity">
              <Image
                src="/assets/tidal-logo.png"
                alt="TIDAL Solutions"
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer font-medium"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer font-medium"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer font-medium"
              >
                Blog
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2026 TIDAL Solutions.</p>
            <p className="text-slate-600 text-xs">
              Powered by{" "}
              <span className="text-teal-500 font-semibold">Next.js</span> +{" "}
              <span className="text-teal-500 font-semibold">n8n</span> +{" "}
              <span className="text-teal-500 font-semibold">OpenAI</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
