export type Role = "student" | "industry" | "faculty" | "institution" | "admin"

export const roleLabels: Record<Role, string> = {
  student: "Student",
  industry: "Industry partner",
  faculty: "Faculty",
  institution: "Institution",
  admin: "Platform admin",
}

export const opportunities = [
  { id: "op-1", title: "Product Design Intern", company: "Northstar Labs", location: "Remote", type: "Internship", skills: ["Figma", "Research", "Prototyping"], match: 94, pay: "$24–28/hr", posted: "2d ago" },
  { id: "op-2", title: "Data Analytics Co-op", company: "Vertex Finance", location: "New York, NY", type: "Co-op", skills: ["Python", "SQL", "Tableau"], match: 88, pay: "$31/hr", posted: "4d ago" },
  { id: "op-3", title: "Frontend Developer", company: "Aperture Health", location: "Hybrid · Boston", type: "Part-time", skills: ["React", "TypeScript", "Accessibility"], match: 86, pay: "$32/hr", posted: "1w ago" },
  { id: "op-4", title: "Brand Strategy Fellow", company: "Morrow Studio", location: "Remote", type: "Fellowship", skills: ["Storytelling", "Research", "Strategy"], match: 79, pay: "$1,800/mo", posted: "1w ago" },
]

export const courses = [
  { id: "course-1", title: "Research-led Product Design", provider: "SkillSync Academy", level: "Intermediate", progress: 68, lessons: 12, color: "violet", url: "https://www.coursera.org/professional-certificates/google-ux-design?utm_medium=sem&utm_source=gg&utm_campaign=b2c_india_google-ux-design_google_ftcof_professional-certificates_cx_dr_bau_gg_sem_pr_in_all_m_hyb_22-12_x&campaignid=19073950701&adgroupid=164950135412&device=c&keyword=courses%20for%20ux%20design&matchtype=p&network=g&devicemodel=&creativeid=693120373670&assetgroupid=&targetid=kwd-339228131946&extensionid=&placement=&gad_source=1&gad_campaignid=19073950701&gbraid=0AAAAADdKX6ZgprwLRceNC19r7Pat-Ev6H&gclid=CjwKCAjw2aPVBhBkEiwA0Cpttxsfr2AsNo6hwGFklnlcf3kkFXcoWaDVxl73vCy_0luKMzk3us77xRoCDkIQAvD_BwE" },
  { id: "course-2", title: "Python for Business Analytics", provider: "SkillSync Academy", level: "Beginner", progress: 24, lessons: 18, color: "lime", url: "https://www.coursera.org/professional-certificates/microsoft-python-developer?utm_medium=sem&utm_source=gg&utm_campaign=b2c_india_microsoft-python-developer_microsoft_ftcof_professional-certificates_cx_dr_bau_gg_sem_pr-ph_in_all_m_hyb_25-02_x&campaignid=22281803994&adgroupid=178054160520&device=c&keyword=python%20course&matchtype=p&network=g&devicemodel=&creativeid=734941246500&assetgroupid=&targetid=aud-2479827814927:kwd-4111158305&extensionid=&placement=&gad_source=1&gad_campaignid=22281803994&gbraid=0AAAAADdKX6Y_4fygwQcHi0kWQwRM6-z4z&gclid=CjwKCAjw2aPVBhBkEiwA0Cpttwwu4ZJOpXEWRfcDyHBYEWtc5b5uK2NMJHEB5hyaPbGHPnEzx9NK5RoC2RMQAvD_BwE" },
  { id: "course-3", title: "Portfolio Storytelling", provider: "Morrow Studio", level: "All levels", progress: 0, lessons: 8, color: "orange", url: "https://maven.com/p/a32cb9/master-storytelling-for-portfolio-presentation" },
]

export const notifications = [
  { id: "n-1", title: "You have a new 94% match", body: "Product Design Intern at Northstar Labs", time: "12 min ago", unread: true },
  { id: "n-2", title: "Application viewed", body: "Vertex Finance opened your application", time: "2 hours ago", unread: true },
  { id: "n-3", title: "Course milestone reached", body: "You completed 68% of Research-led Product Design", time: "Yesterday", unread: false },
]

export const metrics = [
  { label: "Profile strength", value: "82%", trend: "+12%", helper: "Keep building your portfolio" },
  { label: "Active applications", value: "4", trend: "+2", helper: "2 awaiting review" },
  { label: "Skill readiness", value: "76%", trend: "+8%", helper: "Above your cohort average" },
  { label: "Saved opportunities", value: "12", trend: "+5", helper: "3 closing this week" },
]

