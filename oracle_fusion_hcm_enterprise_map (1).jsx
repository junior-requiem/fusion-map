import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, Users, CalendarDays, HeartPulse, Clock3, Banknote, BadgeDollarSign, Briefcase, Target, GraduationCap, Route, Headset, Database, Network, Workflow, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const modules = [
  {
    id: 'foundation',
    title: 'Foundation',
    icon: Building2,
    tier: 'Core Platform',
    summary: 'Enterprise structures, reference data, workforce structures, worker model, and extensibility.',
    color: 'from-slate-700 to-slate-900',
    children: [
      'Enterprise',
      'Legal Entities',
      'Legislative Data Groups (LDGs)',
      'Business Units',
      'Departments',
      'Locations',
      'Jobs',
      'Positions',
      'Grades',
      'Reference Data Sets',
      'Lookups / Value Sets',
      'Flexfields / Fast Formula / HDL / APIs'
    ],
    dependsOn: [],
    feeds: ['core-hr', 'security', 'absence', 'benefits', 'time-labor', 'payroll', 'compensation', 'recruiting', 'talent', 'learning', 'journeys', 'help-desk']
  },
  {
    id: 'core-hr',
    title: 'Core HR',
    icon: Users,
    tier: 'System Backbone',
    summary: 'Worker lifecycle, work relationships, assignments, person records, hierarchies, and employment transactions.',
    color: 'from-blue-700 to-indigo-900',
    children: [
      'Person Management',
      'Work Relationships',
      'Assignments',
      'Employment Terms',
      'Hire / Transfer / Promote / Terminate',
      'Manager and Org Hierarchies',
      'Document Records',
      'Checklists / Journeys',
      'Transaction Design Studio',
      'HCM Experience Design Studio'
    ],
    dependsOn: ['foundation'],
    feeds: ['absence', 'benefits', 'time-labor', 'payroll', 'compensation', 'recruiting', 'talent', 'learning', 'journeys', 'help-desk']
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    tier: 'Cross-Module Control',
    summary: 'Roles, data roles, security profiles, role provisioning, and access governance.',
    color: 'from-cyan-700 to-sky-900',
    children: [
      'Users',
      'Abstract Roles',
      'Job Roles',
      'Duty Roles',
      'Data Roles',
      'Security Profiles',
      'Role Provisioning Rules',
      'Areas of Responsibility'
    ],
    dependsOn: ['foundation', 'core-hr'],
    feeds: ['absence', 'benefits', 'time-labor', 'payroll', 'compensation', 'recruiting', 'talent', 'learning', 'journeys', 'help-desk']
  },
  {
    id: 'absence',
    title: 'Absence Management',
    icon: CalendarDays,
    tier: 'Workforce Operations',
    summary: 'Absence types, plans, enrollments, eligibility, accruals, balances, and formula-driven logic.',
    color: 'from-emerald-700 to-teal-900',
    children: [
      'Absence Types',
      'Reasons / Certifications',
      'Absence Plans',
      'Eligibility Profiles',
      'Enrollments',
      'Front-Loaded / Accrual-Based Plans',
      'Accrual Bands / Matrices',
      'Proration / Carryover / Ceiling Rules',
      'Calculate Accruals and Balances',
      'Payroll / Time and Labor Integration'
    ],
    dependsOn: ['foundation', 'core-hr', 'security'],
    feeds: ['time-labor', 'payroll']
  },
  {
    id: 'benefits',
    title: 'Benefits',
    icon: HeartPulse,
    tier: 'Workforce Operations',
    summary: 'Programs, plans, options, life events, eligibility, enrollments, rates, and deductions.',
    color: 'from-rose-700 to-pink-900',
    children: [
      'Benefits Programs',
      'Plans / Plan Types / Options',
      'Life Events',
      'Eligibility Profiles',
      'Derived Factors',
      'Open Enrollment',
      'Default / Life Event Enrollment',
      'Dependents / Beneficiaries',
      'Standard / Variable Rates',
      'Payroll Deductions'
    ],
    dependsOn: ['foundation', 'core-hr', 'security'],
    feeds: ['payroll']
  },
  {
    id: 'time-labor',
    title: 'Time and Labor',
    icon: Clock3,
    tier: 'Workforce Operations',
    summary: 'Time layouts, rules, time entry, schedules, approvals, calculated time, and payroll transfer.',
    color: 'from-amber-600 to-orange-900',
    children: [
      'Time Entry Layout Sets',
      'Time Categories / Attributes',
      'Worker Time Entry Profiles',
      'Time Entry Rules',
      'Time Calculation Rules',
      'Validation / Rule Sets',
      'Work Schedules / Shifts',
      'Approvals',
      'Calculated / Pay Time',
      'Transfer to Payroll'
    ],
    dependsOn: ['foundation', 'core-hr', 'security', 'absence'],
    feeds: ['payroll']
  },
  {
    id: 'payroll',
    title: 'Payroll',
    icon: Banknote,
    tier: 'Financial Workforce Processing',
    summary: 'Statutory context, payroll definitions, elements, balances, calculations, payments, and costing.',
    color: 'from-violet-700 to-purple-900',
    children: [
      'Payroll Statutory Units',
      'Tax Reporting Units',
      'Payroll Definitions',
      'Payroll Periods / Calendars',
      'Elements / Input Values',
      'Element Eligibility',
      'Recurring / Nonrecurring Entries',
      'Balances / Balance Feeds',
      'Payroll Run / Prepayments / Payments',
      'Costing / GL Integration'
    ],
    dependsOn: ['foundation', 'core-hr', 'security', 'absence', 'benefits', 'time-labor', 'compensation'],
    feeds: []
  },
  {
    id: 'compensation',
    title: 'Compensation',
    icon: BadgeDollarSign,
    tier: 'Reward Management',
    summary: 'Salary basis, individual compensation, workforce compensation cycles, budgets, and approvals.',
    color: 'from-fuchsia-700 to-purple-900',
    children: [
      'Salary Basis',
      'Salary Components',
      'Pay Basis',
      'Grade Rates',
      'Workforce Compensation Plans',
      'Budget Pools',
      'Worksheets',
      'Eligibility',
      'Individual Awards / Bonus / Allowance',
      'Payroll Element Connections'
    ],
    dependsOn: ['foundation', 'core-hr', 'security'],
    feeds: ['payroll']
  },
  {
    id: 'recruiting',
    title: 'Recruiting',
    icon: Briefcase,
    tier: 'Talent Acquisition',
    summary: 'Career sites, requisitions, candidate management, offers, and move-to-HR processes.',
    color: 'from-sky-700 to-blue-900',
    children: [
      'Career Sites',
      'Requisition Templates',
      'Phases / States',
      'Hiring Team Roles',
      'Job Requisitions',
      'Candidate Profiles',
      'Applications / Interviews',
      'Offers',
      'Move to HR',
      'Recruiting Analytics'
    ],
    dependsOn: ['foundation', 'core-hr', 'security'],
    feeds: ['core-hr']
  },
  {
    id: 'talent',
    title: 'Talent Management',
    icon: Target,
    tier: 'Talent Development',
    summary: 'Profiles, performance, goals, succession, talent pools, career development, and calibration.',
    color: 'from-lime-700 to-green-900',
    children: [
      'Profile Types',
      'Content Types / Items',
      'Person / Model Profiles',
      'Review Periods',
      'Performance Templates',
      'Ratings / Sections',
      'Goal Plans / Libraries',
      'Succession / Talent Pools',
      'Career Development',
      'Calibration'
    ],
    dependsOn: ['foundation', 'core-hr', 'security'],
    feeds: []
  },
  {
    id: 'learning',
    title: 'Learning',
    icon: GraduationCap,
    tier: 'Talent Development',
    summary: 'Courses, offerings, activities, specializations, assignments, catalogs, and access rules.',
    color: 'from-green-700 to-emerald-900',
    children: [
      'Learning Items',
      'Courses',
      'Offerings',
      'Activities',
      'Specializations',
      'Catalogs',
      'Instructors / Resources',
      'Assignments',
      'Access Rules',
      'Learning Reporting'
    ],
    dependsOn: ['foundation', 'core-hr', 'security', 'talent'],
    feeds: []
  },
  {
    id: 'journeys',
    title: 'Journeys / Oracle ME',
    icon: Route,
    tier: 'Employee Experience',
    summary: 'Journey templates, tasks, allocations, guided experiences, and event-driven employee actions.',
    color: 'from-indigo-700 to-blue-950',
    children: [
      'Journey Templates',
      'Tasks',
      'Allocations',
      'Events',
      'Guided Actions',
      'Employee Experience Surfaces',
      'Redwood Pages',
      'Recommendations',
      'Communications',
      'Event-Based Delivery'
    ],
    dependsOn: ['foundation', 'core-hr', 'security'],
    feeds: []
  },
  {
    id: 'help-desk',
    title: 'Help Desk / HR Service Delivery',
    icon: Headset,
    tier: 'Service Delivery',
    summary: 'Service requests, categories, queues, assignment rules, knowledge, and HR support workflows.',
    color: 'from-stone-700 to-neutral-900',
    children: [
      'Service Requests',
      'Categories',
      'Queues',
      'Assignment Rules',
      'Knowledge',
      'HR Support Workflows',
      'Approvals',
      'Case Visibility',
      'Analytics',
      'Security-Scoped Service Access'
    ],
    dependsOn: ['foundation', 'core-hr', 'security'],
    feeds: []
  },
  {
    id: 'integration',
    title: 'Data / Integration / Reporting Layer',
    icon: Database,
    tier: 'Cross-Module Control',
    summary: 'HDL, extracts, APIs, BI Publisher, OTBI, audit, diagnostics, and cross-module data movement.',
    color: 'from-gray-700 to-zinc-950',
    children: [
      'HDL / HSDL',
      'REST APIs / SOAP',
      'HCM Extracts',
      'BI Publisher',
      'OTBI',
      'Dashboards',
      'Audit',
      'Diagnostics',
      'File-Based Integrations',
      'Cross-Module Reporting'
    ],
    dependsOn: ['foundation', 'core-hr', 'security'],
    feeds: ['absence', 'benefits', 'time-labor', 'payroll', 'compensation', 'recruiting', 'talent', 'learning', 'journeys', 'help-desk']
  }
];

