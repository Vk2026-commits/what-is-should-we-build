export type PathId = "knowledge" | "workflow" | "vendors" | "connected";
export type QuestionType = "single" | "multi" | "scale";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  stage: string;
  heading: string;
  support?: string;
  question: string;
  options?: QuestionOption[];
  scale?: { min: number; max: number; minLabel: string; maxLabel: string };
  optional?: boolean;
}

export const brandCopy = {
  productName: "Operations Build Finder",
  hero: {
    eyebrow: "For business owners & operations leaders",
    headline: "What Should Your Business Build Next?",
    subheadline:
      "Your documents, conversations, and decisions tell one story. Your tools keep them in different places. Find the operations system that would make the biggest difference for your business.",
    support: "Start with one costly bottleneck. Connect the tools your team already uses.",
    cta: "Find My First Build",
    underCta: "About 3 minutes \u00b7 A practical, personalized build brief",
    flow: ["Your Business", "The Bottleneck", "Connected Systems", "Your Build Brief"],
  },
  intro: {
    heading: "Your Business Knowledge Should Work Together.",
    body: [
      "An agreement lives in a folder. The context lives in a conversation. The next step lives in someone\u2019s head.",
      "Outlook, Teams, SharePoint, and other tools support daily work. But finding a document is different from connecting it to a decision and the person responsible for acting on it.",
      "A custom operations system can connect those pieces. It still needs clear ownership, permissions, and a tested backup plan.",
      "Tell us where work breaks down. We\u2019ll recommend one useful place to start.",
    ],
    cta: "Map My Operations",
  },
  analysis: {
    heading: "Mapping your first build\u2026",
    items: [
      "Business context",
      "Operational bottleneck",
      "Existing tools",
      "Information flow",
      "Dependencies",
      "First build scope",
    ],
    done: "Your Operations Build Brief Is Ready.",
  },
  leadForm: {
    heading: "Your Operations Build Brief Is Ready.",
    support:
      "Add your business details to view your recommendation and discuss what a first version could look like.",
    cta: "Show My Build Brief",
  },
};
export const stages = ["Business", "Friction", "Priorities", "Readiness", "Your Plan"];
export const questions: Question[] = [
  {
    id: "business_type",
    type: "single",
    stage: "Business",
    heading: "Start With Your Business.",
    question: "What kind of business do you run?",
    options: [
      {
        value: "services",
        label: "Professional services / agency",
      },
      {
        value: "trades",
        label: "Trades / construction / field services",
      },
      {
        value: "retail",
        label: "Retail / e-commerce",
      },
      {
        value: "health",
        label: "Healthcare / wellness",
      },
      {
        value: "logistics",
        label: "Manufacturing / logistics",
      },
      {
        value: "other",
        label: "Another type of business",
      },
    ],
  },
  {
    id: "team_size",
    type: "single",
    stage: "Business",
    heading: "Who Needs to Stay Connected?",
    question: "How many people work in your business?",
    options: [
      {
        value: "solo",
        label: "Just me",
      },
      {
        value: "2_10",
        label: "2\u201310 people",
      },
      {
        value: "11_50",
        label: "11\u201350 people",
      },
      {
        value: "51_200",
        label: "51\u2013200 people",
      },
      {
        value: "200_plus",
        label: "More than 200 people",
      },
    ],
  },
  {
    id: "bottleneck",
    type: "single",
    stage: "Friction",
    heading: "Where Does Work Get Stuck?",
    question: "Which problem would you fix first?",
    options: [
      {
        value: "knowledge",
        label: "We waste time finding information and context",
      },
      {
        value: "workflow",
        label: "Tasks, approvals, and handoffs fall through",
      },
      {
        value: "vendors",
        label: "Vendor or client updates are scattered",
      },
      {
        value: "connected",
        label: "I cannot see what is happening across the business",
      },
    ],
    support: "Choose the problem with the biggest day-to-day impact.",
  },
  {
    id: "tools",
    type: "multi",
    stage: "Friction",
    heading: "Keep What Already Works.",
    question: "Which tools does your team use today?",
    options: [
      {
        value: "microsoft",
        label: "Microsoft 365 / Outlook / Teams / SharePoint",
      },
      {
        value: "google",
        label: "Google Workspace / Gmail / Drive",
      },
      {
        value: "slack",
        label: "Slack or messaging apps",
      },
      {
        value: "crm",
        label: "CRM / project management software",
      },
      {
        value: "spreadsheets",
        label: "Spreadsheets and shared documents",
      },
      {
        value: "manual",
        label: "Paper, phone calls, or informal processes",
      },
    ],
  },
  {
    id: "information",
    type: "single",
    stage: "Friction",
    heading: "Where Is the Missing Context?",
    question: "Which information is hardest to connect to the work?",
    options: [
      {
        value: "knowledge",
        label: "Documents, procedures, and company knowledge",
      },
      {
        value: "workflow",
        label: "Meeting notes, decisions, and next steps",
      },
      {
        value: "vendors",
        label: "Agreements, vendor updates, and renewals",
      },
      {
        value: "connected",
        label: "Status updates across teams and systems",
      },
    ],
  },
  {
    id: "impact",
    type: "single",
    stage: "Priorities",
    heading: "What Does the Friction Cost You?",
    question: "What is the biggest consequence?",
    options: [
      {
        value: "knowledge",
        label: "Repeated questions and time spent searching",
      },
      {
        value: "workflow",
        label: "Missed deadlines and repeated manual work",
      },
      {
        value: "vendors",
        label: "Slow responses and missed commitments",
      },
      {
        value: "connected",
        label: "Everything comes back to me as the owner",
      },
    ],
  },
  {
    id: "continuity",
    type: "single",
    stage: "Priorities",
    heading: "Could Work Continue Without Your Main Tool?",
    question: "How prepared are you for an outage or lost access?",
    options: [
      {
        value: "tested",
        label: "We have tested backups and a documented fallback",
      },
      {
        value: "partial",
        label: "Some backups exist, but we have not tested recovery",
      },
      {
        value: "dependent",
        label: "Work stops if our main platform is unavailable",
      },
      {
        value: "unsure",
        label: "I am not sure",
      },
    ],
    support:
      "A custom system needs its own recovery plan. Connecting tools does not automatically remove their dependencies.",
  },
  {
    id: "timeline",
    type: "single",
    stage: "Readiness",
    heading: "Choose a Practical Starting Point.",
    question: "When would you like to start improving this?",
    options: [
      {
        value: "now",
        label: "Now \u2014 this is slowing us down",
      },
      {
        value: "quarter",
        label: "Within the next 1\u20133 months",
      },
      {
        value: "exploring",
        label: "I am exploring what is possible",
      },
    ],
  },
  {
    id: "owner",
    type: "single",
    stage: "Readiness",
    heading: "Who Will Help Make It Work?",
    question: "Who can own the process and help test a first version?",
    options: [
      {
        value: "me",
        label: "I can own it as the business owner",
      },
      {
        value: "team",
        label: "An operations lead or team member",
      },
      {
        value: "technical",
        label: "An internal technical team",
      },
      {
        value: "unsure",
        label: "We need help defining ownership",
      },
    ],
  },
];
export interface PathContent {
  id: PathId;
  name: string;
  tagline: string;
  examples: string[];
  dashboard: {
    timeCommitment: string;
    speedToMarket: string;
    technicalComplexity: string;
    scalability: string;
    customerAcquisition: string;
  };
  firstTarget: string;
  nextMoves: string[];
  avoid: string;
}