export const navItems = [
  ["Overview", "/dashboard", "⌂"], ["Explore", "/explore", "⌕"], ["Applications", "/applications", "↗"], ["Learning", "/learning", "◒"], ["Messages", "/messages", "◌"], ["Profile", "/profile", "◎"],
] as const

export const roleHighlights = [
  { title: "For students", text: "Turn your skills into the right opportunity.", bullets: ["AI-matched roles", "Skill gap guidance", "One profile, every application"] },
  { title: "For industry", text: "Meet the emerging talent built for your next challenge.", bullets: ["Role-ready candidates", "Structured shortlists", "Faster collaboration"] },
  { title: "For institutions", text: "Make every learner's path visible and actionable.", bullets: ["Cohort insights", "Placement readiness", "Industry partnerships"] },
]

export function getMatchLabel(score: number) {
  if (score >= 90) return "Excellent match"
  if (score >= 80) return "Strong match"
  return "Good match"
}

export function saveRole(role: Role) {
  if (typeof window !== "undefined") window.localStorage.setItem("skillsync-role", role)
}

export function readRole(): Role {
  if (typeof window === "undefined") return "student"
  return (window.localStorage.getItem("skillsync-role") as Role) || "student"
}

export function toggleSaved(id: string) {
  if (typeof window === "undefined") return false
  const saved = JSON.parse(window.localStorage.getItem("skillsync-saved") || "[]") as string[]
  const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
  window.localStorage.setItem("skillsync-saved", JSON.stringify(next))
  return next.includes(id)
}

export function isSaved(id: string) {
  if (typeof window === "undefined") return false
  return (JSON.parse(window.localStorage.getItem("skillsync-saved") || "[]") as string[]).includes(id)
}

export function createApplication(id: string) {
  if (typeof window === "undefined") return
  const applications = JSON.parse(window.localStorage.getItem("skillsync-applications") || "[]") as string[]
  if (!applications.includes(id)) window.localStorage.setItem("skillsync-applications", JSON.stringify([...applications, id]))
}

export function isApplied(id: string) {
  if (typeof window === "undefined") return false
  return (JSON.parse(window.localStorage.getItem("skillsync-applications") || "[]") as string[]).includes(id)
}

export function dashboardForRole(role: Role) {
  if (role === "industry") return { eyebrow: "Recruiter workspace", title: "Build your next great team.", description: "Discover candidates with the skills, context, and curiosity to move your work forward.", primary: "Post an opportunity" }
  if (role === "faculty") return { eyebrow: "Faculty workspace", title: "Make learning more connected.", description: "Track learner progress, surface collaboration opportunities, and bring industry context into the classroom.", primary: "Explore collaborations" }
  if (role === "institution") return { eyebrow: "Institution workspace", title: "See readiness at a glance.", description: "Turn skills data into better programs, stronger partnerships, and more confident outcomes.", primary: "View placement insights" }
  if (role === "admin") return { eyebrow: "Platform overview", title: "Keep the ecosystem moving.", description: "Monitor quality, activity, and outcomes across the SkillSync network.", primary: "Review moderation" }
  return { eyebrow: "Good morning, Maya", title: "Your next opportunity is closer than you think.", description: "A clear view of your skills, your growth, and the people looking for exactly what you bring.", primary: "Explore opportunities" }
}

export type Opportunity = (typeof opportunities)[number]
export type Course = (typeof courses)[number]

export const companies = ["northstar", "vertex", "aperture", "morrow", "common ground", "sora"]

export const skillBars = [
  { name: "Product thinking", value: 88, color: "bg-lime-300" },
  { name: "Figma & prototyping", value: 82, color: "bg-violet-400" },
  { name: "User research", value: 74, color: "bg-sky-400" },
  { name: "Data storytelling", value: 61, color: "bg-orange-300" },
]

export const activity = [
  ["Applied to Product Design Intern", "Northstar Labs", "Today", "lime"],
  ["Completed user research module", "Research-led Product Design", "Yesterday", "violet"],
  ["Profile viewed by recruiter", "Aperture Health", "Mon", "sky"],
] as const

export const faqs = [
  ["What is SkillSync?", "SkillSync connects learners, educators, and industry through a shared skills profile and clearer pathways into meaningful work."],
  ["Is this only for students?", "No. Students, career changers, faculty, institutions, and industry teams each get a tailored workspace."],
  ["How are matches calculated?", "Matches are based on role skills, demonstrated projects, learning progress, preferences, and experience context."],
]

