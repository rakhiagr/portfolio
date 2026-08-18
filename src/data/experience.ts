export type Highlight = {
  id: string;
  title: string;
  summary: string;
  metrics: string[];
  stack: string[];
  featured?: boolean;
};

export type Role = {
  id: string;
  company: string;
  title: string;
  location: string;
  start: string;
  end: string | "Present";
  href?: string;
  summary?: string;
  highlights?: Highlight[];
  bullets?: string[];
};

export const roles: Role[] = [
  {
    id: "linkedin-swe",
    company: "LinkedIn",
    title: "Software Engineer",
    location: "Mountain View, CA → Toronto, ON",
    start: "2023-01",
    end: "2026-06",
    href: "https://linkedin.com",
    summary:
      "Built backend and platform infrastructure for LinkedIn's metadata ecosystem, powering data discovery, governance, and compliance across the company's data lake.",
    highlights: [
      {
        id: "hdfs-corpus-reduction",
        title: "Data retention platform",
        featured: true,
        summary:
          "Designed a centralized retention-policy and enforcement layer for HDFS and Iceberg datasets as part of LinkedIn's storage-reduction initiative. Built lineage-aware policy resolution, retention synchronization, and validation across 30K+ datasets.",
        metrics: ["~$50M projected annual savings", "30K+ datasets"],
        stack: ["HDFS", "Iceberg", "Java", "Airflow"],
      },
      {
        id: "mysql-multi-primary",
        title: "Multi-primary MySQL architecture",
        summary:
          "Migrated a compliance-critical metadata store from single-primary to multi-primary MySQL under live production traffic. Built dual-read/write, backfill, validation, and cutover mechanisms to complete the migration with zero downtime and no data loss.",
        metrics: [
          "15K read QPS · 10K write QPS",
          "Zero-downtime cutover",
          "No data loss",
        ],
        stack: ["MySQL", "Java", "gRPC"],
      },
      {
        id: "ingestion-reliability",
        title: "Metadata ingestion reliability",
        summary:
          "Rebuilt failure handling for LinkedIn's metadata ingestion pipeline with automated recovery, DLQ replay tooling, health metrics, and alerting — improving ingestion reliability while reducing operational overhead.",
        metrics: ["170M+ daily events", "99.99% ingestion success"],
        stack: ["Flink", "Kafka", "OpenTelemetry", "Java"],
      },
      {
        id: "samza-to-flink",
        title: "Samza → Flink migration",
        summary:
          "Led migration of five critical metadata ingestion pipelines from Samza to Flink and drove production rollout across large-scale streaming infrastructure.",
        metrics: ["250M+ records/day", "500+ Kafka topics", "5 pipelines"],
        stack: ["Flink", "Kafka", "Samza"],
      },
      {
        id: "query-performance",
        title: "Query & schema performance",
        summary:
          "Cut high-volume query latency from 4–5s to 0.05s through indexing and application-level tuning — a ~100× improvement. Eliminated schema-evolution table locks from 1000s+ to near zero.",
        metrics: ["4–5s → 50ms (~100×)", "1,000s+ → near-zero lock time"],
        stack: ["MySQL", "Java"],
      },
      {
        id: "reliability-eng",
        title: "Reliability engineering across 10+ services",
        summary:
          "Established uptime targets, observability standards, alerting, and production-readiness practices across 10+ services and 100+ gRPC endpoints.",
        metrics: ["10+ services", "100+ gRPC endpoints"],
        stack: ["gRPC", "Grafana", "Kusto/KQL"],
      },
    ],
  },
  {
    id: "linkedin-intern",
    company: "LinkedIn",
    title: "Software Engineer Intern",
    location: "Mountain View, CA",
    start: "2022-05",
    end: "2022-08",
    bullets: [
      "Built APIs and validation frameworks to enforce data-quality standards across LinkedIn's offline data lake, catching malformed assertions before they triggered production failures.",
    ],
  },
  {
    id: "inspectinity",
    company: "Inspectinity",
    title: "Back-End Developer",
    location: "India",
    start: "2020-08",
    end: "2020-12",
    summary:
      "Safety- and quality-inspection SaaS for food and industrial companies — replacing paper and spreadsheet SOPs with a mobile-first audit tool.",
    bullets: [
      "Developed 20+ REST APIs in Python/Flask for high-volume backend workflows.",
      "Optimized PostgreSQL queries for high-traffic components and built reusable auth, validation, and data-processing modules.",
    ],
  },
];

export const education = {
  degree: "M.S. in Computer Science",
  school: "Arizona State University",
  gpa: "4.0 / 4.0",
  start: "2021-01",
  end: "2022-12",
};
