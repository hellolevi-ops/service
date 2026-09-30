import type { TrackSlug } from "@/lib/site";

export type Track = {
  slug: TrackSlug;
  name: string;
  heroClaim: string;
  answerBlock: string;
  audienceFit: string[];
  audienceUnfit: string[];
  timeline: { title: string; detail: string; when: string }[];
  feeFramework: string;
  methods: string[];
  faq: { q: string; a: string }[];
  parentBlock: string;
};

export type CaseStudy = {
  slug: string;
  track: TrackSlug;
  title: string;
  backgroundTier: string;
  backgroundSummary: string;
  difficulty: string;
  strategy: string;
  execution: string;
  result: string;
  resultLevel: string;
  advisorSlug: string;
  authorized: boolean;
  status: "published" | "archived";
};

export type Advisor = {
  slug: string;
  name: string;
  years: number;
  tracks: TrackSlug[];
  methodOneLiner: string;
  acceptBooking: boolean;
  parentSyncNote: string;
  bio: string;
  caseSlugs: string[];
};

export type Article = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  answerBlock: string;
  body: string[];
  faq: { q: string; a: string }[];
  nextStops: { href: string; title: string; reason: string }[];
  publishedAt: string;
  socialHooks?: string;
};

export type EventItem = {
  slug: string;
  title: string;
  startAt: string;
  format: string;
  tracks: TrackSlug[];
  agenda: string;
  status: "published" | "upcoming" | "ended";
};

export type Playbook = {
  slug: string;
  track: TrackSlug;
  title: string;
  fit: string;
  unfit: string;
  steps: string[];
  diyCeiling: string;
  pitfalls: string[];
  ctaTool: string;
};