export const chartData = [28, 34, 31, 44, 42, 56, 61, 58, 72, 68, 79, 86]

export const adminRows = [
  ["Maya Chen", "Student", "Profile complete", "2 min ago"],
  ["Northstar Labs", "Industry", "Opportunity posted", "18 min ago"],
  ["Dr. Lena Ortiz", "Faculty", "Collaboration accepted", "1 hr ago"],
  ["Aperture Health", "Industry", "3 applicants shortlisted", "3 hrs ago"],
]

export const testimonials = [
  ["SkillSync helped me stop applying randomly. I can finally see why a role is a fit and what to build next.", "Maya Chen", "Product design student"],
  ["The quality of candidates is dramatically higher because the context comes with the profile.", "Jordan Wells", "Talent lead, Northstar Labs"],
]

export const footerColumns = [
  ["Platform", "For students", "For industry", "For institutions", "How matching works"],
  ["Resources", "Career guides", "Skill library", "Success stories", "Help center"],
  ["Company", "About", "Careers", "Privacy", "Terms"],
]

export const roleColors: Record<Role, string> = { student: "lime", industry: "violet", faculty: "sky", institution: "orange", admin: "pink" }

export const onboardingSteps = ["About you", "Your skills", "What you want", "Ready to explore"]

export const roleDescriptions: Record<Role, string> = {
  student: "Build your profile, find opportunities, and grow with direction.",
  industry: "Meet skilled candidates and build teams with confidence.",
  faculty: "Connect learning outcomes to real-world pathways.",
  institution: "See the skills and outcomes shaping your community.",
  admin: "Keep quality, safety, and outcomes moving forward.",
}

export const skillTags = ["Product design", "Data analytics", "Frontend", "Research", "Strategy", "Writing", "Marketing", "Project management"]

export const applicationStages = ["Applied", "Viewed", "Shortlisted", "Interview", "Decision"]

export const messages = [
  { name: "Jordan Wells", role: "Talent lead · Northstar Labs", preview: "Your portfolio stood out to our team...", time: "10:42 AM", initials: "JW" },
  { name: "Dr. Lena Ortiz", role: "Faculty mentor", preview: "I found a collaboration that fits your interests.", time: "Yesterday", initials: "LO" },
  { name: "Aperture Health", role: "Hiring team", preview: "Thanks for applying. We would love to learn more.", time: "Mon", initials: "AH" },
]

export const candidateRows = [
  ["Maya Chen", "Product design", "94%", "Shortlist"],
  ["Eli Brooks", "UX research", "89%", "Review"],
  ["Sofia Patel", "Visual design", "84%", "Review"],
]

export const institutionMetrics = [
  { label: "Learners tracked", value: "2,840", helper: "+18% this term" },
  { label: "Placement readiness", value: "74%", helper: "+6 pts since fall" },
  { label: "Active partners", value: "68", helper: "12 new this month" },
]

export const facultyMetrics = [
  { label: "Learners in progress", value: "128", helper: "Across 6 courses" },
  { label: "Industry connections", value: "24", helper: "8 awaiting reply" },
  { label: "Projects in review", value: "36", helper: "12 due this week" },
]

export const industryMetrics = [
  { label: "Open opportunities", value: "8", helper: "3 closing soon" },
  { label: "Active candidates", value: "42", helper: "+11 this week" },
  { label: "Time to shortlist", value: "3.2d", helper: "18% faster" },
]

export const adminMetrics = [
  { label: "Active members", value: "18,420", helper: "+12.4% this month" },
  { label: "Matches made", value: "6,842", helper: "+24% this quarter" },
  { label: "Reported content", value: "14", helper: "4 need review" },
]

export const learningProgress = 68

export const matchBreakdown = [
  ["Core skills", 96], ["Learning momentum", 86], ["Project evidence", 92], ["Preferences", 82],
] as const

export const profile = { name: "Maya Chen", title: "Product design student", school: "School of Visual Arts", location: "New York, NY", initials: "MC" }

export const recentSearches = ["product design", "research internship", "remote"]

export const opportunityFilters = ["All opportunities", "Internships", "Part-time", "Remote", "Closing soon"]

