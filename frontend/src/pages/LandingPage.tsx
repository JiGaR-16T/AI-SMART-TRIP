import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { ChipGroup } from "@/components/ui/Chip";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";
import { RouteGraphVisualizer } from "@/components/algorithms/RouteGraphVisualizer";
import { KnapsackToy } from "@/components/algorithms/KnapsackToy";
import { toast } from "@/store/toastStore";

const TRIP_TYPES = [
  { value: "cultural", label: "Cultural & Heritage" },
  { value: "backpacking", label: "Backpacking" },
  { value: "luxury", label: "Luxury & Wellness" },
  { value: "wildlife", label: "Wildlife & Nature" },
  { value: "romantic", label: "Romantic Getaways" },
  { value: "foodie", label: "Culinary Trail" },
];

const FEATURED_DESTINATIONS = [
  {
    id: "1",
    name: "Jaipur & Shekhawati Circuit",
    state: "Rajasthan",
    duration: "4 Days / 3 Nights",
    estBudget: "₹18,500",
    tags: ["Heritage", "Forts", "Palaces"],
    bgGradient: "linear-gradient(135deg, #f97316 0%, #db2777 100%)",
    receiptAlgo: "Pareto Frontier (Score: 94)",
  },
  {
    id: "2",
    name: "Kerala Backwaters & Munnar",
    state: "Kerala",
    duration: "5 Days / 4 Nights",
    estBudget: "₹24,000",
    tags: ["Tea Gardens", "Houseboat", "Ayurveda"],
    bgGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    receiptAlgo: "Dijkstra Transit (Score: 91)",
  },
  {
    id: "3",
    name: "Varanasi & Sarnath Spiritual Trail",
    state: "Uttar Pradesh",
    duration: "3 Days / 2 Nights",
    estBudget: "₹12,800",
    tags: ["Ghats", "Ganga Aarti", "Silk Weaving"],
    bgGradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    receiptAlgo: "Knapsack DP (Score: 89)",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Natural Language Understanding",
    desc: "Describe your dream trip in plain English or Hindi. TravelMind's NLP engine extracts origin, dates, interests, and strict constraints.",
  },
  {
    step: "02",
    title: "Trie Autocomplete & Entity Extraction",
    desc: "Instant O(k) prefix matching validates geographic landmarks, railway junctions, and flight corridors across India.",
  },
  {
    step: "03",
    title: "Dijkstra & A* Multi-Modal Graph",
    desc: "Calculates optimal transit paths across train, bus, and road networks, balancing travel duration, fatigue, and price.",
  },
  {
    step: "04",
    title: "0/1 Knapsack Budget Optimization",
    desc: "Dynamic programming selects activities, hotels, and dining that maximize total experience value within your exact budget limit.",
  },
  {
    step: "05",
    title: "Pareto Multi-Objective Ranking",
    desc: "Evaluates trade-offs between cost, comfort, and pacing, presenting non-dominated options so you control the priorities.",
  },
  {
    step: "06",
    title: "Verified Itinerary & Receipt",
    desc: "Generates an hour-by-hour schedule complete with deterministic algorithm receipts and verifiable data trust badges.",
  },
];

