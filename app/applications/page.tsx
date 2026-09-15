"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { AppShell } from "@/components/skillsync/shell"
import { applicationStages, opportunities, isApplied } from "@/lib/skillsync/data"

export default function ApplicationsPage() {
  const [ids, setIds] = useState<string[]>([])
  useEffect(() => setIds(opportunities.filter((item) => isApplied(item.id)).map((item) => item.id)), [])
  const applied = opportunities.filter((item) => ids.includes(item.id))
  return <AppShell><div className="mx-auto max-w-5xl px-5 py-8 pb-28 sm:px-8 lg:py-10 lg:pb-10"><p className="text-sm text-lime-200">Your progress</p><h1 className="mt-2 text-4xl font-semibold tracking-[-.05em]">My applications</h1><p className="mt-3 text-sm text-white/45">Track every opportunity from first click to next conversation.</p>{applied.length ? <div className="mt-8 flex flex-col gap-4">{applied.map((item) => <article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-200"><BriefcaseBusiness className="size-5" /></span><div><h2 className="font-medium">{item.title}</h2><p className="mt-1 text-sm text-white/40">{item.company} · {item.location}</p></div></div><span className="rounded-full border border-lime-200/20 bg-lime-300/10 px-3 py-1 text-xs text-lime-200">Under review</span></div><div className="mt-8 grid grid-cols-5 gap-2">{applicationStages.map((stage, index) => <div key={stage}><div className={`h-1.5 rounded-full ${index < 2 ? "bg-lime-300" : "bg-white/10"}`} /><p className="mt-2 text-[10px] text-white/35">{stage}</p></div>)}</div></article>)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-white/15 p-12 text-center"><CheckCircle2 className="mx-auto size-8 text-white/25" /><p className="mt-4 font-medium">No applications yet</p><p className="mt-2 text-sm text-white/40">Explore opportunities and submit your first application.</p><Link href="/explore" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-lime-300 px-4 py-2.5 text-sm font-medium text-black">Explore roles <ArrowUpRight className="size-4" /></Link></div>}</div></AppShell>
}