const positions = {
  foundation: { x: 50, y: 10 },
  'core-hr': { x: 38, y: 28 },
  security: { x: 62, y: 28 },
  absence: { x: 14, y: 50 },
  benefits: { x: 32, y: 50 },
  'time-labor': { x: 50, y: 50 },
  compensation: { x: 68, y: 50 },
  payroll: { x: 86, y: 50 },
  recruiting: { x: 16, y: 74 },
  talent: { x: 38, y: 74 },
  learning: { x: 60, y: 74 },
  journeys: { x: 80, y: 74 },
  'help-desk': { x: 92, y: 74 },
  integration: { x: 50, y: 90 },
};

const laneY = {
  foundationBottom: 18,
  coreTop: 22,
  coreBottom: 36,
  opsTop: 42,
  opsBottom: 58,
  talentTop: 66,
  talentBottom: 82,
  integrationTop: 86,
  spineX: 50,
  coreHrX: 38,
  securityX: 62,
};

const idToModule = Object.fromEntries(modules.map((m) => [m.id, m]));

function ConnectionLayer({ selectedId, filteredIds }) {
  const selectedModule = selectedId ? idToModule[selectedId] : null;
  const visibleOps = ['absence', 'benefits', 'time-labor', 'compensation', 'payroll'].filter((id) => filteredIds.has(id));
  const visibleTalent = ['recruiting', 'talent', 'learning', 'journeys', 'help-desk'].filter((id) => filteredIds.has(id));

  const moduleTop = (id) => positions[id].y - 5;
  const moduleBottom = (id) => positions[id].y + 5;

  const baseStroke = 'rgba(148,163,184,0.12)';
  const highlightStroke = 'rgba(96,165,250,0.78)';
  const selectedStroke = 'rgba(59,130,246,0.72)';

  const line = ({ key, x1, y1, x2, y2, stroke = baseStroke, width = 0.9, dashed = false }) => (
    <line
      key={key}
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke={stroke}
      strokeWidth={width}
      strokeDasharray={dashed ? '3 5' : '0'}
      strokeLinecap="round"
    />
  );

  const elbow = ({ key, fromX, fromY, viaY, toX, toY, stroke = highlightStroke, width = 1.2, dashed = false }) => (
    <polyline
      key={key}
      points={`${fromX},${fromY} ${fromX},${viaY} ${toX},${viaY} ${toX},${toY}`}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeDasharray={dashed ? '3 5' : '0'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );

  const lines = [];

  if ([...filteredIds].some((id) => id !== 'foundation')) {
    lines.push(line({
      key: 'foundation-to-spine',
      x1: laneY.spineX,
      y1: moduleBottom('foundation'),
      x2: laneY.spineX,
      y2: laneY.foundationBottom,
      stroke: selectedId === 'foundation' ? selectedStroke : baseStroke,
      width: selectedId === 'foundation' ? 1.2 : 0.9,
    }));
  }

  if (filteredIds.has('core-hr') || filteredIds.has('security')) {
    lines.push(line({
      key: 'foundation-to-core-bus',
      x1: laneY.spineX,
      y1: laneY.foundationBottom,
      x2: laneY.spineX,
      y2: laneY.coreTop,
    }));
  }

  if (filteredIds.has('core-hr') && filteredIds.has('security')) {
    lines.push(line({ key: 'core-bus', x1: laneY.coreHrX, y1: laneY.coreTop, x2: laneY.securityX, y2: laneY.coreTop }));
  }
  if (filteredIds.has('core-hr')) {
    lines.push(line({ key: 'corehr-drop', x1: laneY.coreHrX, y1: laneY.coreTop, x2: laneY.coreHrX, y2: moduleTop('core-hr') }));
    lines.push(line({ key: 'corehr-down', x1: laneY.coreHrX, y1: moduleBottom('core-hr'), x2: laneY.coreHrX, y2: laneY.coreBottom }));
  }
  if (filteredIds.has('security')) {
    lines.push(line({ key: 'security-drop', x1: laneY.securityX, y1: laneY.coreTop, x2: laneY.securityX, y2: moduleTop('security') }));
    lines.push(line({ key: 'security-down', x1: laneY.securityX, y1: moduleBottom('security'), x2: laneY.securityX, y2: laneY.coreBottom }));
  }

  if (visibleOps.length) {
    lines.push(line({ key: 'spine-to-ops', x1: laneY.spineX, y1: laneY.coreBottom, x2: laneY.spineX, y2: laneY.opsTop }));
    if (visibleOps.length > 1) {
      lines.push(line({ key: 'ops-bus', x1: 14, y1: laneY.opsTop, x2: 86, y2: laneY.opsTop }));
    }
    visibleOps.forEach((id) => {
      lines.push(line({ key: `${id}-ops-drop`, x1: positions[id].x, y1: laneY.opsTop, x2: positions[id].x, y2: moduleTop(id) }));
    });
  }

  if (visibleTalent.length) {
    lines.push(line({ key: 'spine-to-talent', x1: laneY.spineX, y1: laneY.coreBottom, x2: laneY.spineX, y2: laneY.talentTop }));
    if (visibleTalent.length > 1) {
      lines.push(line({ key: 'talent-bus', x1: 16, y1: laneY.talentTop, x2: 92, y2: laneY.talentTop }));
    }
    visibleTalent.forEach((id) => {
      lines.push(line({ key: `${id}-talent-drop`, x1: positions[id].x, y1: laneY.talentTop, x2: positions[id].x, y2: moduleTop(id) }));
    });
  }

  if (filteredIds.has('integration')) {
    lines.push(line({ key: 'spine-to-integration', x1: laneY.spineX, y1: laneY.talentBottom, x2: laneY.spineX, y2: laneY.integrationTop }));
    lines.push(line({ key: 'integration-drop', x1: laneY.spineX, y1: laneY.integrationTop, x2: laneY.spineX, y2: moduleTop('integration') }));
  }

  if (selectedModule) {
    const deps = (selectedModule.dependsOn || []).filter((id) => filteredIds.has(id));
    deps.forEach((depId) => {
      const depPos = positions[depId];
      const selPos = positions[selectedId];
      const viaY = Math.min(moduleBottom(depId) + 3, moduleTop(selectedId) - 3);
      lines.push(elbow({
        key: `selected-${depId}-${selectedId}`,
        fromX: depPos.x,
        fromY: moduleBottom(depId),
        viaY,
        toX: selPos.x,
        toY: moduleTop(selectedId),
        stroke: highlightStroke,
        width: 1.35,
        dashed: depId !== 'foundation',
      }));
    });

    (selectedModule.feeds || []).filter((id) => filteredIds.has(id)).forEach((feedId) => {
      const feedPos = positions[feedId];
      const selPos = positions[selectedId];
      const viaY = Math.max(moduleBottom(selectedId) + 3, moduleTop(feedId) - 8);
      lines.push(elbow({
        key: `selected-${selectedId}-${feedId}`,
        fromX: selPos.x,
        fromY: moduleBottom(selectedId),
        viaY,
        toX: feedPos.x,
        toY: moduleTop(feedId),
        stroke: 'rgba(52,211,153,0.9)',
        width: 1.1,
        dashed: true,
      }));
    });
  }

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {lines}
    </svg>
  );
}

