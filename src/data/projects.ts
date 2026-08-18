export type Outcome = {
  /** Optional short label. Renders bold; if absent, description reads as a plain bullet. */
  label?: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  kind: "personal" | "academic";
  year: string;
  thesis: string;
  role: string;
  summary: string;
  stack: string[];
  outcomes: Outcome[];
  /** Small mono chip line above the stack — for compressed extra signals. */
  metrics?: string[];
  links?: { label: string; href: string }[];
  // Position in the WebGL system-graph (normalized -1..1)
  node: { x: number; y: number };
  accent?: "signal" | "paper";
  // Real product screenshots (optional). When present, the card's signature
  // panel cross-fades to a screenshot on hover with dot controls to cycle.
  screens?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    id: "expense-tracker",
    name: "Expenses",
    kind: "personal",
    year: "05/2026",
    thesis:
      "Personal finance across currencies, without another subscription.",
    role: "Designer & sole engineer",
    summary:
      "A personal finance app for tracking expenses, accounts, net worth, and savings goals across currencies. Connects real accounts through Plaid and keeps both native and converted values using historical exchange rates.",
    stack: [
      "Next.js 15 (RSC)",
      "React 19",
      "TypeScript",
      "Supabase (Postgres)",
      "Plaid",
      "Tailwind",
    ],
    outcomes: [
      {
        label: "Secure account linking",
        description:
          "Plaid integration with AES-256-GCM at-rest token encryption and ES256-verified webhooks.",
      },
      {
        label: "Multi-currency data model",
        description:
          "Historical FX normalization via Bank of Canada rates, preserving both native and home-currency values.",
      },
      {
        label: "Multi-user isolation",
        description:
          "Workspace-scoped data layer with automated cross-user isolation tests in CI.",
      },
    ],
    links: [],
    node: { x: 0.7, y: -0.35 },
    accent: "signal",
    screens: [
      { src: "/screens/expense-home.png", alt: "Expenses — home overview with monthly spend and net worth" },
      { src: "/screens/expense-insights.png", alt: "Expenses — insights view with category breakdown" },
      { src: "/screens/expense-networth.png", alt: "Expenses — net worth trend and account list" },
      { src: "/screens/expense-transactions.png", alt: "Expenses — transaction list with dual-currency amounts" },
    ],
  },
  {
    id: "gympal",
    name: "GymPal",
    kind: "personal",
    year: "06/2026",
    thesis:
      "A local-first workout tracker built around how I actually train. No accounts, no cloud, no subscriptions.",
    role: "Designer & sole engineer",
    summary:
      "A native SwiftUI + SwiftData app for planning weekly workouts, logging sets, reps, and weight, and tracking progress over time. Designed for one-thumb use between sets — built to disappear into the workflow.",
    stack: ["SwiftUI", "SwiftData", "iOS 26", "Xcode", "TestFlight"],
    outcomes: [
      {
        label: "Zero dependencies",
        description: "Pure native, offline-first. No accounts, no backend.",
      },
      {
        label: "One-thumb operation",
        description:
          "Gym-friendly controls with haptic feedback and reduced-motion support.",
      },
      {
        label: "Built-in fitness features",
        description:
          "Rest timer, MET-based calorie estimation, and weekly consistency tracking.",
      },
    ],
    links: [],
    node: { x: 0.72, y: 0.4 },
    accent: "signal",
    screens: [
      { src: "/screens/gympal-today.png", alt: "GymPal — Today view with weekly calendar and workout card" },
      { src: "/screens/gympal-plan.png", alt: "GymPal — Plan view showing active weekly training schedule" },
      { src: "/screens/gympal-session.png", alt: "GymPal — live workout session with exercise blocks and set logging" },
      { src: "/screens/gympal-progress.png", alt: "GymPal — progress view with weekly activity and session goal" },
    ],
  },
];

export const skills = {
  languages: ["Java", "C++", "SQL", "Python", "Scala", "JavaScript", "TypeScript", "Shell", "Swift"],
  backend: [
    "Distributed Systems",
    "Microservices",
    "gRPC",
    "REST",
    "Protobuf",
    "Kafka",
    "Flink",
    "Samza",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Couchbase",
    "Elasticsearch",
    "HDFS",
    "Iceberg",
  ],
  cloud: [
    "AWS (EC2, S3, Lambda, DynamoDB, SQS)",
    "Airflow",
    "Docker",
    "Kubernetes",
    "Linux",
    "DataHub",
    "Grafana",
    "Kusto/KQL",
    "Vercel",
    "Supabase",
  ],
  ai: ["Claude Code", "Codex", "Cursor", "Windsurf"],
};