export const LandingPage: React.FC = () => {
  const [origin, setOrigin] = useState("New Delhi (DEL)");
  const [destination, setDestination] = useState("Jaipur (JAI)");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["cultural", "backpacking"]);
  const [budget, setBudget] = useState<number[]>([25000]);
  const [days, setDays] = useState<number[]>([5]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(
      "Search Engine Arriving in Part 3!",
      `Planning ${days[0]}-day journey from ${origin} to ${destination} with budget ₹${budget[0].toLocaleString("en-IN")}.`
    );
  };

  return (
    <div>
      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section
        style={{
          position: "relative",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-20)",
          overflow: "hidden",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "840px", margin: "0 auto", textAlign: "center", marginBottom: "var(--space-10)" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                padding: "0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-primary-50)",
                border: "1px solid var(--color-primary-200)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                color: "var(--color-primary-700)",
                marginBottom: "var(--space-4)",
              }}
            >
              <Sparkles size={14} color="var(--color-primary-600)" />
              <span>Real DSA Computations • Zero Hallucinated Pricing</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                fontWeight: 800,
                letterSpacing: "var(--tracking-tight)",
                lineHeight: 1.15,
                color: "var(--color-text)",
                marginBottom: "var(--space-6)",
              }}
            >
              Intelligent Travel Planning Powered by{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-accent-500) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI & Real Algorithms
              </span>
            </h1>

            <p
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                maxWidth: "680px",
                margin: "0 auto",
              }}
            >
              Not just generic LLM hallucinations. TravelMind pairs natural language understanding with Trie prefix autocomplete, Dijkstra shortest routing, 0/1 Knapsack budget allocation, and Pareto multi-objective optimization.
            </p>
          </div>

          {/* Smart Trip Search Box UI */}
          <div
            className="surface-card"
            style={{
              maxWidth: "920px",
              margin: "0 auto",
              padding: "var(--space-8)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--color-primary-200)",
              boxShadow: "var(--shadow-2xl)",
            }}
          >
            <form onSubmit={handleSearchSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-6)",
                }}
              >
                <Input
                  label="Origin Hub"
                  placeholder="e.g. New Delhi or DEL"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  startIcon={<MapPin size={16} />}
                />

                <Input
                  label="Destination"
                  placeholder="e.g. Jaipur or JAI"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  startIcon={<MapPin size={16} />}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "var(--space-6)",
                  marginBottom: "var(--space-6)",
                }}
              >
                <Slider
                  label="Trip Duration"
                  min={1}
                  max={21}
                  step={1}
                  value={days}
                  onValueChange={setDays}
                  formatValue={(val) => `${val} Days`}
                />

                <Slider
                  label="Total Budget"
                  min={5000}
                  max={150000}
                  step={2500}
                  value={budget}
                  onValueChange={setBudget}
                  formatValue={(val) => `₹${val.toLocaleString("en-IN")}`}
                />
              </div>

              <div style={{ marginBottom: "var(--space-6)" }}>
                <ChipGroup
                  label="Preferred Trip Archetypes"
                  options={TRIP_TYPES}
                  selectedValues={selectedTypes}
                  onChange={setSelectedTypes}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "var(--space-4)",
                  paddingTop: "var(--space-4)",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <TrustBadge level="ESTIMATED" sourceText="Pricing heuristics calibrated for Indian travel corridors" />
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                    Deterministic engine verification active
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={16} />}
                >
                  Generate Optimized Itinerary
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. LIVE ALGORITHM AT WORK (Dijkstra Route Graph)
          ===================================================================== */}
      <section className="section" style={{ backgroundColor: "var(--color-bg-subtle)" }}>
        <div className="container">
          <SectionHeader
            badge="Under The Hood"
            title="Watch Dijkstra Graph Exploration in Real-Time"
            subtitle="Real graph structures with priority min-heaps calculate shortest paths between transit hubs across India."
            align="center"
          />

          <div style={{ maxWidth: "840px", margin: "0 auto" }}>
            <RouteGraphVisualizer />
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. AI DISCOVERY & CONSTRAINT TRANSLATION
          ===================================================================== */}
      <section className="section">
        <div className="container">
          <SectionHeader
            badge="Hybrid Architecture"
            title="How AI and Real DSA Work in Harmony"
            subtitle="AI parses high-level intentions; deterministic algorithms enforce strict mathematical truth."
            align="left"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {/* Prompt input card */}
            <div className="surface-card" style={{ padding: "var(--space-6)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                <div
                  style={{
                    padding: "var(--space-2)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--color-primary-50)",
                    color: "var(--color-primary-600)",
                  }}
                >
                  <Search size={18} />
                </div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>
                  User Natural Language Prompt
                </h3>
              </div>
              <div
                style={{
                  padding: "var(--space-4)",
                  backgroundColor: "var(--color-bg-subtle)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  fontStyle: "italic",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text)",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;Plan a 5-day cultural trip to Rajasthan under ₹25,000 for two people, focusing on heritage forts and avoiding night buses.&rdquo;
              </div>
              <div style={{ marginTop: "var(--space-4)", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                Natural language conveys nuances, feelings, and travel tastes.
              </div>
            </div>

            {/* Constraints parsed card */}
            <div className="surface-card" style={{ padding: "var(--space-6)", border: "1px solid var(--color-primary-300)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                <div
                  style={{
                    padding: "var(--space-2)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--color-accent-50)",
                    color: "var(--color-accent-600)",
                  }}
                >
                  <Cpu size={18} />
                </div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>
                  Extracted Deterministic Constraints
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-2) var(--space-3)", backgroundColor: "var(--color-bg-subtle)", borderRadius: "var(--radius-md)", fontSize: "var(--text-xs)" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>Destination Cluster:</span>
                  <span style={{ fontWeight: 600, fontFamily: "var(--font-mono)" }}>RJ_HERITAGE_CIRCUIT</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-2) var(--space-3)", backgroundColor: "var(--color-bg-subtle)", borderRadius: "var(--radius-md)", fontSize: "var(--text-xs)" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>Strict Upper Bound:</span>
                  <span style={{ fontWeight: 600, fontFamily: "var(--font-mono)", color: "var(--color-success-600)" }}>INR 25,000</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-2) var(--space-3)", backgroundColor: "var(--color-bg-subtle)", borderRadius: "var(--radius-md)", fontSize: "var(--text-xs)" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>Transit Exclusion:</span>
                  <span style={{ fontWeight: 600, fontFamily: "var(--font-mono)", color: "var(--color-danger-600)" }}>NO_OVERNIGHT_BUS</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-2) var(--space-3)", backgroundColor: "var(--color-bg-subtle)", borderRadius: "var(--radius-md)", fontSize: "var(--text-xs)" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>Algorithm Assigned:</span>
                  <span style={{ fontWeight: 600, fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>KnapsackDP + Dijkstra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. FEATURED DESTINATIONS (Labelled DEMO)
          ===================================================================== */}
      <section className="section" style={{ backgroundColor: "var(--color-bg-subtle)" }}>
        <div className="container">
          <SectionHeader
            badge="Curated Circuits"
            title="Featured Indian Travel Corridors"
            subtitle="Engineered with multi-modal routing graphs and historical cost benchmarks."
            align="left"
            action={
              <Link to="/destinations">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
                  View All Circuits
                </Button>
              </Link>
            }
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {FEATURED_DESTINATIONS.map((dest) => (
              <Card key={dest.id} interactive className="surface-card">
                {/* Visual Header Banner */}
                <div
                  style={{
                    height: "140px",
                    borderRadius: "var(--radius-lg)",
                    background: dest.bgGradient,
                    position: "relative",
                    marginBottom: "var(--space-4)",
                    padding: "var(--space-3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "rgba(0,0,0,0.45)",
                      color: "#ffffff",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-full)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {dest.state}
                  </span>
                  <TrustBadge level="DEMO" />
                </div>

                <CardHeader style={{ marginBottom: "var(--space-2)" }}>
                  <CardTitle>{dest.name}</CardTitle>
                  <CardDescription>{dest.duration}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1-5)", marginBottom: "var(--space-4)" }}>
                    {dest.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "var(--radius-md)",
                          backgroundColor: "var(--color-bg-subtle)",
                          color: "var(--color-text-secondary)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Est. Budget: </span>
                      <span style={{ fontSize: "var(--text-base)", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>
                        {dest.estBudget}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-3)" }}>
                  <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
                    {dest.receiptAlgo}
                  </span>
                  <Link to="/destinations">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
                      Explore
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. HOW IT WORKS (6 Steps)
          ===================================================================== */}
      <section className="section">
        <div className="container">
          <SectionHeader
            badge="The Process"
            title="Six Steps from Prompt to Verifiable Itinerary"
            subtitle="Every step is governed by deterministic data structures ensuring optimal routes and genuine budgets."
            align="center"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {HOW_IT_WORKS_STEPS.map((st) => (
              <div
                key={st.step}
                className="surface-card"
                style={{
                  padding: "var(--space-6)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--text-3xl)",
                    fontWeight: 900,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-primary-200)",
                    lineHeight: 1,
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {st.step}
                </div>
                <h3
                  style={{
                    fontSize: "var(--text-base)",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {st.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. UNDER THE HOOD: MINI INTERACTIVE KNAPSACK TOY
          ===================================================================== */}
      <section className="section" style={{ backgroundColor: "var(--color-bg-subtle)" }}>
        <div className="container">
          <SectionHeader
            badge="Interactive Algorithm Widget"
            title="Experience the Knapsack DP Toy"
            subtitle="Run real dynamic programming in your browser to see how TravelMind packs activities within your budget."
            align="center"
          />

          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <KnapsackToy />
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. SOCIAL PROOF (Deterministic Metrics, Labelled DEMO)
          ===================================================================== */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            <StatCard
              title="Graph & Optimization Engines"
              value="10+"
              subtitle="Trie, Dijkstra, A*, Knapsack DP, Pareto"
              icon={<Cpu size={20} />}
              trustLevel="DEMO"
            />
            <StatCard
              title="Hallucinated Costs"
              value="0 ₹"
              subtitle="Every rupee is bounded and verified"
              icon={<ShieldCheck size={20} />}
              trustLevel="DEMO"
            />
            <StatCard
              title="Data Trust Tiers"
              value="4 Tiers"
              subtitle="LIVE, ESTIMATED, CACHED, DEMO"
              icon={<Layers size={20} />}
              trustLevel="DEMO"
            />
            <StatCard
              title="Execution Latency"
              value="< 5 ms"
              subtitle="Pure Python / TS algorithm runtimes"
              icon={<Zap size={20} />}
              trustLevel="DEMO"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. CALL TO ACTION
          ===================================================================== */}
      <section
        style={{
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-16)",
          backgroundColor: "var(--color-primary-900)",
          color: "#ffffff",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <h2
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "var(--space-4)",
            }}
          >
            Ready to Experience Truly Intelligent Travel Planning?
          </h2>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-primary-200)",
              lineHeight: 1.6,
              marginBottom: "var(--space-8)",
            }}
          >
            Step into the future where algorithms do the mathematical heavy lifting and AI understands your journey.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Link to="/app/dashboard">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight size={16} />}
                style={{ backgroundColor: "#ffffff", color: "var(--color-primary-900)", border: "none" }}
              >
                Open Dashboard Shell
              </Button>
            </Link>
            <Link to="/design-system">
              <Button
                variant="outline"
                size="lg"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff" }}
              >
                Browse Design System
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
