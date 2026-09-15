"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  Users,
  Zap,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppButton, AppShell } from "@/components/skillsync/shell";
import { Plasma } from "@/components/plasma";
import {
  activity,
  dashboardForRole,
  courses,
  getMatchLabel,
  industryMetrics,
  facultyMetrics,
  institutionMetrics,
  adminMetrics,
  metrics,
  opportunities,
  profile,
  skillBars,
  type Role,
  readRole,
  roleLabels,
  roleColors,
} from "@/lib/skillsync/data";

const roleMetrics: Record<Role, typeof metrics> = {
  student: metrics,
  industry: industryMetrics,
  faculty: facultyMetrics,
  institution: institutionMetrics,
  admin: adminMetrics,
};

function MetricCard({
  label,
  value,
  helper,
  trend,
}: {
  label: string;
  value: string;
  helper: string;
  trend?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
      <p className="text-xs text-white/42">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold tracking-[-.05em]">{value}</p>
        {trend && <span className="text-xs text-lime-200">{trend}</span>}
      </div>
      <p className="mt-2 text-xs text-white/35">{helper}</p>
    </div>
  );
}

function AnimatedBar({ width, colorClass }: { width: number, colorClass: string }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(width), 100);
    return () => clearTimeout(t);
  }, [width]);
  return <div className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`} style={{ width: `${w}%` }} />;
}

function StudentOverview() {
  const [saved, setSaved] = useState<string[]>([]);
  const [heights, setHeights] = useState(Array(12).fill(0));
  const [progress, setProgress] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [matchPercent, setMatchPercent] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setSaved(JSON.parse(localStorage.getItem("skillsync-saved") || "[]"));

    // Animate graph
    const timeout = setTimeout(() => {
      setHeights([30, 42, 38, 55, 48, 72, 64, 80, 69, 88, 76, 94]);
    }, 100);

    // Animate numbers
    let startTimestamp: number;
    const duration = 1500;
    const animateNumbers = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progressRatio = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeRatio = 1 - Math.pow(1 - progressRatio, 3); // ease out cubic
      setProgress(Math.round(68 * easeRatio));
      setLessons(Math.round(8 * easeRatio));
      setMatchPercent(Math.round(82 * easeRatio));
      if (progressRatio < 1) requestAnimationFrame(animateNumbers);
    };
    requestAnimationFrame(animateNumbers);

    // Welcome sound on mount
    const hasWelcomed = sessionStorage.getItem("welcomed_maya");
    if (!hasWelcomed) {
      if ('speechSynthesis' in window) {
        setTimeout(() => {
          const msg = new SpeechSynthesisUtterance("Welcome Maya! Login successful.");
          window.speechSynthesis.speak(msg);
        }, 500);
      }
      setShowWelcome(true);
      sessionStorage.setItem("welcomed_maya", "true");
      setTimeout(() => setShowWelcome(false), 5000);
    }

    return () => clearTimeout(timeout);
  }, []);

  const toggle = (id: string) => {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    localStorage.setItem("skillsync-saved", JSON.stringify(next));
  };
  
  const researchCourseUrl = courses.find(c => c.id === "course-1")?.url || "#";

  return (
    <>
      {showWelcome && (
        <div className="mb-6 rounded-3xl border border-lime-300/30 bg-lime-300/10 p-4 text-center animate-in fade-in zoom-in duration-700">
          <h2 className="text-2xl font-bold text-lime-200 animate-pulse">🎉 WELCOME MAYA! 🎉</h2>
          <p className="text-sm text-lime-100/70">Login successful</p>
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <div className="rounded-3xl border border-lime-200/15 bg-gradient-to-br from-lime-300/[0.12] via-white/[0.045] to-violet-500/[0.1] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both">
              <p className="text-xs uppercase tracking-[.2em] text-lime-200/70">
                Your next best move
              </p>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-[-.05em] sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Your next opportunity is closer than you think.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/55">
                Complete your accessibility skill gap. You are already a strong match for product teams. One focused project could unlock 6 more opportunities.
              </p>
            </div>
            <div className="hidden size-16 items-center justify-center rounded-2xl border border-lime-200/20 bg-lime-300/10 text-2xl font-bold text-lime-100 sm:flex transition-all duration-700">
              {matchPercent}%
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <AppButton asChild>
              <Link href="/skills">
                View skill gaps <ArrowUpRight data-icon="inline-end" />
              </Link>
            </AppButton>
            <AppButton asChild variant="secondary">
              <Link href="/assessment">Take assessment</Link>
            </AppButton>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/42">This week</p>
              <p className="mt-2 text-2xl font-semibold">+12%</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200">
              <Zap className="size-4" />
            </div>
          </div>
          <div className="mt-6 flex h-24 items-end gap-1.5">
            {heights.map(
              (height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-md transition-all duration-1000 ease-out ${i === 11 ? "bg-lime-300" : "bg-violet-400/40"}`}
                  style={{ height: `${height}%` }}
                />
              ),
            )}
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-white/30">
            <span>Mon</span>
            <span>Today</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium">Recommended for you</p>
              <p className="mt-1 text-sm text-white/40">
                Personalized from your skills and momentum
              </p>
            </div>
            <Link href="/explore" className="text-sm text-lime-200">
              View all
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {opportunities.slice(0, 3).map((opportunity) => (
              <div
                key={opportunity.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:flex-row sm:items-center"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-white/70">
                  <BriefcaseBusiness className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium">
                      {opportunity.title}
                    </p>
                    <span className="rounded-full border border-lime-200/15 bg-lime-300/10 px-2 py-0.5 text-[10px] text-lime-200">
                      {opportunity.match}% match
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">
                    {opportunity.company} · {opportunity.location}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {opportunity.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-white/[0.06] px-2 py-1 text-[10px] text-white/45"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const msg = new SpeechSynthesisUtterance(`Role: ${opportunity.title} at ${opportunity.company}. Match score: ${opportunity.match}%. Skills needed: ${opportunity.skills.join(", ")}`);
                          window.speechSynthesis.speak(msg);
                        }
                      }}
                      className="rounded-lg p-2 text-white/30 hover:text-white"
                      title="Read aloud"
                    >
                      <Volume2 className="size-4" />
                    </button>
                    <button
                      onClick={() => toggle(opportunity.id)}
                      className={`rounded-lg p-2 ${saved.includes(opportunity.id) ? "text-lime-200" : "text-white/30 hover:text-white"}`}
                      aria-label="Save opportunity"
                    >
                      <Bookmark
                        className="size-4"
                        fill={
                          saved.includes(opportunity.id) ? "currentColor" : "none"
                        }
                      />
                    </button>
                  </div>
                  <Link
                    href={`/opportunities/${opportunity.id}`}
                    className="text-xs text-white/50 hover:text-white"
                  >
                    View role <ChevronRight className="ml-1 inline size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium">Skill profile</p>
              <p className="mt-1 text-sm text-white/40">
                Your strongest signals
              </p>
            </div>
            <Link href="/skills" className="text-sm text-lime-200">
              Edit
            </Link>
          </div>
          <div className="mt-6 flex flex-col gap-5">
            {skillBars.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs">
                  <span className="text-white/65">{skill.name}</span>
                  <span className="text-white/35">{skill.value}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10">
                  <AnimatedBar width={skill.value} colorClass={skill.color} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="flex items-center justify-between">
            <p className="font-medium">Recent activity</p>
            <Link href="/applications" className="text-sm text-lime-200">
              See tracker
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {activity.map(([title, subtitle, time, color]) => (
              <div key={title} className="flex items-start gap-3">
                <span
                  className={`mt-1.5 size-2 rounded-full ${color === "lime" ? "bg-lime-300" : color === "violet" ? "bg-violet-300" : "bg-sky-300"}`}
                />
                <div className="flex-1">
                  <p className="text-sm text-white/75">{title}</p>
                  <p className="mt-1 text-xs text-white/35">{subtitle}</p>
                </div>
                <span className="text-xs text-white/30">{time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="flex items-center justify-between">
            <p className="font-medium">Continue learning</p>
            <Link href="/learning" className="text-sm text-lime-200">
              Library
            </Link>
          </div>
          <div className="mt-4 rounded-2xl border border-violet-300/10 bg-violet-300/[0.06] p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-300/10 text-violet-200">
                <GraduationCap className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Research-led Product Design
                </p>
                <p className="mt-1 text-xs text-white/35">
                  {lessons} of 12 lessons complete
                </p>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-violet-300 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <a
              href={researchCourseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-xs text-violet-200"
            >
              Continue lesson <ArrowUpRight className="ml-1 size-3" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function GenericOverview({ role }: { role: Role }) {
  const context = dashboardForRole(role);
  const [heights, setHeights] = useState(Array(12).fill(0));
  
  useEffect(() => {
    const t = setTimeout(() => setHeights([40, 48, 43, 62, 58, 75, 70, 84, 78, 92, 88, 100]), 100);
    return () => clearTimeout(t);
  }, []);

  const extra =
    role === "industry" ? (
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Candidate pipeline</p>
            <p className="mt-1 text-sm text-white/40">
              Your most relevant profiles this week
            </p>
          </div>
          <Link href="/industry/applicants" className="text-sm text-lime-200">
            View applicants
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["Maya Chen", "Eli Brooks", "Sofia Patel"].map((name, i) => (
            <div
              key={name}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-violet-300/10 text-xs text-violet-100">
                {name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </span>
              <p className="mt-3 text-sm font-medium">{name}</p>
              <p className="mt-1 text-xs text-white/40">
                {[94, 89, 84][i]}% match
              </p>
              <button className="mt-4 w-full rounded-xl border border-white/10 py-2 text-xs text-white/55 hover:bg-white/10">
                Review profile
              </button>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
        <p className="font-medium">Network activity</p>
        <p className="mt-1 text-sm text-white/40">
          A snapshot of momentum across your workspace
        </p>
        <div className="mt-6 flex h-40 items-end gap-2">
          {heights.map(
            (height, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-violet-400/35 to-lime-300/70 transition-all duration-1000 ease-out"
                style={{ height: `${height}%` }}
              />
            ),
          )}
        </div>
      </div>
    );
  return (
    <>
      <div className="rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-500/[0.18] via-white/[0.045] to-sky-400/[0.08] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[.2em] text-violet-200/80">
          {context.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-.05em] sm:text-5xl">
          {context.title}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
          {context.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <AppButton>
            {context.primary} <ArrowUpRight data-icon="inline-end" />
          </AppButton>
          <AppButton variant="secondary">
            <Search data-icon="inline-start" /> Explore network
          </AppButton>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {roleMetrics[role].map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      {extra}
    </>
  );
}

export function DashboardPage() {
  const [role, setRole] = useState<Role>("student");
  useEffect(() => setRole(readRole()), []);
  const context = dashboardForRole(role);
  return (
    <AppShell>
      <div className="relative isolate min-h-full overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-35"
        >
          <Plasma
            color="#9d7cff"
            speed={0.7}
            scale={1.35}
            opacity={0.75}
            mouseInteractive={false}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_18%,rgba(165,255,59,0.08),transparent_30%),linear-gradient(180deg,rgba(8,7,14,0.18),rgba(8,7,14,0.7))]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 pb-28 sm:px-8 lg:py-10 lg:pb-10">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-lime-200">{context.eyebrow}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] sm:text-4xl">
                {context.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/35">
              <CheckCircle2 className="size-4 text-lime-200" /> All systems
              clear
            </div>
          </div>
          {role === "student" ? (
            <StudentOverview />
          ) : (
            <GenericOverview role={role} />
          )}
        </div>
      </div>
    </AppShell>
  );
}
