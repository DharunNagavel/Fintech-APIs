import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Activity,
  BarChart3,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ================= NAVBAR ================= */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            AI Compliance Layer
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to="/signin"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            AI-Powered Compliance & Risk Intelligence
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Monitor transactions, detect fraud patterns, evaluate AML risk,
            and automate compliance rules with real-time AI-driven analytics.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-md"
            >
              View Dashboard <ArrowRight size={18} />
            </Link>

            <Link
              to="/signup"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="grid grid-cols-2 gap-6 text-center">
            <FeatureStat icon={Activity} title="Real-Time Monitoring" />
            <FeatureStat icon={ShieldCheck} title="AML Detection" />
            <FeatureStat icon={BarChart3} title="Risk Analytics" />
            <FeatureStat icon={BrainCircuit} title="AI Rule Engine" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">
            Built for Modern Financial Compliance
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A scalable AI compliance layer designed for fintech, banking,
            and digital payments ecosystems.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Activity}
            title="Transaction Analyzer"
            description="Monitor daily transaction volumes and detect suspicious activity in real time."
          />

          <FeatureCard
            icon={ShieldCheck}
            title="AML Risk Detection"
            description="Classify transactions into high, medium, and low risk using AI-driven scoring."
          />

          <FeatureCard
            icon={BrainCircuit}
            title="Compliance Rule Engine"
            description="Automate regulatory rules and monitor violations dynamically."
          />
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Transform Compliance with AI?
          </h3>
          <p className="mb-8 text-blue-100">
            Deploy scalable AI-driven compliance monitoring and reduce risk
            exposure across your financial systems.
          </p>

          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AI Compliance Layer. All rights reserved.
      </footer>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4 mx-auto">
        <Icon size={24} />
      </div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function FeatureStat({ icon: Icon, title }) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
      <Icon className="mx-auto text-blue-600 mb-2" size={28} />
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}