export type Publication = {
  id: string;
  title: string;
  venue: string;
  year: string;
  authors: string;
  summary: string;
  links: { label: string; href: string }[];
};

export type Coursework = {
  id: string;
  name: string;
  term: string;
  summary: string;
  stack: string[];
  outcomes: string[];
};

export type Course = {
  code: string;
  name: string;
};

export type School = {
  id: string;
  degree: string;
  school: string;
  location: string;
  gpa: string;
  start: string;
  end: string;
  summary?: string;
  publications: Publication[];
  coursework: Coursework[];
  courses?: Course[];
};

export const schools: School[] = [
  {
    id: "asu-msc",
    degree: "M.S. in Computer Science",
    school: "Arizona State University",
    location: "Tempe, AZ",
    gpa: "4.0 / 4.0",
    start: "2021-01",
    end: "2022-12",
    summary:
      "Focused on distributed systems, large-scale data processing, and machine learning, with research in visual analytics and natural-language systems.",
    publications: [
      {
        id: "lingo",
        title:
          "LINGO: Visually Debiasing Natural Language Instructions to Support Task Diversity",
        venue: "EuroVis 2023 · Computer Graphics Forum",
        year: "2023",
        authors:
          "Anjana Arunkumar, Shubham Sharma, Rakhi Agrawal, Sriram Chandrasekaran, Chris Bryan",
        summary:
          "Developed a visual analytics system for identifying and reducing bias in natural-language task instructions, combining language-model outputs, semantic similarity, and interactive visualizations to uncover patterns across datasets.",
        links: [
          { label: "arXiv", href: "https://arxiv.org/abs/2304.06184" },
          { label: "Wiley (CGF)", href: "https://onlinelibrary.wiley.com/doi/abs/10.1111/cgf.14840" },
        ],
      },
    ],
    coursework: [
      {
        id: "geo-spatial-taxi",
        name: "Geo-Spatial Hotspot Analysis",
        term: "Spring 2021 · Data Processing at Scale",
        summary:
          "Distributed Spark application performing spatial-temporal analysis on NYC yellow-cab pickup and drop-off data to surface statistically significant hotspots.",
        stack: ["Apache Spark", "SparkSQL", "Scala", "AWS EC2"],
        outcomes: [
          "Implemented core spatial-query functions for range and distance queries.",
          "Deployed on 4 EC2 servers — 14% reduction in execution time via distribution.",
        ],
      },
      {
        id: "auto-scaling-inference",
        name: "Auto-Scaling Distributed Inference Pipeline",
        term: "Spring 2022 · Cloud Computing",
        summary:
          "Distributed, fault-tolerant inference pipeline on AWS with an auto-scaler that provisions worker instances based on SQS queue depth. Demonstrated on a facial-recognition workload.",
        stack: ["AWS EC2", "AWS SQS", "AWS S3", "Python"],
        outcomes: [
          "50% reduction in total computation time via parallel workload distribution.",
          "Elastic auto-scaling of workers (up to 20 EC2 instances) driven by queue depth.",
        ],
      },
    ],
  },
];