export const pathOrder: PathId[] = ["knowledge", "workflow", "vendors", "connected"];
export const paths: Record<PathId, PathContent> = {
  knowledge: {
    id: "knowledge",
    name: "Company Knowledge Hub",
    tagline:
      "Connect documents to the conversations, decisions, and owners that give them meaning.",
    examples: [
      "Searchable procedures",
      "Linked meeting notes",
      "Decision history",
      "Role-based access",
    ],
    dashboard: {
      timeCommitment: "One process owner",
      speedToMarket: "Scoped pilot first",
      technicalComplexity: "Depends on integrations",
      scalability: "Expand after validation",
      customerAcquisition: "Permissions + recovery",
    },
    firstTarget: "Find one approved answer with its source and owner.",
    nextMoves: [
      "Choose one team and the 20 questions they ask most.",
      "Connect approved source documents and assign a content owner.",
      "Pilot search with source links and measure time spent finding answers.",
    ],
    avoid: "Avoid importing every file before you establish permissions and content ownership.",
  },
  workflow: {
    id: "workflow",
    name: "Workflow & Accountability System",
    tagline: "Turn requests, meetings, and decisions into owned tasks with clear handoffs.",
    examples: ["Request intake", "Approval queues", "Task owners", "Status notifications"],
    dashboard: {
      timeCommitment: "One process owner",
      speedToMarket: "Scoped pilot first",
      technicalComplexity: "Depends on integrations",
      scalability: "Expand after validation",
      customerAcquisition: "Permissions + recovery",
    },
    firstTarget: "Run one recurring workflow from request to completion.",
    nextMoves: [
      "Map one frequently delayed process with its owner.",
      "Define each handoff, approval, and exception before automating it.",
      "Pilot with one team and track cycle time and missed handoffs.",
    ],
    avoid:
      "Avoid automating an unclear process or removing human approval from sensitive decisions.",
  },
  vendors: {
    id: "vendors",
    name: "Vendor & Client Operations Portal",
    tagline:
      "Keep agreements, updates, commitments, and next steps together for every business relationship.",
    examples: [
      "Agreement records",
      "Renewal reminders",
      "Update history",
      "Secure external access",
    ],
    dashboard: {
      timeCommitment: "One process owner",
      speedToMarket: "Scoped pilot first",
      technicalComplexity: "Depends on integrations",
      scalability: "Expand after validation",
      customerAcquisition: "Permissions + recovery",
    },
    firstTarget: "Track one relationship from agreement through its next commitment.",
    nextMoves: [
      "Choose one vendor or client workflow with frequent follow-up.",
      "Link its agreement, contacts, dates, and open commitments.",
      "Pilot scoped access and reminders, then measure response time.",
    ],
    avoid: "Avoid giving external users access to internal notes or unrelated relationships.",
  },
  connected: {
    id: "connected",
    name: "Connected Operations Workspace",
    tagline:
      "Give your business a shared view of decisions, work, and dependencies across existing tools.",
    examples: [
      "Cross-team status",
      "Linked decisions",
      "System integrations",
      "Exception tracking",
    ],
    dashboard: {
      timeCommitment: "One process owner",
      speedToMarket: "Scoped pilot first",
      technicalComplexity: "Depends on integrations",
      scalability: "Expand after validation",
      customerAcquisition: "Permissions + recovery",
    },
    firstTarget: "See the status, owner, and next action for one cross-team process.",
    nextMoves: [
      "Map one process across the tools and teams it touches.",
      "Choose the source of truth for each record and define access.",
      "Connect a small workflow first; test failures, exports, and recovery.",
    ],
    avoid:
      "Avoid replacing your entire software stack or building a dashboard without accountable next actions.",
  },
};
