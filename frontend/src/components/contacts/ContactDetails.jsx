import { motion } from 'framer-motion';
import { X, Mail, Phone, MessageSquare, Star, Building2, MapPin, Calendar } from 'lucide-react';

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

function ContactDetails({ contact, onClose }) {
  if (!contact) return null;

  const grad = avatarGradient(contact.first_name);
  const infoItems = contact.contact_info?.filter((i) => i.value) ?? [];

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="fixed right-0 top-0 z-50 h-screen w-full overflow-y-auto bg-white shadow-2xl md:w-[360px]"
    >
      {/* gradient header */}
      <div className={`relative bg-gradient-to-br ${grad} px-6 pb-12 pt-12`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/35"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-white/30 bg-white/20 text-3xl font-extrabold text-white shadow-xl`}>
            {contact.first_name?.[0]}{contact.last_name?.[0]}
          </div>
          <h2 className="mt-3 text-xl font-extrabold text-white">
            {contact.first_name} {contact.last_name}
          </h2>
          {contact.company_name && (
            <div className="mt-1 flex items-center gap-1 text-sm text-white/70">
              <Building2 size={12} /> {contact.company_name}
            </div>
          )}
          {contact.favorite && (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
              <Star size={11} fill="currentColor" /> Favorite
            </span>
          )}
        </div>
      </div>

      {/* wave */}
      <div className={`bg-gradient-to-br ${grad}`}>
        <svg viewBox="0 0 360 32" className="w-full fill-white" preserveAspectRatio="none">
          <path d="M0,32 C90,0 270,32 360,10 L360,32 Z" />
        </svg>
      </div>

      {/* body */}
      <div className="space-y-5 px-6 pb-8 pt-2">
        {infoItems.length > 0 && (
          <section>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Info</p>
            <div className="space-y-2">
              {infoItems.map((info, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100">
                  {info.type === 'email'
                    ? <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100"><Mail size={14} className="text-sky-500" /></div>
                    : <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100"><Phone size={14} className="text-emerald-500" /></div>}
                  <span className="truncate text-sm font-medium text-slate-700">{info.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Working days */}
        {contact.working_days && (
          <section>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Working Days</p>
            <div className="flex gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                <Calendar size={14} className="text-orange-500" />
              </div>
              <p className="text-sm text-slate-700">{contact.working_days}</p>
            </div>
          </section>
        )}

        {/* Address */}
        {contact.addresses?.filter((a) => a.street).map((addr, i) => (
          <section key={i}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Address — <span className="capitalize">{addr.type}</span>
            </p>
            <div className="flex gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-100">
                <MapPin size={14} className="text-rose-500" />
              </div>
              <div className="text-sm text-slate-700 leading-relaxed">
                <p>{addr.street}</p>
                {addr.street_2 && <p>{addr.street_2}</p>}
                <p>
                  {[addr.city, addr.region, addr.postal_code].filter(Boolean).join(', ')}
                </p>
                {addr.country && <p>{addr.country}</p>}
              </div>
            </div>
          </section>
        ))}

        {/* Notes */}
        {contact.notes && (
          <section>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Notes</p>
            <div className="flex gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                <MessageSquare size={14} className="text-violet-500" />
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{contact.notes}</p>
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}

export default ContactDetails;
