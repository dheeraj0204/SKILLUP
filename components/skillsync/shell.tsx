"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  Check,
  ChevronDown,
  Command,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
  UserRound,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { demoNotice, navItems, readRole, roleLabels, type Role, saveRole, appTitle, profile, opportunities, courses } from "@/lib/skillsync/data"

export function SkillSyncMark({ compact = false, splash = false, className = "" }: { compact?: boolean, splash?: boolean, className?: string }) {
  const iconRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!iconRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    iconRef.current.style.transform = `rotateX(${ -y * 30 }deg) rotateY(${ x * 30 }deg)`;
  };

  const handleMouseLeave = () => {
    if (iconRef.current) iconRef.current.style.transform = '';
  };

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-[14px] px-2 py-1.5 select-none [perspective:700px] ${className}`} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      aria-label="SkillSync home"
    >
      <div 
        ref={iconRef} 
        className={`relative [transform-style:preserve-3d] [transform:rotateX(0deg)_rotateY(0deg)] transition-transform duration-150 ease-out animate-[ss-float_3.4s_ease-in-out_infinite] ${splash ? 'w-24 h-24' : compact ? 'w-8 h-8' : 'w-[52px] h-[52px]'}`}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#d4ff6b_0%,_#a6e22e_45%,_#6f9c1a_100%)] [transform:translateZ(0px)]"></div>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#d4ff6b_0%,_#a6e22e_45%,_#6f9c1a_100%)] [transform:translateZ(-3px)] brightness-[0.92]"></div>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#d4ff6b_0%,_#a6e22e_45%,_#6f9c1a_100%)] [transform:translateZ(-6px)] brightness-[0.82]"></div>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#d4ff6b_0%,_#a6e22e_45%,_#6f9c1a_100%)] [transform:translateZ(-9px)] brightness-[0.7]"></div>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#d4ff6b_0%,_#a6e22e_45%,_#6f9c1a_100%)] [transform:translateZ(-12px)] brightness-[0.55] shadow-[0_14px_24px_rgba(0,0,0,0.45)]"></div>
        <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(4px)]">
          <svg viewBox="0 0 24 24" fill="#12140f" className={`${splash ? 'w-12 h-12' : compact ? 'w-4 h-4' : 'w-[26px] h-[26px]'} drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]`} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z"/>
          </svg>
        </div>
      </div>
      {!compact && (
        <div className={`${splash ? 'text-6xl' : 'text-[28px]'} font-bold tracking-[-0.01em] [transform-style:preserve-3d]`}>
          <span className="text-[#f5f6f5]">Skill</span><span className="text-[#a6e22e] [text-shadow:0_1px_0_#6f9c1a,_0_2px_6px_rgba(166,226,46,0.35)]">Sync</span>
        </div>
      )}
    </Link>
  )
}

const roleLinks: Record<Role, string> = { student: "/student/dashboard", industry: "/industry/dashboard", faculty: "/faculty/dashboard", institution: "/institution/dashboard", admin: "/admin/dashboard" }

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [role, setRole] = useState<Role>("student")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchResults = useMemo(() => { const query = searchQuery.trim().toLowerCase(); if (!query) return []; return [...opportunities.map((item) => ({ title: item.title, detail: `${item.company} · ${item.location}`, href: "/explore" })), ...courses.map((item) => ({ title: item.title, detail: `${item.provider} · ${item.level}`, href: "/learning" }))].filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(query)).slice(0, 6) }, [searchQuery])
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true) } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey) }, [])
  useEffect(() => setRole(readRole()), [])
  const current = useMemo(() => roleLinks[role], [role])
  const switchRole = (next: Role) => { saveRole(next); setRole(next); router.push(roleLinks[next]) }
  return <div className="min-h-screen bg-[#08070d] text-white">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/8 bg-[#0b0912]/80 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      <SkillSyncMark />
      <div className="mt-10 rounded-2xl border border-lime-200/10 bg-lime-300/[0.06] p-3"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-200/70">{roleLabels[role]} workspace</p><p className="mt-2 text-xs leading-5 text-white/55">{demoNotice}</p></div>
      <nav className="mt-8 flex flex-col gap-1" aria-label="Workspace navigation">{navItems.map(([label, href, icon]) => <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${pathname === href ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/[0.05] hover:text-white"}`}><span className="w-5 text-center text-base">{icon}</span>{label}</Link>)}</nav>
      <div className="mt-auto flex flex-col gap-1"><Link href="/settings" className="rounded-xl px-3 py-2.5 text-sm text-white/50 hover:bg-white/[0.05] hover:text-white">Settings</Link><Link href="/help" className="rounded-xl px-3 py-2.5 text-sm text-white/50 hover:bg-white/[0.05] hover:text-white">Help center</Link><div className="mt-3 flex items-center gap-3 border-t border-white/8 pt-4"><span className="flex size-9 items-center justify-center rounded-full bg-lime-300/10 text-xs font-semibold text-lime-100">{profile.initials}</span><div className="min-w-0"><p className="truncate text-sm text-white">{profile.name}</p><p className="truncate text-xs text-white/40">{roleLabels[role]}</p></div><button onClick={() => { window.localStorage.removeItem("skillsync-session"); window.sessionStorage.removeItem("skillsync-session"); router.push("/login") }} className="ml-auto text-white/35 hover:text-white" aria-label="Sign out"><LogOut className="size-4" /></button></div></div>
    </aside>
    <div className="lg:pl-64">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#08070d]/75 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-5 sm:px-8"><button className="rounded-xl p-2 text-white/60 hover:bg-white/10 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">{mobileOpen ? <X /> : <Menu />}</button><div className="lg:hidden"><SkillSyncMark /></div><button onClick={() => setSearchOpen(true)} className="ml-auto flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2 text-left text-sm text-white/35 sm:max-w-sm"><Search className="size-4" /><span className="truncate">Search roles, skills, people...</span><kbd className="ml-auto hidden rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/30 sm:block">⌘ K</kbd></button>
      <button onClick={() => { document.documentElement.classList.toggle("light") }} className="relative rounded-xl p-2 text-white/55 hover:bg-white/10" aria-label="Toggle theme"><Sun className="size-4" /></button>
      <Link href="/notifications" className="relative rounded-xl p-2 text-white/55 hover:bg-white/10" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-lime-300" /></Link><div className="relative hidden sm:block"><button className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-white/70 hover:bg-white/10" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen} aria-haspopup="menu" aria-label="Open profile menu"><span className="flex size-7 items-center justify-center rounded-full bg-lime-300/10 text-xs text-lime-100">{profile.initials}</span><ChevronDown className={`size-3 text-white/40 transition-transform ${profileOpen ? "rotate-180" : ""}`} /></button>{profileOpen && <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-white/10 bg-[#15121f] p-2 shadow-2xl backdrop-blur-xl" role="menu"><div className="border-b border-white/10 px-3 py-2"><p className="text-sm font-medium text-white">{profile.name}</p><p className="text-xs text-white/40">{roleLabels[role]}</p></div><button role="menuitem" onClick={() => { window.localStorage.removeItem("skillsync-session"); window.sessionStorage.removeItem("skillsync-session"); setProfileOpen(false); router.push("/login") }} className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-white/70 hover:bg-white/[0.08] hover:text-white"><LogOut className="size-4" />Log out</button></div>}</div></div></header>
      {mobileOpen && <div className="fixed inset-0 z-20 bg-[#0b0912] p-6 pt-24 lg:hidden"><div className="flex items-center justify-between"><SkillSyncMark /><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button></div><nav className="mt-10 flex flex-col gap-2">{navItems.map(([label, href]) => <Link onClick={() => setMobileOpen(false)} key={href} href={href} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 text-lg">{label}</Link>)}</nav></div>}
      <main>{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-2xl border border-white/10 bg-[#12101b]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">{navItems.slice(0, 5).map(([label, href, icon]) => <Link key={href} href={href} className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] ${pathname === href ? "text-lime-200" : "text-white/40"}`}><span className="text-base">{icon}</span>{label}</Link>)}</nav>
      {searchOpen && <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-5 pt-24 backdrop-blur-sm" onClick={() => setSearchOpen(false)}><div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#15121f] p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-center gap-3 border-b border-white/10 pb-4"><Search className="size-5 text-white/40" /><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="w-full bg-transparent text-white outline-none placeholder:text-white/35" placeholder="Search roles, skills, people..." /><kbd className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/35">ESC</kbd></div><div className="mt-4 flex flex-col gap-2">{searchQuery ? searchResults.length ? searchResults.map((result) => <Link key={`${result.href}-${result.title}`} onClick={() => { setSearchOpen(false); setSearchQuery("") }} href={result.href} className="flex items-center gap-3 rounded-2xl p-3 hover:bg-white/[0.06]"><Command className="size-4 text-lime-200" /><span><b className="font-medium">{result.title}</b><span className="block text-xs text-white/40">{result.detail}</span></span></Link>) : <p className="p-3 text-sm text-white/40">No matching roles, courses, or skills yet.</p> : <><Link onClick={() => setSearchOpen(false)} href="/explore" className="flex items-center gap-3 rounded-2xl p-3 hover:bg-white/[0.06]"><Command className="size-4 text-lime-200" /><span><b className="font-medium">Explore opportunities</b><span className="block text-xs text-white/40">Find roles matched to your skills</span></span></Link><Link onClick={() => setSearchOpen(false)} href="/skills" className="flex items-center gap-3 rounded-2xl p-3 hover:bg-white/[0.06]"><UserRound className="size-4 text-violet-200" /><span><b className="font-medium">Your skill profile</b><span className="block text-xs text-white/40">See strengths and next steps</span></span></Link></>}</div></div></div>}
    </div>
  </div>
}

export { roleLinks }
export function AppButton({ children, variant = "primary", ...props }: React.ComponentProps<typeof Button> & { variant?: "primary" | "secondary" }) { return <Button {...props} className={variant === "primary" ? "rounded-xl bg-lime-300 text-black hover:bg-lime-200" : "rounded-xl border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"}>{children}</Button> }
export function HomeIcon() { return <Home className="size-4" /> }
export { appTitle }