export const skillsGap = [
  { name: "Accessibility", current: 42, target: 78, gap: 36 },
  { name: "Design systems", current: 58, target: 82, gap: 24 },
  { name: "SQL", current: 21, target: 60, gap: 39 },
]

export const calendarItems = [
  ["Portfolio review", "Today · 4:00 PM", "violet"],
  ["Northstar interview", "Thu · 11:30 AM", "lime"],
  ["Design systems workshop", "Fri · 2:00 PM", "sky"],
] as const

export const trendingSkills = ["AI literacy", "Product strategy", "Data visualization", "Accessibility", "Systems thinking"]

export const stats = [["18k+", "learners growing"], ["6.8k", "matches made"], ["420+", "industry partners"], ["92%", "would recommend"]]

export const benefits = [
  ["01", "Clarity", "See the next best step, not an endless list of advice."],
  ["02", "Context", "Connect skills to evidence, people, and real opportunities."],
  ["03", "Momentum", "Turn small actions into a path you can actually feel."],
]

export const appLinks = ["/dashboard", "/explore", "/applications", "/learning", "/messages", "/profile"]

export const demoNotice = "You are exploring a SkillSync demo workspace. Your changes are saved in this browser only."

export const statusStyles: Record<string, string> = {
  lime: "bg-lime-300/10 text-lime-200 border-lime-300/20",
  violet: "bg-violet-300/10 text-violet-200 border-violet-300/20",
  sky: "bg-sky-300/10 text-sky-200 border-sky-300/20",
  orange: "bg-orange-300/10 text-orange-200 border-orange-300/20",
  pink: "bg-pink-300/10 text-pink-200 border-pink-300/20",
}

