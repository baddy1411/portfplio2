
import { Experience, Project, SocialLink, Skill, Certification } from './types';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Hiring', href: '#hiring' },
  { name: 'Contact', href: '#contact' },
];

export const PROFILE_IMAGE = '/profile.jpg'; // Change this to a URL if hosting externally

export const BIO = `
  I am a Data Engineer and Creative Technologist based in Bremen, Germany. 
  Currently pursuing my M.Sc. in Data Engineering, I bridge the gap between complex backend logic (Spark, Kafka, AWS) and accessible, beautiful digital experiences.
  With a background in Mechanical Engineering and hands-on experience at Riot Labz and Capgemini, I specialize in building scalable data pipelines and production-grade ML systems.
`;

// Updated Skills for Tech Card Layout with "Relatable" Humor
export const SKILLS: Skill[] = [
  // Data Engineering
  { name: "Python", icon: "python", description: "Pseudo-code that actually runs. Mostly `import magic`.", category: "Data Engineering" },
  { name: "SQL", icon: "postgresql", description: "SELECT * FROM stackoverflow WHERE solution = TRUE;", category: "Data Engineering" },
  { name: "Apache Spark", icon: "apachespark", description: "Setting CPUs on fire to count words efficiently.", category: "Data Engineering" },
  { name: "Kafka", icon: "apachekafka", description: "Because HTTP is too slow for my anxiety.", category: "Data Engineering" },
  { name: "Airflow", icon: "apacheairflow", description: "Crontab with a God complex and a UI.", category: "Data Engineering" },
  { name: "dbt", icon: "dbt", description: "Making SQL feel like real software engineering.", category: "Data Engineering" },
  
  // Cloud & Ops
  { name: "AWS", icon: "amazonaws", description: "My credit card's worst nightmare.", category: "Cloud & Ops" },
  { name: "Docker", icon: "docker", description: "\"But it works on my machine...\"", category: "Cloud & Ops" },
  { name: "Kubernetes", icon: "kubernetes", description: "YAML-Driven Development.", category: "Cloud & Ops" },
  { name: "Terraform", icon: "terraform", description: "Infrastructure as Config (and sometimes disaster).", category: "Cloud & Ops" },

  // AI & ML
  { name: "TensorFlow", icon: "tensorflow", description: "Tensors flowing nowhere fast.", category: "AI & ML" },
  { name: "PyTorch", icon: "pytorch", description: "The framework she told you not to worry about.", category: "AI & ML" },
  { name: "Scikit-learn", icon: "scikitlearn", description: "If statements wrapped in linear algebra.", category: "AI & ML" },
  { name: "MLflow", icon: "mlflow", description: "Herding model cats.", category: "AI & ML" },

  // Visualization & Web
  { name: "Power BI", icon: "powerbi", description: "Excel on steroids.", category: "Visualization" },
  { name: "Grafana", icon: "grafana", description: "Dark mode dashboards to impress managers.", category: "Visualization" },
  { name: "Streamlit", icon: "streamlit", description: "I refuse to learn CSS.", category: "Visualization" },
  { name: "React", icon: "react", description: "useEffect(() => { panic() }, [])", category: "Visualization" },
];