function ModuleNode({ module, active, onClick }) {
  const Icon = module.icon;
  const pos = positions[module.id];
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`absolute -translate-x-1/2 -translate-y-1/2 text-left ${active ? 'z-20' : 'z-10'}`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <div className={`w-56 rounded-3xl border p-4 shadow-2xl backdrop-blur-md transition-all ${active ? 'border-blue-400 bg-slate-900/95 ring-2 ring-blue-400/50' : 'border-white/10 bg-slate-950/80 hover:border-white/20'}`}>
        <div className="flex items-start gap-3">
          <div className={`rounded-2xl bg-gradient-to-br ${module.color} p-3 shadow-lg`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{module.tier}</div>
            <div className="mt-1 text-sm font-semibold leading-tight text-white">{module.title}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function OracleFusionHCMEnterpriseMap() {
  const [selectedId, setSelectedId] = useState('core-hr');
  const [query, setQuery] = useState('');

  const filteredModules = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter((m) => {
      const haystack = [m.title, m.tier, m.summary, ...m.children].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const filteredIds = useMemo(() => new Set(filteredModules.map((m) => m.id)), [filteredModules]);
  const selected = idToModule[selectedId] || filteredModules[0] || modules[0];

  const dependencyChain = selected?.dependsOn?.map((id) => idToModule[id]?.title).filter(Boolean) || [];
  const downstream = selected?.feeds?.map((id) => idToModule[id]?.title).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#111827_100%)] p-6 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="overflow-hidden rounded-[28px] border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur-xl">
          <CardHeader className="border-b border-white/10 pb-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-blue-300">Enterprise Architecture Map</div>
                <CardTitle className="mt-2 text-3xl font-semibold tracking-tight">Oracle Fusion HCM</CardTitle>
                <p className="mt-3 max-w-3xl text-sm text-slate-300">
                  Click any module to inspect its backend configuration scope, primary setup objects, upstream dependencies, and downstream integrations.
                </p>
              </div>
              <div className="w-full max-w-sm">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search modules, objects, or capabilities"
                    className="border-white/10 bg-slate-900/80 pl-9 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-[860px] overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] opacity-30" />
              <ConnectionLayer selectedId={selectedId} filteredIds={filteredIds} />

              {filteredModules.map((module) => (
                <ModuleNode
                  key={module.id}
                  module={module}
                  active={selectedId === module.id}
                  onClick={() => setSelectedId(module.id)}
                />
              ))}

              <div className="absolute left-6 top-6 flex flex-wrap gap-2">
                <Badge className="border-blue-400/30 bg-blue-500/10 text-blue-200">Blue = selected upstream dependency</Badge>
                <Badge className="border-emerald-400/30 bg-emerald-500/10 text-emerald-200">Green dashed = selected downstream flow</Badge>
                <Badge className="border-white/10 bg-white/5 text-slate-200">Gray lines = structural backbone</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[28px] border-white/10 bg-slate-950/75 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className={`rounded-2xl bg-gradient-to-br ${selected.color} p-3`}>
                  <selected.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Selected Module</div>
                  <CardTitle className="mt-1 text-2xl">{selected.title}</CardTitle>
                  <div className="mt-2"><Badge className="border-white/10 bg-white/5 text-slate-200">{selected.tier}</Badge></div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm leading-6 text-slate-300">{selected.summary}</p>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-100">
                  <Workflow className="h-4 w-4" /> Primary Setup Objects
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.children.map((item) => (
                    <Badge key={item} className="border-white/10 bg-slate-900 text-slate-200">{item}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-100">
                    <Network className="h-4 w-4" /> Upstream Dependencies
                  </div>
                  {dependencyChain.length ? (
                    <div className="flex flex-wrap gap-2">
                      {dependencyChain.map((dep) => (
                        <Badge key={dep} className="border-blue-400/20 bg-blue-500/10 text-blue-200">{dep}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">This is a foundational layer with no upstream module dependency shown in the map.</p>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-100">
                    <Database className="h-4 w-4" /> Downstream Consumers
                  </div>
                  {downstream.length ? (
                    <div className="flex flex-wrap gap-2">
                      {downstream.map((dep) => (
                        <Badge key={dep} className="border-emerald-400/20 bg-emerald-500/10 text-emerald-200">{dep}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">No major downstream module dependency is emphasized here.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-white/10 bg-slate-950/75 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg">Architecture Lens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-white">1.</span> Foundation defines enterprise, legal, reference-data, and workforce objects.</p>
              <p><span className="font-semibold text-white">2.</span> Core HR anchors the worker, assignment, and employment transaction model.</p>
              <p><span className="font-semibold text-white">3.</span> Security governs who can see or transact against each HCM object.</p>
              <p><span className="font-semibold text-white">4.</span> Functional modules inherit worker context from Core HR and structural context from Foundation.</p>
              <p><span className="font-semibold text-white">5.</span> Integration and reporting span every module and operationalize the ecosystem.</p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-white/10 bg-slate-950/75 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {modules.map((m) => (
                <Button
                  key={m.id}
                  variant="outline"
                  onClick={() => setSelectedId(m.id)}
                  className={`justify-start rounded-2xl border-white/10 text-left ${selectedId === m.id ? 'bg-white/10 text-white' : 'bg-slate-900 text-slate-300 hover:bg-white/5'}`}
                >
                  {m.title}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
