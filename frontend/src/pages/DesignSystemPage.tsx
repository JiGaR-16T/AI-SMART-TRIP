import React, { useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Select,
  Combobox,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  Chip,
  ChipGroup,
  Badge,
  TrustBadge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Modal,
  Drawer,
  Tooltip,
  Popover,
  Skeleton,
  Spinner,
  ProgressBar,
  ProgressRing,
  Stepper,
  EmptyState,
  ErrorState,
  DataTable,
  Breadcrumbs,
  StatCard,
  SectionHeader,
  AlgorithmReceiptChip,
  RouteLine,
  ThemeToggle,
} from "@/components/ui";
import { toast } from "@/store/toastStore";
import {
  Compass,
  Sparkles,
  MapPin,
  Heart,
  Settings,
  Share2,
  Trash2,
} from "lucide-react";

export const DesignSystemPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [comboboxVal, setComboboxVal] = useState("del");
  const [sliderVal, setSliderVal] = useState<number[]>([45]);
  const [switchVal, setSwitchVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState("standard");
  const [activeChips, setActiveChips] = useState<string[]>(["culture", "nature"]);
  const [stepperIndex, setStepperIndex] = useState(1);

  const demoSelectOptions = [
    { value: "delhi", label: "Indira Gandhi Intl (DEL)" },
    { value: "mumbai", label: "Chhatrapati Shivaji Maharaj (BOM)" },
    { value: "bengaluru", label: "Kempegowda Intl (BLR)" },
    { value: "jaipur", label: "Jaipur Airport (JAI)" },
  ];

  const demoComboboxOptions = [
    { value: "del", label: "Delhi National Capital Region", description: "North India Transit Hub" },
    { value: "bom", label: "Mumbai Metropolitan Region", description: "West Coast Financial Hub" },
    { value: "jai", label: "Jaipur Pink City", description: "Rajasthan Heritage Corridor" },
  ];

  const demoTableColumns = [
    { key: "id", header: "Code", sortable: true },
    { key: "name", header: "Algorithm Name", sortable: true },
    { key: "category", header: "Category" },
    { key: "complexity", header: "Time Complexity" },
  ];

  const demoTableData = [
    { id: "ALG-01", name: "Dijkstra Min-Heap", category: "Graph Routing", complexity: "O(V log V + E)" },
    { id: "ALG-02", name: "0/1 Knapsack DP", category: "Budget Optimization", complexity: "O(n × W)" },
    { id: "ALG-03", name: "Trie Prefix Search", category: "Entity Extraction", complexity: "O(k)" },
    { id: "ALG-04", name: "Pareto Frontier", category: "Multi-Objective Ranking", complexity: "O(N log N)" },
  ];

  return (
    <div className="container" style={{ padding: "var(--space-12) var(--space-4)" }}>
      {/* Page Title & Global Theme Controller */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "var(--space-4)",
          paddingBottom: "var(--space-8)",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "var(--space-10)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 800,
                color: "var(--color-primary-600)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Living Component Catalog
            </span>
            <Badge variant="primary">Dev Only</Badge>
          </div>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: 800,
              letterSpacing: "var(--tracking-tight)",
              marginTop: "4px",
            }}
          >
            TravelMind Design System
          </h1>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-secondary)",
              maxWidth: "650px",
              marginTop: "var(--space-2)",
            }}
          >
            Intelligent + Adventurous design tokens, accessible UI primitives, signature algorithm chips, and live interactive states.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Switch Theme:</span>
          <ThemeToggle showLabel={true} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
        {/* =====================================================================
            1. BUTTONS & ICON BUTTONS
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Buttons & Icon Buttons"
            subtitle="Variants, sizes, loading spinners, and accessible icon buttons."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center" }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" isLoading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center" }}>
              <Button size="sm" variant="primary">Small (sm)</Button>
              <Button size="md" variant="primary">Medium (md)</Button>
              <Button size="lg" variant="primary">Large (lg)</Button>
              <Button variant="primary" leftIcon={<Sparkles size={16} />}>With Left Icon</Button>
              <Button variant="outline" rightIcon={<Compass size={16} />}>With Right Icon</Button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <IconButton icon={<Heart size={18} />} aria-label="Favorite destination" variant="ghost" />
              <IconButton icon={<Share2 size={18} />} aria-label="Share itinerary" variant="outline" />
              <IconButton icon={<Settings size={18} />} aria-label="Configure algorithm" variant="secondary" />
              <IconButton icon={<Trash2 size={18} />} aria-label="Delete draft" variant="danger" />
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. TRUST BADGES & BADGES
            ===================================================================== */}
        <section>
          <SectionHeader
            title="TrustBadges & Standard Badges"
            subtitle="Four-tier trust transparency badges (Golden Rule 8) plus status indicators."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
              <TrustBadge level="LIVE" />
              <TrustBadge level="ESTIMATED" />
              <TrustBadge level="CACHED" />
              <TrustBadge level="DEMO" />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center" }}>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="accent">Accent</Badge>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. FORM INPUTS & SELECTION
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Form Controls & Inputs"
            subtitle="Accessible inputs, selects, comboboxes, checkboxes, switches, and sliders."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            <Input
              label="Starting Location"
              placeholder="e.g. New Delhi"
              helperText="Enter your origin city or airport code"
              startIcon={<MapPin size={16} />}
            />

            <Input
              label="Destination Hub"
              placeholder="e.g. Jaipur"
              error="Destination airport is required"
              defaultValue="Invalid Input"
            />

            <Select
              label="Transit Airport Gateway"
              options={demoSelectOptions}
              placeholder="Select an Indian hub..."
              defaultValue="delhi"
            />

            <Combobox
              label="Searchable Corridors (Combobox)"
              options={demoComboboxOptions}
              value={comboboxVal}
              onChange={setComboboxVal}
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <Textarea
                label="Special Travel Preferences & Notes"
                placeholder="Describe dietary preferences, accessibility needs, or pace..."
                rows={3}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Checkbox
                label="Direct transit routes only (No layovers)"
                checked={checkboxVal}
                onCheckedChange={setCheckboxVal}
              />
              <Switch
                label="Enable Real-Time Train Delay Predictions"
                checked={switchVal}
                onCheckedChange={setSwitchVal}
              />
            </div>

            <RadioGroup
              label="Itinerary Pacing Preference"
              value={radioVal}
              onValueChange={setRadioVal}
              options={[
                { value: "relaxed", label: "Relaxed (1-2 places/day)", description: "Ample leisure time" },
                { value: "standard", label: "Balanced (3-4 places/day)", description: "Recommended optimal balance" },
                { value: "packed", label: "High-Energy Expedition", description: "Maximize sights seen" },
              ]}
            />

            <Slider
              label="Budget Slider"
              min={5000}
              max={100000}
              step={1000}
              value={sliderVal}
              onValueChange={setSliderVal}
              formatValue={(val) => `₹${val.toLocaleString("en-IN")}`}
            />
          </div>
        </section>

        {/* =====================================================================
            4. CHIPS & MULTI-SELECT CHIP GROUP
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Chips & ChipGroup"
            subtitle="Multi-select filter chips used for trip archetypes and tagging."
          />
          <ChipGroup
            label="Filter Activities by Category"
            options={[
              { value: "culture", label: "Historical Monuments" },
              { value: "nature", label: "National Parks & Wildlife" },
              { value: "culinary", label: "Street Food & Dining" },
              { value: "adventure", label: "Hiking & Trekking" },
              { value: "wellness", label: "Yoga & Ayurveda" },
            ]}
            selectedValues={activeChips}
            onChange={setActiveChips}
          />
        </section>

        {/* =====================================================================
            5. TOAST NOTIFICATIONS & OVERLAYS
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Overlays, Dialogs & Toast Notifications"
            subtitle="Modals, Drawers, Tooltips, Popovers, and Zustand-backed Toasts."
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center" }}>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Open Accessible Modal
            </Button>
            <Button variant="outline" onClick={() => setDrawerOpen(true)}>
              Open Slide-in Drawer
            </Button>

            <Tooltip content="Tooltip explaining Dijkstra heuristic" side="top">
              <Button variant="secondary">Hover for Tooltip</Button>
            </Tooltip>

            <Popover
              trigger={<Button variant="ghost">Click for Popover</Button>}
            >
              <div>
                <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>Popover Title</h4>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                  Contextual quick actions and options popover content.
                </p>
              </div>
            </Popover>

            <Button
              variant="outline"
              onClick={() => toast.success("Trip Saved", "Golden Triangle added to your favorites.")}
            >
              Trigger Success Toast
            </Button>

            <Button
              variant="outline"
              onClick={() => toast.error("Calculation Error", "Graph constraint resulted in an empty route.")}
            >
              Trigger Error Toast
            </Button>

            <Button
              variant="outline"
              onClick={() => toast.warning("Budget Alert", "Current activities exceed allocated cap by 12%.")}
            >
              Trigger Warning Toast
            </Button>
          </div>
        </section>

        {/* =====================================================================
            6. PROGRESS & SCORE METERS
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Progress, Scores & Skeletons"
            subtitle="Visualizing computational progress, Pareto scores, and loading placeholders."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--space-6)",
              alignItems: "center",
            }}
          >
            <div>
              <span className="input-label">Linear Progress Bar</span>
              <ProgressBar value={72} label="Budget Optimization Complete" showValue />
            </div>

            <div style={{ display: "flex", gap: "var(--space-6)", justifyContent: "center" }}>
              <ProgressRing score={94} max={100} label="Pareto" color="var(--color-primary-600)" />
              <ProgressRing score={88} max={100} label="Transit" color="var(--color-success-500)" />
              <ProgressRing score={74} max={100} label="Budget" color="var(--color-accent-500)" />
            </div>

            <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>

            <div>
              <span className="input-label">Skeleton Placeholders</span>
              <Skeleton height="1.25rem" style={{ marginBottom: "var(--space-2)" }} />
              <Skeleton height="0.85rem" width="80%" />
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. STEPPER & BREADCRUMBS
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Navigation Stepper & Breadcrumbs"
            subtitle="Step-by-step itinerary creation wizards and hierarchy breadcrumbs."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Trips", href: "/app/trips" },
                { label: "Rajasthan Circuit", isCurrent: true },
              ]}
            />

            <Stepper
              steps={[
                { id: "1", title: "Select Hubs", description: "Origin & Target" },
                { id: "2", title: "Constraints", description: "Dates & Budget" },
                { id: "3", title: "Compute", description: "Knapsack DP" },
                { id: "4", title: "Confirm", description: "Receipt & Booking" },
              ]}
              currentStep={stepperIndex}
              onStepClick={setStepperIndex}
            />
          </div>
        </section>

        {/* =====================================================================
            8. SIGNATURE TRAVEL-TECH ELEMENTS
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Signature Travel-Tech Components"
            subtitle="AlgorithmReceiptChip and RouteLine decorative motif."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
              <AlgorithmReceiptChip name="Dijkstra Shortest Path" timeMs={0.92} complexity="O(V log V + E)" />
              <AlgorithmReceiptChip name="0/1 Knapsack DP" timeMs={1.45} complexity="O(n × W)" />
              <AlgorithmReceiptChip name="Pareto Frontier" timeMs={2.10} complexity="O(N log N)" />
            </div>

            <div className="surface-card" style={{ padding: "var(--space-6)" }}>
              <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, textTransform: "uppercase", color: "var(--color-primary-600)", marginBottom: "var(--space-2)" }}>
                RouteLine Motif Preview
              </div>
              <RouteLine from="New Delhi" to="Varanasi" stops={["Agra", "Prayagraj"]} animated={true} />
            </div>
          </div>
        </section>

        {/* =====================================================================
            9. DATA TABLE
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Sortable DataTable"
            subtitle="Accessible table shell with sortable column headers and empty state support."
          />
          <DataTable
            columns={demoTableColumns}
            data={demoTableData}
            keyExtractor={(row) => row.id}
          />
        </section>

        {/* =====================================================================
            10. CARDS & AVATARS
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Cards & Avatars"
            subtitle="Structured content cards, interactive hover states, and user avatars."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)" }}>
            <Card interactive className="surface-card">
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Avatar name="Aditya Sharma" size="md" />
                  <TrustBadge level="DEMO" />
                </div>
                <CardTitle style={{ marginTop: "var(--space-3)" }}>Interactive Destination Card</CardTitle>
                <CardDescription>Hover over this card to observe the smooth elevation and border accent.</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                  Card subcomponents enforce clean vertical rhythm and layout consistency.
                </p>
                <div style={{ marginTop: "var(--space-3)", display: "flex", gap: "var(--space-2)" }}>
                  <Chip selected>Sample Chip</Chip>
                  <Chip>Unselected</Chip>
                </div>
              </CardContent>
              <CardFooter>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>Footer metadata</span>
                <Button variant="ghost" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <StatCard
                title="Pareto Score"
                value="96.4"
                change="+5.2%"
                trend="up"
                subtitle="Calculated across 30 candidates"
                trustLevel="LIVE"
              />
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <Avatar name="Kavita Rao" size="sm" />
                <Avatar name="Rohan Verma" size="md" />
                <Avatar name="Priya Patel" size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            11. TABS & ACCORDION
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Tabs & Accordion"
            subtitle="Accessible tabbed panels and expandable FAQ accordions."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
            <div className="surface-card" style={{ padding: "var(--space-6)" }}>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Graph Engine</TabsTrigger>
                  <TabsTrigger value="tab2">Knapsack DP</TabsTrigger>
                  <TabsTrigger value="tab3">Pareto Frontier</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    Dijkstra and A* algorithm implementations traverse multi-modal transit graphs with zero hallucination.
                  </p>
                </TabsContent>
                <TabsContent value="tab2">
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    0/1 Knapsack dynamic programming bounds total itinerary spend strictly within the chosen budget.
                  </p>
                </TabsContent>
                <TabsContent value="tab3">
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    Filters out dominated itineraries across transit fatigue, cost, and pacing scores.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            <div className="surface-card" style={{ padding: "var(--space-6)" }}>
              <Accordion type="single" collapsible defaultValue="acc1">
                <AccordionItem value="acc1">
                  <AccordionTrigger>What makes TravelMind different from ChatGPT?</AccordionTrigger>
                  <AccordionContent>
                    ChatGPT guesses hotel prices and train schedules. TravelMind parses requests with AI, but computes routes and budgets using pure deterministic algorithms.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="acc2">
                  <AccordionTrigger>What is an Algorithm Receipt?</AccordionTrigger>
                  <AccordionContent>
                    Every computed result contains an execution receipt logging exact milliseconds, steps explored, and time/space complexity.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* =====================================================================
            12. EMPTY & ERROR STATES
            ===================================================================== */}
        <section>
          <SectionHeader
            title="Empty & Error States"
            subtitle="Graceful fallback states for empty results and computational errors."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
            <EmptyState
              title="No Itineraries Saved"
              description="You have not saved any trip plans yet. Start by browsing curated circuits."
              actionLabel="Explore Circuits"
              onAction={() => toast.info("Explore", "Navigating to circuits")}
            />
            <ErrorState
              title="Connection Timeout"
              message="The algorithm worker failed to respond within the expected threshold. Please try again."
              onRetry={() => toast.success("Retried", "Attempting connection")}
            />
          </div>
        </section>
      </div>

      {/* Demo Modal */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Sample Modal Dialog"
        description="This modal adheres to WCAG focus trapping, ARIA roles, and keyboard Escape listener."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm Action</Button>
          </>
        }
      >
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text)", lineHeight: 1.6 }}>
          Accessible modals are essential for verifying critical actions and displaying mathematical receipts without losing user context.
        </p>
      </Modal>

      {/* Demo Drawer */}
      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Sample Slide-In Drawer"
        description="Sliding sheet panel from the right edge."
        footer={
          <Button variant="primary" onClick={() => setDrawerOpen(false)} style={{ width: "100%" }}>
            Close Drawer
          </Button>
        }
      >
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text)", lineHeight: 1.6 }}>
          Used primarily for detailed algorithmic breakdowns, route comparison breakdowns, and contextual deep dives.
        </p>
      </Drawer>
    </div>
  );
};

export default DesignSystemPage;
