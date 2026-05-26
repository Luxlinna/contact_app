import { Mail, Phone, Trash2, Pencil, Star, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GRADIENTS = [
  'from-indigo-500 to-violet-600',
  'from-sky-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-rose-500 to-pink-500',
  'from-blue-500 to-indigo-600',
];

function avatarGradient(name = '') {
  return GRADIENTS[(name.charCodeAt(0) || 0) % GRADIENTS.length];
}

function ContactCard({ contact, onDelete, onEdit, onSelect }) {
  const grad = avatarGradient(contact.first_name);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onClick={() => onSelect(contact)}
      className="group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl cursor-pointer transition-shadow duration-300"
    >
      {/* colored header strip */}
      <div className={`h-16 w-full bg-gradient-to-r ${grad} relative`}>
        {contact.favorite && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-semibold text-white">
            <Star size={9} fill="currentColor" /> Favorite
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        {/* overlapping avatar */}
        <div className={`-mt-7 h-14 w-14 rounded-2xl border-4 border-white bg-gradient-to-br ${grad} flex items-center justify-center text-base font-extrabold text-white shadow-lg`}>
          {contact.first_name?.[0]}{contact.last_name?.[0]}
        </div>

        <div className="mt-2.5">
          {contact.company_name && (
            <div className="mb-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              <Building2 size={9} /> {contact.company_name}
            </div>
          )}
          <h2 className="font-bold text-slate-800 truncate">
            {contact.first_name} {contact.last_name}
          </h2>

          <div className="mt-2 space-y-1.5">
            {contact.contact_info?.filter((i) => i.value).slice(0, 2).map((info, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-500">
                {info.type === 'email'
                  ? <Mail size={11} className="shrink-0 text-sky-400" />
                  : <Phone size={11} className="shrink-0 text-emerald-400" />}
                <span className="truncate">{info.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* hover actions */}
        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(contact); }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-50 py-2 text-[11px] font-bold text-indigo-600 hover:bg-indigo-100 transition"
          >
            <Pencil size={11} /> Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(contact.id); }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-50 py-2 text-[11px] font-bold text-red-500 hover:bg-red-100 transition"
          >
            <Trash2 size={11} /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactCard;