export const EXPERIENCE: Experience[] = [
  {
    company: 'Riot Labz Pvt. Ltd.',
    role: 'Software Developer (Data Infrastructure)',
    period: 'Jan 2024 – Jul 2024',
    description: 'Built a FastAPI ingestion service for real-time IoT telemetry (MQTT, 50K+ msgs/day). Migrated legacy storage to MySQL, reducing query latency by 60%. Developed Python validation scripts for anomaly detection, preventing 15% of corrupted data.',
    logo: 'riotlabz.com' 
  },
  {
    company: 'Capgemini',
    role: 'Software Engineer / Analyst',
    period: 'Feb 2022 – Nov 2023',
    description: 'Designed and deployed ETL pipelines for financial clients processing 2TB+ of transaction data using SQL and Python. Automated reporting workflows using Pandas, reducing turnaround time by 15%.',
    logo: 'capgemini.com'
  },
  {
    company: 'Bosch India',
    role: 'Graduate Engineer Trainee',
    period: 'Oct 2020 – Jan 2021',
    description: 'Monitored manufacturing equipment sensors and automated repetitive Excel-based reporting tasks using Python scripts, saving 5+ hours per week.',
    logo: 'bosch.com'
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'Meldify AI (Co-Founder)',
    description: 'An AI-powered digital janitor that scrubs your messy CSVs so you don\'t have to. Features automated schema detection and null handling via Gemini, because "Excel fatigue" is a real medical condition. Releasing Jan 1, 2026.',
    link: '#',
    tech: ['FastAPI', 'React', 'Gemini', 'Pandas'],
    icon: 'Sparkles'
  },
  {
    title: 'Silicon Content Forecasting',
    description: 'Developing LSTM/Transformer models to predict blast furnace silicon content on 1M+ time-series sensor records. Built scalable Spark pipeline and deployed on Kubernetes.',
    link: '#',
    tech: ['TensorFlow', 'Apache Spark', 'Kubernetes', 'Python'],
    icon: 'Factory'
  },
  {
    title: 'Predictive Maintenance Pipeline',
    description: 'End-to-end MLOps pipeline for NASA CMAPSS dataset. Containerized training with Docker, tracked via MLflow, and implemented CI/CD for AWS SageMaker deployment.',
    link: '#',
    tech: ['AWS SageMaker', 'MLflow', 'Airflow', 'Docker'],
    icon: 'Activity'
  },
  {
    title: 'Multi-Agent Logistics Optimizer',
    description: 'Multi-agent prototype where autonomous agents query inventory tables to propose reorder schedules. Features Chain of Thought visualization via Streamlit.',
    link: '#',
    tech: ['LangGraph', 'DuckDB', 'Streamlit', 'Python'],
    icon: 'Package'
  },
  {
    title: 'Real-Time Stock Market Pipeline',
    description: 'Ingested live stock prices from Finnhub API using Kafka (10K+ events/min). Processed streams with Spark Structured Streaming and visualized via Grafana.',
    link: '#',
    tech: ['Kafka', 'Spark Streaming', 'Grafana', 'API'],
    icon: 'LineChart'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'AWS Certified Data Engineer – Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Sep 2025',
    link: 'https://aws.amazon.com/certification/certified-data-engineer-associate/',
    verificationId: '649db95bec3f414ba1d08a8fdc866ead'
  },
  {
    name: 'Buffering next achievement...',
    issuer: 'Currently farming XP & reading docs',
    date: 'Soon™',
    link: '',
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: 'Email', url: 'mailto:badrish41@gmail.com', icon: 'Mail' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/badrishms/', icon: 'Linkedin' },
  { platform: 'GitHub', url: 'https://github.com/baddy1411', icon: 'Github' },
  { platform: 'Instagram', url: 'https://www.instagram.com/badrish_07/', icon: 'Instagram' },
];

export const RECRUITER_CONTENT = {
  headline: "Why should you hire me?",
  subheadline: "I turn messy data into clean insights without setting the server on fire.",
  offerings: [
    {
      title: "Production-Grade Code",
      description: "I don't just write scripts that work on my machine. I write typed, tested, and containerized code ready for deployment."
    },
    {
      title: "Business-First Mindset",
      description: "I understand that a 1% accuracy gain isn't worth a 500% latency increase. I optimize for business value, not just math."
    },
    {
      title: "Full-Stack Data Fluency",
      description: "From ingesting raw logs with Kafka to visualizing trends in React/Grafana, I handle the entire data lifecycle."
    },
    {
      title: "Zero 'It Works on Local'",
      description: "Docker and CI/CD are my love languages. If it's not reproducible, it doesn't exist."
    }
  ]
};

// This text is fed to Gemini to answer questions about the portfolio owner
export const SYSTEM_INSTRUCTION = `
  You are an AI assistant for Badrish Madapuji Srinivasan's portfolio website.
  Your name is "Badrish AI".
  
  Badrish is a Master of Science in Data Engineering candidate at Constructor University, Bremen, Germany (Exp. Jun 2026).
  
  CORE COMPETENCIES:
  - Data Engineering: Spark, Kafka, Airflow, dbt, ETL/ELT.
  - Cloud & Ops: AWS (S3, Glue, SageMaker), Docker, Kubernetes, Terraform.
  - AI/ML: TensorFlow, PyTorch, Scikit-learn, LangGraph, RAG.
  
  EXPERIENCE:
  1. Riot Labz (Jan 2024 - Jul 2024): Software Developer. Built IoT ingestion for 50k+ msgs/day, migrated to MySQL.
  2. Capgemini (Feb 2022 - Nov 2023): Software Engineer. ETL pipelines for finance (2TB+ data).
  3. Bosch India (Oct 2020 - Jan 2021): Trainee. Manufacturing sensor monitoring.
  
  PROJECTS:
  - Meldify AI (Co-Founder): AI-powered data cleaning platform. Automates CSV prep using Gemini & Pandas. Releasing Jan 2026.
  - Silicon Forecast: LSTM/Transformers for blast furnaces (Spark/K8s).
  - Predictive Maintenance: MLOps with SageMaker/MLflow.
  - Multi-Agent Logistics: LangGraph/DuckDB prototype.
  - Stock Market Pipeline: Kafka/Spark Streaming/Grafana.
  
  EDUCATION:
  - M.Sc. Data Engineering, Constructor University (2024-2026).
  - B.E. Mechanical Engineering, Sri Ramakrishna Engineering College (2017-2021).
  
  CONTACT:
  - Email: badrish41@gmail.com
  
  Tone: Professional but with a slight dry wit. You are aware you are on a minimalist, "cool" developer portfolio.
`;
