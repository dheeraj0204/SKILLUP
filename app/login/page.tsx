"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { SkillSyncMark } from "@/components/skillsync/shell";
import {
  roleDescriptions,
  roleLabels,
  type Role,
  saveRole,
} from "@/lib/skillsync/data";

const roles: Role[] = [
  "student",
  "industry",
  "faculty",
  "institution",
  "admin",
];
const rolePaths: Record<Role, string> = {
  student: "/student/dashboard",
  industry: "/industry/dashboard",
  faculty: "/faculty/dashboard",
  institution: "/institution/dashboard",
  admin: "/admin/dashboard",
};

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("maya@skillsync.demo");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("skillsync-session"))
      router.replace(
        rolePaths[
          (window.localStorage.getItem("skillsync-role") as Role) || "student"
        ],
      );
  }, [router]);

  const enter = (event?: FormEvent) => {
    event?.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError(
        "Enter a valid email and a password with at least 4 characters.",
      );
      return;
    }
    saveRole(role);
    if (remember)
      window.localStorage.setItem(
        "skillsync-session",
        JSON.stringify({ email, role, loggedInAt: Date.now() }),
      );
    else
      window.sessionStorage.setItem(
        "skillsync-session",
        JSON.stringify({ email, role }),
      );
    router.push(rolePaths[role]);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-5 py-8 text-white">
      <div className="pointer-events-none absolute -left-24 top-12 size-72 animate-pulse rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-lime-300/10 blur-3xl" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[.9fr_1.1fr]">
        <section className="hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-violet-500/20 via-transparent to-lime-300/10 p-10 lg:flex">
          <div>
            <SkillSyncMark />
            <div className="mt-24">
              <p className="text-sm text-lime-200 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
                Skills meet opportunities.
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-.07em] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 fill-mode-both">
                Make your next move make sense.
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/50 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
                A shared skills network for learning, opportunity, and better
                work.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/55">
            <p className="flex items-center gap-2">
              <Check className="size-4 text-lime-200" /> Demo-ready role
              workspaces
            </p>
            <p className="flex items-center gap-2">
              <Check className="size-4 text-lime-200" /> Your changes persist in
              this browser
            </p>
          </div>
        </section>
        <section className="p-6 sm:p-10">
          <div className="lg:hidden">
            <SkillSyncMark />
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-lime-300 text-black shadow-[0_0_30px_rgba(214,255,87,.18)]">
              <Sparkles className="size-5" />
            </div>
            <p className="text-xs uppercase tracking-[.2em] text-white/35">
              Welcome back
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.05em]">
              Enter your workspace.
            </h2>
            <p className="mt-2 text-sm text-white/45">
              Use the demo account or choose a role to explore.
            </p>
          </div>
          <form onSubmit={enter} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm text-white/60">
              Email
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 focus-within:border-lime-200/50">
                <Mail className="size-4 text-white/35" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full bg-transparent py-3 text-white outline-none placeholder:text-white/25"
                  placeholder="you@example.com"
                />
              </div>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/60">
              Password
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 focus-within:border-lime-200/50">
                <LockKeyhole className="size-4 text-white/35" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent py-3 text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/35 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-white/45">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-lime-300"
                />{" "}
                Remember me
              </label>
              <button
                type="button"
                onClick={() =>
                  setError(
                    "Password reset is available in the demo after you choose a role.",
                  )
                }
                className="text-lime-200 hover:text-lime-100"
              >
                Forgot password?
              </button>
            </div>
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-300/20 bg-red-300/10 px-3 py-2 text-xs text-red-100"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-lime-300 px-4 py-3 font-medium text-black transition hover:-translate-y-0.5 hover:bg-lime-200 active:scale-[.98]"
            >
              Continue <ArrowRight className="size-4" />
            </button>
          </form>
          <div className="my-7 flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/25">
            <span className="h-px flex-1 bg-white/10" /> Demo role{" "}
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {roles.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded-xl border px-3 py-3 text-left transition ${role === item ? "border-lime-200/40 bg-lime-300/10 text-lime-100" : "border-white/10 bg-white/[0.03] text-white/50 hover:bg-white/[0.07]"}`}
              >
                <span className="block text-xs font-medium">
                  {roleLabels[item]}
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-white/35">
                  {roleDescriptions[item]}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/35">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() =>
                setError("Sign up is simulated in this hackathon demo.")
              }
              className="text-lime-200"
            >
              Sign up
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}
