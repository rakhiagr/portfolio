// Small module — safe to include in the initial bundle.
// Maps Skills panel labels → keys in the (lazily-loaded) icon-data module.

export const LABEL_TO_KEY: Record<string, string> = {
  // Languages
  Java: "openjdk",
  "C++": "cplusplus",
  Python: "python",
  Scala: "scala",
  JavaScript: "javascript",
  TypeScript: "typescript",
  Swift: "swift",

  // Backend / data
  Kafka: "apachekafka",
  Flink: "apacheflink",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Couchbase: "couchbase",
  Elasticsearch: "elasticsearch",

  // Cloud & tooling
  Airflow: "apacheairflow",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Linux: "linux",
  Grafana: "grafana",
  Vercel: "vercel",
  Supabase: "supabase",

  // AI-native workflow
  "Claude Code": "claudecode",
  Cursor: "cursor",
  Windsurf: "windsurf",
};

export function hasTechIcon(label: string) {
  return LABEL_TO_KEY[label] !== undefined;
}
