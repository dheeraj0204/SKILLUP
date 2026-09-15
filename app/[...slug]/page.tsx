"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { AppButton, AppShell } from "@/components/skillsync/shell";
import {
  courses,
  messages,
  skillBars,
  skillsGap,
  applicationStages,
} from "@/lib/skillsync/data";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { DashboardPage } from "@/components/skillsync/dashboard";

function CircularProgress({ percentage, colorClass }: { percentage: number, colorClass: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let startTimestamp: number;
    const duration = 1500;
    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progressRatio = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeRatio = 1 - Math.pow(1 - progressRatio, 3);
      setVal(Math.round(percentage * easeRatio));
      if (progressRatio < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [percentage]);
  
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (val / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center size-16">
      <svg className="size-full -rotate-90 transform" viewBox="0 0 64 64">
        {/* Background circle */}
        <circle cx="32" cy="32" r={radius} className="fill-none stroke-white/10" strokeWidth="6" />
        {/* Progress circle */}
        <circle 
          cx="32" cy="32" r={radius} 
          className={`fill-none ${colorClass}`} 
          strokeWidth="6" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" 
          style={{ filter: 'drop-shadow(0 0 8px currentColor)', transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[13px] font-bold text-white shadow-black drop-shadow-md">{val}%</span>
      </div>
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

const titles: Record<string, [string, string]> = {
  applications: [
    "Application tracker",
    "See every opportunity moving forward.",
  ],
  learning: ["Learning paths", "Build the skills your next move needs."],
  messages: ["Messages", "Keep the right conversations moving."],
  profile: ["Your profile", "The context behind your skills and momentum."],
  skills: ["Skill profile", "Turn strengths into your next advantage."],
  assessment: [
    "Skill assessment",
    "A quick check-in to sharpen your recommendations.",
  ],
  saved: ["Saved opportunities", "Your shortlist, ready when you are."],
  settings: ["Settings", "Make SkillSync feel like yours."],
  help: ["Help center", "Find a clearer answer, faster."],
  industry: ["Industry workspace", "Build your next great team."],
  faculty: ["Faculty workspace", "Make learning more connected."],
  institution: ["Institution workspace", "See readiness at a glance."],
  opportunities: [
    "Opportunity details",
    "A closer look at a role matched to you.",
  ],
};

export default function CatchAllPage() {
  const params = useParams<{ slug: string[] }>();
  const key = params.slug?.[0] || "profile";
  const routeRole = [
    "student",
    "industry",
    "faculty",
    "institution",
    "admin",
  ].includes(key);
  if (routeRole && params.slug?.[1] === "dashboard") return <DashboardPage />;
  const [title, subtitle] = titles[key] || [
    "Workspace",
    "Keep your momentum going.",
  ];
  const [isEditing, setIsEditing] = useState(false);
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-8 pb-28 sm:px-8 lg:py-10 lg:pb-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-lime-200">SkillSync workspace</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-.05em]">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/45">{subtitle}</p>
          </div>
          <AppButton>
            <Plus data-icon="inline-start" /> Add new
          </AppButton>
        </div>
        {key === "applications" && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="font-medium">Product Design Intern</p>
              <span className="rounded-full border border-lime-200/15 bg-lime-300/10 px-2.5 py-1 text-xs text-lime-200">
                Viewed
              </span>
            </div>
            <p className="mt-2 text-sm text-white/40">
              Northstar Labs · Remote · Applied 2 days ago
            </p>
            <div className="mt-8 grid grid-cols-5 gap-2">
              {applicationStages.map((stage, index) => (
                <div key={stage}>
                  <div
                    className={`h-1.5 rounded-full ${index < 2 ? "bg-lime-300" : "bg-white/10"}`}
                  />
                  <p className="mt-2 text-[10px] text-white/35">{stage}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {key === "learning" && (
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-300/10 text-violet-200">
                  <GraduationCap className="size-5" />
                </div>
                <h2 className="mt-7 font-medium">{course.title}</h2>
                <p className="mt-2 text-xs text-white/40">
                  {course.provider} · {course.level}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <CircularProgress percentage={course.progress} colorClass={course.color === 'lime' ? 'stroke-lime-300 text-lime-300' : course.color === 'orange' ? 'stroke-orange-400 text-orange-400' : 'stroke-violet-300 text-violet-300'} />
                  <span className="text-xs text-white/35">{course.lessons} lessons</span>
                </div>
                {course.url ? (
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center rounded-xl border border-white/10 py-2.5 text-sm text-white/65 hover:bg-white/10"
                  >
                    {course.progress ? "Continue course" : "Start course"}
                  </a>
                ) : (
                  <button className="mt-6 w-full rounded-xl border border-white/10 py-2.5 text-sm text-white/65 hover:bg-white/10">
                    {course.progress ? "Continue course" : "Start course"}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
        {key === "messages" && (
          <div className="mt-8 grid gap-3">
            {messages.map((message) => (
              <Link
                href="#"
                key={message.name}
                className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5 hover:border-white/20"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-sky-300/10 text-sm text-sky-100">
                  {message.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{message.name}</p>
                  <p className="mt-1 text-xs text-white/40">{message.role}</p>
                  <p className="mt-3 truncate text-sm text-white/55">
                    {message.preview}
                  </p>
                </div>
                <span className="text-xs text-white/30">{message.time}</span>
                <MessageCircle className="size-4 text-lime-200" />
              </Link>
            ))}
          </div>
        )}
        {key === "skills" && (
          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <p className="font-medium">Current strengths</p>
              <div className="mt-6 flex flex-col gap-6">
                {skillBars.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-white/40">{skill.value}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <AnimatedBar width={skill.value} colorClass={skill.color} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-lime-200/15 bg-lime-300/[0.05] p-6">
              <p className="font-medium">Next best skills</p>
              <p className="mt-2 text-sm leading-6 text-white/45">
                Small, focused progress can unlock more of the network.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {skillsGap.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-lime-200">+{skill.gap} pts</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10">
                      <AnimatedBar width={skill.current} colorClass="bg-lime-300" />
                    </div>
                  </div>
                ))}
              </div>
              <AppButton className="mt-7">
                Start a learning path <ArrowUpRight data-icon="inline-end" />
              </AppButton>
            </div>
          </div>
        )}
        {key === "profile" && (
          <div className="mt-8 grid gap-4 lg:grid-cols-[.7fr_1.3fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-lime-300/10 text-xl text-lime-100">
                MC
              </span>
              {isEditing ? (
                <div className="mt-5 space-y-4">
                  <input
                    type="text"
                    defaultValue="Maya Chen"
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white outline-none focus:border-lime-200/50"
                  />
                  <input
                    type="text"
                    defaultValue="Product design student"
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white outline-none focus:border-lime-200/50"
                  />
                  <textarea
                    defaultValue="Curious about the moments where research, systems, and storytelling meet."
                    className="min-h-24 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white outline-none focus:border-lime-200/50"
                  />
                  <AppButton
                    className="w-full"
                    onClick={() => setIsEditing(false)}
                  >
                    Save changes
                  </AppButton>
                </div>
              ) : (
                <>
                  <h2 className="mt-5 text-2xl font-medium">Maya Chen</h2>
                  <p className="mt-1 text-sm text-white/45">
                    Product design student
                  </p>
                  <p className="mt-5 text-sm leading-6 text-white/45">
                    Curious about the moments where research, systems, and
                    storytelling meet.
                  </p>
                  <AppButton
                    variant="secondary"
                    className="mt-7 w-full"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit profile
                  </AppButton>
                </>
              )}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <div className="flex items-center justify-between">
                <p className="font-medium">Profile strength</p>
                <span className="text-2xl font-semibold text-lime-200">
                  82%
                </span>
              </div>
              <div className="mt-5 h-2 rounded-full bg-white/10">
                <div className="h-full w-[82%] rounded-full bg-lime-300" />
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["About you", "Skills", "Projects", "Preferences"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/8 p-4"
                    >
                      <CheckCircle2
                        className={`size-4 ${i < 3 ? "text-lime-200" : "text-white/25"}`}
                      />
                      <span className="text-sm text-white/65">{item}</span>
                      <span className="ml-auto text-xs text-white/35">
                        {i < 3 ? "Done" : "Add"}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
        {["industry", "faculty", "institution"].includes(key) && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "People to connect with",
              "Active projects",
              "Upcoming moments",
            ].map((item, i) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-violet-300/10 text-violet-200">
                  {i === 0 ? (
                    <Users className="size-4" />
                  ) : i === 1 ? (
                    <Sparkles className="size-4" />
                  ) : (
                    <Clock3 className="size-4" />
                  )}
                </span>
                <p className="mt-7 text-3xl font-semibold">{[42, 18, 8][i]}</p>
                <p className="mt-1 text-sm text-white/45">{item}</p>
              </div>
            ))}
          </div>
        )}
        {key === "settings" && (
          <div className="mt-8 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <div className="flex flex-col gap-6">
              <label className="flex items-center justify-between gap-4">
                <span>
                  <span className="block text-sm font-medium">
                    Weekly recommendations
                  </span>
                  <span className="mt-1 block text-xs text-white/40">
                    Get a short, focused list of next steps.
                  </span>
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="size-4 accent-lime-300"
                />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>
                  <span className="block text-sm font-medium">
                    Profile visibility
                  </span>
                  <span className="mt-1 block text-xs text-white/40">
                    Let relevant partners discover your profile.
                  </span>
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="size-4 accent-lime-300"
                />
              </label>
              <AppButton>Save preferences</AppButton>
            </div>
          </div>
        )}
        {![
          "applications",
          "learning",
          "messages",
          "skills",
          "profile",
          "settings",
          "industry",
          "faculty",
          "institution",
        ].includes(key) && (
          <div className="mt-8 rounded-3xl border border-dashed border-white/15 p-12 text-center">
            <p className="text-xl font-medium">
              A clearer next step starts here.
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/42">
              Explore the demo workspace, connect with the network, and build
              momentum one useful action at a time.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center gap-2 text-sm text-lime-200"
            >
              Back to overview <ArrowUpRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}
