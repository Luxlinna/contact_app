import { Users, Star, Briefcase, Clock } from 'lucide-react';

const STATS = [
  { title: 'Total', icon: Users, gradient: 'from-indigo-500 to-violet-600', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  { title: 'Favorites', icon: Star, gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600' },
  { title: 'Work', icon: Briefcase, gradient: 'from-sky-500 to-cyan-500', bg: 'bg-sky-50', text: 'text-sky-600' },
  { title: 'Recent', icon: Clock, gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
];

function StatsCards({ contacts = [], loading }) {
  const values = [
    loading ? '…' : contacts.length,
    contacts.filter((c) => c.favorite).length,
    contacts.filter((c) => c.contact_info?.some((i) => i.type === 'work')).length,
    contacts.slice(-3).length,
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={s.title} className={`flex items-center gap-4 rounded-2xl ${s.bg} border border-white p-4 shadow-sm`}>
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} shadow-md`}>
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${s.text}`}>{s.title}</p>
              <p className="text-2xl font-extrabold text-slate-800 leading-tight">{values[i]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;