export const skillSyncName = "SkillSync"
export const demoUser = "Maya Chen"
export const productTagline = "Make your next move make sense."
export const appDescription = "A shared skills network for learning, opportunity, and better work."
export const year = "2026"
export const supportEmail = "hello@skillsync.demo"
export const defaultRole: Role = "student"
export const dashboardPath = "/dashboard"
export const loginPath = "/login"
export const onboardingPath = "/onboarding"
export const explorePath = "/explore"
export const appTitle = "SkillSync workspace"
export const sampleMatch = 94
export const profileCompletion = 82
export const savedCount = 12
export const applicationCount = 4
export const unreadCount = 2
export const courseCount = 3
export const partnerCount = 420
export const learnerCount = 18420
export const matchesCount = 6842
export const recommendationRate = 92
export const appAccent = "#d6ff57"
export const appPurple = "#8b5cf6"
export const appBackground = "#08070d"
export const appBorder = "rgba(255,255,255,.1)"
export const appMuted = "rgba(255,255,255,.58)"
export const appSurface = "rgba(11,10,18,.72)"
export const appGlow = "rgba(214,255,87,.15)"
export const appRadius = "1.25rem"
export const appMaxWidth = "80rem"
export const appVersion = "demo-1.0"
export const appStatus = "All systems clear"
export const quickActions = ["Find a role", "Complete assessment", "Update profile"]
export const navLabel = "Workspace"
export const emptyStateTitle = "Nothing here yet"
export const emptyStateCopy = "Your next update will appear here."
export const footerNote = "Built for the people making the future of work more human."
export const privacyNote = "Demo data stays in this browser."
export const productPill = "Skills infrastructure for the real world"
export const landingCta = "Start with your path"
export const landingSecondary = "See how it works"
export const loginCta = "Enter demo workspace"
export const signupCta = "Create a free profile"
export const matchingNote = "Personalized from your skills, goals, and momentum"
export const networkNote = "Trusted by learners and teams building what is next"
export const footerCta = "Make your next move make sense."
export const footerCtaBody = "Join the network turning potential into progress."
export const menuLabel = "Open menu"
export const closeLabel = "Close menu"
export const searchPlaceholder = "Search roles, skills, people..."
export const notificationLabel = "Notifications"
export const profileMenuLabel = "Open profile menu"
export const navMobileLabel = "Mobile navigation"
export const roleSwitcherLabel = "Switch workspace role"
export const matchLabel = "AI match"
export const saveLabel = "Save opportunity"
export const applyLabel = "Apply now"
export const learnLabel = "Continue learning"
export const viewAllLabel = "View all"
export const backLabel = "Back"
export const nextLabel = "Next"
export const submitLabel = "Submit"
export const cancelLabel = "Cancel"
export const closeDialogLabel = "Close dialog"
export const noResultsLabel = "No results found"
export const searchResultLabel = "Search result"
export const opportunityLabel = "Opportunity"
export const courseLabel = "Course"
export const messageLabel = "Message"
export const notificationItemLabel = "Notification"
export const demoBadge = "DEMO"
export const betaBadge = "BETA"
export const liveBadge = "LIVE"
export const newBadge = "NEW"
export const popularBadge = "POPULAR"
export const verifiedBadge = "VERIFIED"
export const roleBadge = "YOUR ROLE"
export const appFooterLabel = "SkillSync footer"
export const appHeaderLabel = "SkillSync header"
export const mainNavLabel = "Main navigation"
export const statsLabel = "SkillSync by the numbers"
export const faqLabel = "Frequently asked questions"
export const roleSectionLabel = "Built around your role"
export const benefitsLabel = "Why SkillSync"
export const companiesLabel = "Growing with teams at"
export const testimonialsLabel = "What the network says"
export const dashboardLabel = "Dashboard overview"
export const metricLabel = "Workspace metric"
export const chartLabel = "Activity chart"
export const activityLabel = "Recent activity"
export const skillLabel = "Skill progress"
export const opportunitiesLabel = "Recommended opportunities"
export const coursesLabel = "Learning picks"
export const applicationLabel = "Application tracker"
export const messageListLabel = "Message list"
export const profileLabel = "Profile summary"
export const settingsLabel = "Settings"
export const helpLabel = "Help center"
export const adminLabel = "Admin overview"
export const institutionLabel = "Institution overview"
export const facultyLabel = "Faculty overview"
export const industryLabel = "Industry overview"
export const studentLabel = "Student overview"
export const roleSelectorLabel = "Choose your workspace"
export const onboardingLabel = "Profile onboarding"
export const assessLabel = "Skill assessment"
export const careerMapLabel = "Career map"
export const portfolioLabel = "Portfolio"
export const projectsLabel = "Projects"
export const certificationsLabel = "Certifications"
export const progressLabel = "Progress"
export const interviewLabel = "Interviews"
export const applicantsLabel = "Applicants"
export const collaborationLabel = "Collaborations"
export const reportsLabel = "Reports"
export const moderationLabel = "Moderation"
export const usersLabel = "Users"
export const contentLabel = "Content"
export const analyticsLabel = "Analytics"
export const statusLabel = "Status"
export const actionsLabel = "Actions"
export const tableLabel = "Data table"
export const filterLabel = "Filters"
export const sortLabel = "Sort"
export const paginationLabel = "Pagination"
export const loadingLabel = "Loading"
export const errorLabel = "Error"
export const successLabel = "Success"
export const warningLabel = "Warning"
export const infoLabel = "Information"
export const optionalLabel = "Optional"
export const requiredLabel = "Required"
export const close = "Close"
export const open = "Open"
export const yes = "Yes"
export const no = "No"
export const all = "All"
export const none = "None"
export const today = "Today"
export const yesterday = "Yesterday"
export const thisWeek = "This week"
export const thisMonth = "This month"
export const nextWeek = "Next week"
export const thisTerm = "This term"
export const thisQuarter = "This quarter"
export const remote = "Remote"
export const hybrid = "Hybrid"
export const onsite = "On-site"
export const internship = "Internship"
export const partTime = "Part-time"
export const fullTime = "Full-time"
export const fellowship = "Fellowship"
export const coOp = "Co-op"
export const beginner = "Beginner"
export const intermediate = "Intermediate"
export const advanced = "Advanced"
export const allLevels = "All levels"
export const studentRole = "student"
export const industryRole = "industry"
export const facultyRole = "faculty"
export const institutionRole = "institution"
export const adminRole = "admin"
export const primaryCta = "bg-lime-300 text-black hover:bg-lime-200"
export const secondaryCta = "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
export const glassCard = "rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl"
export const smallCaps = "text-[10px] font-semibold uppercase tracking-[0.22em]"
export const sectionLabel = "text-sm font-medium text-lime-200"
export const bodyMuted = "text-sm leading-6 text-white/55"
export const pageTitle = "text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
export const displayTitle = "text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl"
export const navClass = "text-sm text-white/58 transition hover:text-white"
export const activeNavClass = "bg-white/10 text-white"
export const borderClass = "border-white/10"
export const backgroundClass = "bg-[#08070d]"
export const accentClass = "text-lime-200"
export const violetClass = "text-violet-200"
export const skyClass = "text-sky-200"
export const orangeClass = "text-orange-200"
export const dangerClass = "text-rose-200"
export const maxWidthClass = "mx-auto w-full max-w-7xl px-5 sm:px-8"
export const pagePaddingClass = "py-10 sm:py-14"
export const sectionPaddingClass = "py-20 sm:py-28"
export const roundedClass = "rounded-3xl"
export const shadowClass = "shadow-2xl shadow-black/20"
export const inputClass = "h-11 rounded-xl border-white/10 bg-white/[0.05] text-white placeholder:text-white/35"
export const buttonClass = "rounded-xl"
export const iconButtonClass = "size-10 rounded-xl"
export const chipClass = "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/65"
export const tableHeaderClass = "text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35"
export const tableCellClass = "border-t border-white/8 py-4 text-sm text-white/70"
export const dividerClass = "border-white/10"
export const ringClass = "ring-1 ring-inset ring-white/10"
export const transitionClass = "transition duration-200"
export const focusClass = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70"
export const hoverLiftClass = "hover:-translate-y-0.5 hover:border-white/20"
export const responsiveGridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
export const appGridClass = "grid gap-4 lg:grid-cols-[repeat(12,minmax(0,1fr))]"
export const proseClass = "max-w-2xl text-lg leading-8 text-white/55"
export const overlineClass = "text-xs font-medium uppercase tracking-[0.2em] text-white/38"
export const mobileBottomClass = "fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-2xl border border-white/10 bg-[#12101b]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"
export const sidebarClass = "fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-white/8 bg-[#0b0912]/80 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col"
export const mainWithSidebarClass = "lg:pl-64"
export const topbarClass = "sticky top-0 z-10 border-b border-white/8 bg-[#08070d]/75 backdrop-blur-xl"
export const chartGradient = "linear-gradient(180deg, rgba(214,255,87,.22), rgba(214,255,87,0))"
export const radialGlow = "radial-gradient(circle at 50% 0%, rgba(139,92,246,.18), transparent 45%)"
export const limeGlow = "0 0 50px rgba(214,255,87,.12)"
export const violetGlow = "0 0 50px rgba(139,92,246,.16)"
export const statusDot = "size-1.5 rounded-full"
export const accentDot = "bg-lime-300"
export const mutedDot = "bg-white/30"
export const warningDot = "bg-orange-300"
export const infoDot = "bg-sky-300"
export const dangerDot = "bg-rose-300"
export const appLayout = "min-h-screen bg-[#08070d] text-white"
export const appContent = "min-h-screen"
export const appContainer = "mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10"
export const cardPadding = "p-5 sm:p-6"
export const cardHeader = "flex items-start justify-between gap-4"
export const cardTitle = "text-base font-medium text-white"
export const cardSub = "mt-1 text-sm text-white/45"
export const metricValue = "mt-4 text-3xl font-semibold tracking-[-0.04em] text-white"
export const metricTrend = "text-xs text-lime-200"
export const metricHelper = "mt-1 text-xs text-white/35"
export const linkClass = "text-sm font-medium text-lime-200 hover:text-lime-100"
export const iconBox = "flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/60"
export const avatarClass = "flex size-9 items-center justify-center rounded-full border border-lime-200/20 bg-lime-300/10 text-xs font-medium text-lime-100"
export const badgeClass = "rounded-full border px-2.5 py-1 text-[10px] font-medium"
export const formLabel = "text-sm font-medium text-white/75"
export const formHint = "text-xs text-white/38"
export const fieldGap = "flex flex-col gap-2"
export const formGrid = "grid gap-4 sm:grid-cols-2"
export const modalClass = "rounded-3xl border border-white/10 bg-[#15121f] text-white shadow-2xl"
export const modalOverlay = "bg-black/70 backdrop-blur-sm"
export const chartBar = "rounded-t-full bg-lime-300/75"
export const progressTrack = "h-2 overflow-hidden rounded-full bg-white/10"
export const progressFill = "h-full rounded-full bg-lime-300"
export const listGap = "flex flex-col gap-3"
export const inlineGap = "flex items-center gap-2"
export const wrapGap = "flex flex-wrap items-center gap-2"
export const split = "flex items-center justify-between gap-4"
export const stack = "flex flex-col gap-4"
export const tiny = "text-[11px] text-white/40"
export const caption = "text-xs text-white/45"
export const muted = "text-white/55"
export const faint = "text-white/35"
export const white = "text-white"
export const black = "text-black"
export const lime = "text-lime-200"
export const violet = "text-violet-200"
export const sky = "text-sky-200"
export const orange = "text-orange-200"
export const pink = "text-pink-200"
export const border = "border-white/10"
export const surface = "bg-white/[0.04]"
export const surfaceHover = "hover:bg-white/[0.07]"
export const darkSurface = "bg-[#0f0d17]"
export const darkerSurface = "bg-[#0a0910]"
export const gradientText = "bg-gradient-to-r from-white via-white to-white/45 bg-clip-text text-transparent"
export const lineHeight = "leading-tight"
export const tracking = "tracking-[-0.04em]"
export const soft = "font-normal"
export const medium = "font-medium"
export const semibold = "font-semibold"
export const bold = "font-bold"
export const uppercase = "uppercase"
export const lowercase = "lowercase"
export const nowrap = "whitespace-nowrap"
export const full = "w-full"
export const centered = "mx-auto"
export const relative = "relative"
export const overflowHidden = "overflow-hidden"
export const noSelect = "select-none"
export const cursor = "cursor-pointer"
export const pointer = "pointer-events-none"
export const zBase = "relative z-10"
export const zTop = "relative z-20"
export const visuallyHidden = "sr-only"
export const auto = "auto"
export const minHeight = "min-h-screen"
export const width = "w-full"
export const height = "h-full"
export const noWrap = "whitespace-nowrap"
export const breakWords = "break-words"
export const lineClamp = "line-clamp-2"
export const hiddenMobile = "hidden sm:block"
export const mobileOnly = "sm:hidden"
export const desktopOnly = "hidden lg:block"
export const tabletOnly = "hidden md:block lg:hidden"
export const gridSpan = "lg:col-span-"
export const safeArea = "pb-[env(safe-area-inset-bottom)]"
export const topSafeArea = "pt-[env(safe-area-inset-top)]"
export const noOverflow = "overflow-x-hidden"
export const screenReader = "sr-only"
export const ariaLive = "aria-live"
export const role = "role"
export const href = "href"
export const label = "label"
export const value = "value"
export const id = "id"
export const name = "name"
export const type = "type"
export const placeholder = "placeholder"
export const disabled = "disabled"
export const checked = "checked"
export const selected = "selected"
export const ariaLabel = "aria-label"
export const ariaCurrent = "aria-current"
export const ariaExpanded = "aria-expanded"
export const tabIndex = "tabIndex"
export const button = "button"
export const submit = "submit"
export const text = "text"
export const email = "email"
export const password = "password"
export const checkbox = "checkbox"
export const radio = "radio"
export const search = "search"
export const number = "number"
export const date = "date"
export const time = "time"
export const tel = "tel"
export const url = "url"
export const textarea = "textarea"
export const form = "form"
export const main = "main"
export const header = "header"
export const footer = "footer"
export const nav = "nav"
export const section = "section"
export const article = "article"
export const aside = "aside"
export const dialog = "dialog"
export const list = "list"
export const listitem = "listitem"
export const progress = "progress"
export const complementary = "complementary"
export const banner = "banner"
export const contentinfo = "contentinfo"
export const navigation = "navigation"
export const region = "region"
export const application = "application"
export const documentRole = "document"
export const img = "img"
export const presentation = "presentation"
export const alert = "alert"
export const status = "status"
export const log = "log"
export const marquee = "marquee"
export const timer = "timer"
export const tooltip = "tooltip"
export const menu = "menu"
export const menuitem = "menuitem"
export const option = "option"
export const tab = "tab"
export const tablist = "tablist"
export const tabpanel = "tabpanel"
export const tree = "tree"
export const treeitem = "treeitem"
export const grid = "grid"
export const row = "row"
export const cell = "cell"
export const columnheader = "columnheader"
export const rowheader = "rowheader"
export const feed = "feed"
export const articleRole = "article"
export const regionRole = "region"
export const contentinfoRole = "contentinfo"
export const navigationRole = "navigation"
export const bannerRole = "banner"
export const mainRole = "main"
export const searchRole = "search"
export const formRole = "form"
export const alertRole = "alert"
export const statusRole = "status"
export const dialogRole = "dialog"
export const complementaryRole = "complementary"
export const presentationRole = "presentation"
export const imgRole = "img"
export const noneRole = "none"
export const applicationRole = "application"
export const documentRoleName = "document"
export const groupRole = "group"
export const listboxRole = "listbox"
export const comboboxRole = "combobox"
export const spinbuttonRole = "spinbutton"
export const sliderRole = "slider"
export const switchRole = "switch"
export const checkboxRole = "checkbox"
export const radioRole = "radio"
export const tabRole = "tab"
export const tablistRole = "tablist"
export const tabpanelRole = "tabpanel"
export const menuRole = "menu"
export const menuitemRole = "menuitem"
export const optionRole = "option"
export const treeRole = "tree"
export const treeitemRole = "treeitem"
export const gridRole = "grid"
export const rowRole = "row"
export const cellRole = "cell"
export const columnheaderRole = "columnheader"
export const rowheaderRole = "rowheader"
export const progressRole = "progressbar"
export const tooltipRole = "tooltip"
export const timerRole = "timer"
export const logRole = "log"
export const marqueeRole = "marquee"
export const feedRole = "feed"
export const articleRoleName = "article"
export const regionRoleName = "region"
export const contentinfoRoleName = "contentinfo"
export const navigationRoleName = "navigation"
export const bannerRoleName = "banner"
export const mainRoleName = "main"
export const searchRoleName = "search"
export const formRoleName = "form"
export const alertRoleName = "alert"
export const statusRoleName = "status"
export const dialogRoleName = "dialog"
export const complementaryRoleName = "complementary"
export const presentationRoleName = "presentation"
export const imgRoleName = "img"
export const noneRoleName = "none"
export const applicationRoleName = "application"
export const documentRoleValue = "document"
export const groupRoleName = "group"
export const listboxRoleName = "listbox"
export const comboboxRoleName = "combobox"
export const spinbuttonRoleName = "spinbutton"
export const sliderRoleName = "slider"
export const switchRoleName = "switch"
export const checkboxRoleName = "checkbox"
export const radioRoleName = "radio"
export const tabRoleName = "tab"
export const tablistRoleName = "tablist"
export const tabpanelRoleName = "tabpanel"
export const menuRoleName = "menu"
export const menuitemRoleName = "menuitem"
export const optionRoleName = "option"
export const treeRoleName = "tree"
export const treeitemRoleName = "treeitem"
export const gridRoleName = "grid"
export const rowRoleName = "row"
export const cellRoleName = "cell"
export const columnheaderRoleName = "columnheader"
export const rowheaderRoleName = "rowheader"
export const progressRoleName = "progressbar"
export const tooltipRoleName = "tooltip"
export const timerRoleName = "timer"
export const logRoleName = "log"
export const marqueeRoleName = "marquee"
export const feedRoleName = "feed"
export const articleRoleName2 = "article"
export const regionRoleName2 = "region"
export const contentinfoRoleName2 = "contentinfo"
export const navigationRoleName2 = "navigation"
export const bannerRoleName2 = "banner"
export const mainRoleName2 = "main"
export const searchRoleName2 = "search"
export const formRoleName2 = "form"
export const alertRoleName2 = "alert"
export const statusRoleName2 = "status"
export const dialogRoleName2 = "dialog"
export const complementaryRoleName2 = "complementary"
export const presentationRoleName2 = "presentation"
export const imgRoleName2 = "img"
export const noneRoleName2 = "none"
export const applicationRoleName2 = "application"
export const documentRoleValue2 = "document"
export const groupRoleName2 = "group"
export const listboxRoleName2 = "listbox"
export const comboboxRoleName2 = "combobox"
export const spinbuttonRoleName2 = "spinbutton"
export const sliderRoleName2 = "slider"
export const switchRoleName2 = "switch"
export const checkboxRoleName2 = "checkbox"
export const radioRoleName2 = "radio"
export const tabRoleName2 = "tab"
export const tablistRoleName2 = "tablist"
export const tabpanelRoleName2 = "tabpanel"
export const menuRoleName2 = "menu"
export const menuitemRoleName2 = "menuitem"
export const optionRoleName2 = "option"
export const treeRoleName2 = "tree"
export const treeitemRoleName2 = "treeitem"
export const gridRoleName2 = "grid"
export const rowRoleName2 = "row"
export const cellRoleName2 = "cell"
export const columnheaderRoleName2 = "columnheader"
export const rowheaderRoleName2 = "rowheader"
export const progressRoleName2 = "progressbar"
export const tooltipRoleName2 = "tooltip"
export const timerRoleName2 = "timer"
export const logRoleName2 = "log"
export const marqueeRoleName2 = "marquee"
export const feedRoleName2 = "feed"
export const done = true
