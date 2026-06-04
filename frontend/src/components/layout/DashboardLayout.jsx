import { useState, useMemo } from 'react';
import { BookUser, LayoutGrid, UserPlus, Star, Settings, Plus, Search, X, Pencil, Trash2, Mail, Phone, MapPin, Calendar, MessageSquare, Building2, ArrowLeft } from 'lucide-react';
import useContacts from '../../hooks/useContacts';
import ContactForm from '../contacts/ContactForm';

/* ─── brand gradients for avatars ───────────────────────────── */
const GRADIENTS = [
  'from-green-600 to-green-800',
  'from-amber-500 to-yellow-600',
  'from-emerald-500 to-green-600',
  'from-lime-500 to-green-600',
  'from-yellow-500 to-amber-600',
  'from-green-500 to-emerald-700',
];
function avatarGrad(name = '') {
  return GRADIENTS[(name.charCodeAt(0) || 0) % GRADIENTS.length];
}

const emptyForm = {
  company_name: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  phone_part1: '',
  phone_part2: '',
  phone_part3: '',
  message_subject: 'Other',
  working_days: '',
  notes: '',
  favorite: false,
  addr_type: 'home',
  addr_street: '',
  addr_street_2: '',
  addr_city: '',
  addr_region: '',
  addr_postal: '',
  addr_country: '',
};

/* ─── sidebar nav item ───────────────────────────────────────── */
function NavItem({ icon: Icon, label, active, onClick, badge, cta }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`group relative w-full flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
        cta
          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-900/50 hover:from-amber-400 hover:to-yellow-400'
          : active
          ? 'bg-green-800/80 text-white'
          : 'text-green-400 hover:bg-green-800/50 hover:text-green-200'
      }`}
    >
      {active && !cta && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-amber-400" />
      )}
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
        cta ? 'bg-white/15' : active ? 'bg-amber-400/20' : 'group-hover:bg-green-700/50'
      }`}>
        <Icon size={15} className={active && !cta ? 'text-amber-400' : cta ? 'text-white' : ''} />
      </span>
      <span className="flex-1 text-left hidden lg:block">{label}</span>
      {badge > 0 && (
        <span className={`hidden lg:flex text-[10px] font-bold min-w-[20px] h-5 px-1.5 rounded-full items-center justify-center ${
          cta ? 'bg-white/20 text-white' : active ? 'bg-amber-400/20 text-amber-300' : 'bg-green-800 text-green-500'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

/* ─── compact contact row (left panel) ──────────────────────── */
function ContactRow({ contact, selected, onSelect }) {
  const grad = avatarGrad(contact.first_name);
  const sub = contact.email || contact.phone || contact.company_name || '—';
  return (
    <button
      onClick={() => onSelect(contact)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-l-2 ${
        selected
          ? 'bg-green-50 border-green-600'
          : 'border-transparent hover:bg-amber-50/60 hover:border-amber-300'
      }`}
    >
      <div className={`shrink-0 h-10 w-10 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
        {contact.first_name?.[0]}{contact.last_name?.[0]}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold truncate ${selected ? 'text-green-800' : 'text-slate-800'}`}>
          {contact.first_name} {contact.last_name}
        </p>
        <p className="text-xs text-slate-400 truncate">{sub}</p>
      </div>
      {contact.favorite && <Star size={11} className="shrink-0 text-amber-500 fill-amber-500" />}
    </button>
  );
}

/* ─── detail panel ───────────────────────────────────────────── */
function DetailPanel({ contact, onEdit, onDelete, onBack }) {
  const grad = avatarGrad(contact.first_name);
  const infoItems = contact.contact_info?.filter(i => i.value) ?? [];
  const addr = contact.addresses?.find(a => a.street);

  return (
    <div className="flex flex-col h-full">
      {/* hero */}
      <div className={`relative bg-gradient-to-br ${grad} px-8 pt-5 pb-10 shrink-0`}>
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/30 transition w-fit"
        >
          <ArrowLeft size={13} /> Back
        </button>
        <div className="flex items-end gap-5">
          <div className="h-20 w-20 rounded-2xl bg-white/20 border-4 border-white/30 flex items-center justify-center text-3xl font-black text-white shadow-xl">
            {contact.first_name?.[0]}{contact.last_name?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black text-white leading-tight">
              {contact.first_name} {contact.last_name}
            </h1>
            {contact.company_name && (
              <p className="mt-0.5 flex items-center gap-1 text-sm text-white/70">
                <Building2 size={12} /> {contact.company_name}
              </p>
            )}
            {contact.favorite && (
              <span className="mt-2 inline-flex items-center gap-1 bg-amber-400/30 border border-amber-300/40 px-2.5 py-1 rounded-full text-xs font-bold text-white">
                <Star size={10} fill="currentColor" className="text-amber-300" /> Favorite
              </span>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-2 text-xs font-bold text-white hover:bg-white/30 transition"
            >
              <Pencil size={12} /> Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-2 text-xs font-bold text-white hover:bg-red-500 transition"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* wave */}
      <div className={`bg-gradient-to-br ${grad} shrink-0`}>
        <svg viewBox="0 0 800 36" className="w-full fill-green-50" preserveAspectRatio="none">
          <path d="M0,36 C200,0 600,36 800,12 L800,36 Z" />
        </svg>
      </div>

      {/* body */}
      <div className="flex-1 overflow-y-auto bg-green-50 px-8 py-6 space-y-5">
        {infoItems.length > 0 && (
          <section>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-green-600">Contact Info</p>
            <div className="space-y-2">
              {infoItems.map((info, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-white border border-green-100 px-4 py-3 shadow-sm">
                  {info.type === 'email'
                    ? <div className="h-8 w-8 shrink-0 rounded-xl bg-green-100 flex items-center justify-center"><Mail size={14} className="text-green-600" /></div>
                    : <div className="h-8 w-8 shrink-0 rounded-xl bg-amber-100 flex items-center justify-center"><Phone size={14} className="text-amber-600" /></div>}
                  <span className="text-sm font-medium text-slate-700 truncate">{info.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {addr && (
          <section>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-green-600">
              Address · <span className="capitalize">{addr.type}</span>
            </p>
            <div className="flex gap-3 rounded-2xl bg-white border border-green-100 px-4 py-3 shadow-sm">
              <div className="h-8 w-8 shrink-0 rounded-xl bg-amber-100 flex items-center justify-center">
                <MapPin size={14} className="text-amber-600" />
              </div>
              <div className="text-sm text-slate-700 leading-relaxed">
                <p>{addr.street}{addr.street_2 ? `, ${addr.street_2}` : ''}</p>
                <p>{[addr.city, addr.region, addr.postal_code].filter(Boolean).join(', ')}</p>
                {addr.country && <p>{addr.country}</p>}
              </div>
            </div>
          </section>
        )}

        {contact.working_days && (
          <section>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-green-600">Working Days</p>
            <div className="flex gap-3 rounded-2xl bg-white border border-green-100 px-4 py-3 shadow-sm">
              <div className="h-8 w-8 shrink-0 rounded-xl bg-green-100 flex items-center justify-center">
                <Calendar size={14} className="text-green-600" />
              </div>
              <p className="text-sm text-slate-700">{contact.working_days}</p>
            </div>
          </section>
        )}

        {contact.notes && (
          <section>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-green-600">Notes</p>
            <div className="flex gap-3 rounded-2xl bg-white border border-green-100 px-4 py-3 shadow-sm">
              <div className="h-8 w-8 shrink-0 rounded-xl bg-amber-100 flex items-center justify-center">
                <MessageSquare size={14} className="text-amber-600" />
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{contact.notes}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ─── welcome placeholder ────────────────────────────────────── */
function WelcomePanel({ onAddNew, count }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-12 text-center bg-green-50">
      {/* icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-amber-200/40 scale-150 blur-xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-green-600 to-green-800 shadow-2xl shadow-green-900/30">
          <BookUser size={40} className="text-amber-300" />
        </div>
      </div>

      <h2 className="text-base font-bold text-slate-700">
        {count === 0 ? 'Your address book is empty' : 'Select a contact to view'}
      </h2>
      <p className="mt-1.5 max-w-xs text-sm text-slate-400">
        {count === 0
          ? 'Start building your contact list by adding your first entry.'
          : 'Click any name from the list on the left.'}
      </p>

      {count === 0 && (
        <button
          onClick={onAddNew}
          className="mt-6 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-700 to-green-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/30 hover:from-green-600 hover:to-green-700 transition"
        >
          <Plus size={15} /> Add First Contact
        </button>
      )}

      {/* decorative bottom strip */}
      <div className="mt-12 flex gap-2 opacity-30">
        {['from-green-400 to-green-600', 'from-amber-400 to-yellow-500', 'from-lime-400 to-green-500'].map((g, i) => (
          <div key={i} className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${g}`} />
        ))}
      </div>
    </div>
  );
}

/* ─── main layout ────────────────────────────────────────────── */
function DashboardLayout() {
  const { contacts, loading, createContact, updateContact, deleteContact } = useContacts();
  const [rightPanel, setRightPanel] = useState('welcome');
  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [contactFilter, setContactFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const exportContacts = () => {
    const json = JSON.stringify(contacts, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.json';
    a.click();
    URL.revokeObjectURL(url);
    setShowSettings(false);
  };

  const filteredContacts = useMemo(() => {
    let list = contactFilter === 'favorites' ? contacts.filter(c => c.favorite) : contacts;
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(c =>
      `${c.first_name ?? ''} ${c.last_name ?? ''}`.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.company_name?.toLowerCase().includes(q),
    );
  }, [contacts, search, contactFilter]);

  const openAddForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setRightPanel('form');
  };

  const openEditForm = (contact) => {
    const parts = contact.phone?.split(' ') ?? [];
    const addr = contact.addresses?.[0];
    setFormData({
      ...emptyForm,
      company_name: contact.company_name || '',
      first_name: contact.first_name || '',
      last_name: contact.last_name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      phone_part1: parts[0] ?? '',
      phone_part2: parts[1] ?? '',
      phone_part3: parts[2] ?? '',
      message_subject: contact.message_subject || 'Other',
      working_days: contact.working_days || '',
      notes: contact.notes || '',
      favorite: contact.favorite ?? false,
      addr_type: addr?.type || 'home',
      addr_street: addr?.street || '',
      addr_street_2: addr?.street_2 || '',
      addr_city: addr?.city || '',
      addr_region: addr?.region || '',
      addr_postal: addr?.postal_code || '',
      addr_country: addr?.country || '',
    });
    setEditingId(contact.id);
    setRightPanel('form');
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setSelectedContact(null);
    setRightPanel('welcome');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneValue =
      [formData.phone_part1, formData.phone_part2, formData.phone_part3].filter(Boolean).join(' ') ||
      formData.phone;

    const contact_info = [
      { type: 'email', value: formData.email || '' },
      { type: 'phone', value: phoneValue || '' },
    ].filter(i => i.value);

    const addresses = formData.addr_street
      ? [{ type: formData.addr_type || 'home', street: formData.addr_street, street_2: formData.addr_street_2 || undefined, city: formData.addr_city || '', region: formData.addr_region || undefined, postal_code: formData.addr_postal || undefined, country: formData.addr_country || '' }]
      : [];

    const payload = {
      company_name: formData.company_name || undefined,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email || undefined,
      phone: phoneValue || undefined,
      message_subject: formData.message_subject || undefined,
      working_days: formData.working_days || undefined,
      notes: formData.notes || undefined,
      favorite: formData.favorite,
      contact_info,
      addresses,
    };

    try {
      if (editingId) {
        await updateContact(editingId, payload);
      } else {
        await createContact(payload);
      }
      setFormData(emptyForm);
      setEditingId(null);
      setSelectedContact(null);
      setRightPanel('welcome');
    } catch {
      alert('Unable to save contact.');
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setRightPanel(selectedContact ? 'detail' : 'welcome');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-green-50">

      {/* ══════════════ SIDEBAR (desktop only) ══════════════ */}
      <aside className="relative hidden md:flex w-14 lg:w-64 shrink-0 flex-col bg-linear-to-b from-green-950 via-green-950 to-green-900 border-r border-white/5 overflow-hidden transition-all duration-300">

        {/* decorative glows */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-green-400/10 blur-2xl" />
        {/* decorative lime stripe */}
        <div className="pointer-events-none absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-lime-400/20 to-transparent" />

        {/* ── Logo ── */}
        <div className="flex items-center gap-3 border-b border-white/5 px-3 lg:px-5 py-5 shrink-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-900/50 ring-1 ring-amber-300/30">
            <BookUser size={18} className="text-green-900" />
          </div>
          <div className="hidden lg:block min-w-0">
            <p className="text-sm font-extrabold text-white leading-tight tracking-tight">ContactApp</p>
            <p className="text-[10px] text-green-500 tracking-widest uppercase">Address book</p>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 space-y-1 px-2 lg:px-3 py-5 overflow-y-auto">
          <p className="mb-3 px-2 text-[9px] font-bold uppercase tracking-widest text-green-700 hidden lg:block">Navigation</p>
          <NavItem
            icon={LayoutGrid}
            label="All Contacts"
            active={contactFilter === 'all' && rightPanel !== 'form'}
            onClick={() => {
              setContactFilter('all');
              setRightPanel(selectedContact ? 'detail' : 'welcome');
            }}
            badge={contacts.length}
          />
          <NavItem
            icon={Star}
            label="Favorites"
            active={contactFilter === 'favorites'}
            onClick={() => {
              setContactFilter('favorites');
              setSelectedContact(null);
              setRightPanel('welcome');
            }}
            badge={contacts.filter(c => c.favorite).length}
          />

          <div className="pt-2 lg:pt-3">
            <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-widest text-green-700 hidden lg:block">Actions</p>
            <NavItem
              icon={UserPlus}
              label="Add Contact"
              active={rightPanel === 'form' && !editingId}
              onClick={openAddForm}
              cta
            />
          </div>
        </nav>

        {/* ── Stats card (lg only) ── */}
        <div className="hidden lg:block border-t border-white/5 p-4 shrink-0">
          <div className="rounded-2xl bg-green-900/60 border border-white/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-bold uppercase tracking-widest text-green-600">Total Contacts</p>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/15">
                <BookUser size={9} className="text-amber-400" />
              </div>
            </div>
            <p className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              {contacts.length}
            </p>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-green-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-700"
                style={{ width: `${Math.min((contacts.length / 20) * 100, 100)}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <p className="text-[9px] text-green-700">{contacts.length} of 20</p>
              <p className="text-[9px] font-semibold text-amber-600">
                {Math.round((contacts.length / 20) * 100)}%
              </p>
            </div>

            {/* mini favorites strip */}
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-800/50 px-3 py-2">
              <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />
              <span className="text-[10px] text-green-400">
                <span className="font-bold text-amber-400">{contacts.filter(c => c.favorite).length}</span> favorites
              </span>
            </div>
          </div>
        </div>

        {/* ── Settings ── */}
        <div className="relative border-t border-white/5 p-2 lg:p-3 shrink-0">
          {/* settings popover */}
          {showSettings && (
            <div className="absolute bottom-full left-2 right-2 mb-2 rounded-2xl bg-green-900 border border-white/10 shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-500">Settings</p>
              </div>
              <div className="p-2 space-y-1">
                <button
                  onClick={exportContacts}
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-green-300 hover:bg-green-800 transition text-left"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-400/10">
                    <Plus size={12} className="text-amber-400 rotate-45" />
                  </span>
                  <span className="hidden lg:block">Export Contacts (JSON)</span>
                  <span className="lg:hidden">Export</span>
                </button>
                <div className="px-3 py-2 rounded-xl">
                  <p className="text-[10px] text-green-600">{contacts.length} contacts saved</p>
                </div>
              </div>
            </div>
          )}

          <button
            title="Settings"
            onClick={() => setShowSettings(s => !s)}
            className={`group flex w-full items-center gap-3 rounded-xl px-2 lg:px-3 py-2.5 text-xs font-semibold transition ${
              showSettings ? 'bg-green-800 text-green-200' : 'text-green-600 hover:bg-green-800/50 hover:text-green-300'
            }`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg group-hover:bg-green-700/60">
              <Settings size={14} className={showSettings ? 'rotate-45 transition-transform' : 'transition-transform'} />
            </span>
            <span className="hidden lg:block">Settings</span>
          </button>
        </div>
      </aside>

      {/* ══════════════ MAIN ══════════════ */}
      <main className="flex flex-1 overflow-hidden pb-16 md:pb-0">

        {/* ── Contact list panel ── */}
        <div className={`shrink-0 flex-col border-r border-green-100 bg-white overflow-hidden
          w-full md:w-72
          ${rightPanel !== 'welcome' ? 'hidden md:flex' : 'flex'}
        `}>

          {/* header */}
          <div className="border-b border-green-100 px-4 py-4 bg-white">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-green-900">
                {contactFilter === 'favorites' ? '⭐ Favorites' : 'Contacts'}
              </h2>
              <button
                onClick={openAddForm}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-green-800 text-white shadow-sm hover:from-green-500 hover:to-green-700 transition"
              >
                <Plus size={14} />
              </button>
            </div>
            {/* search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search contacts…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-xl border border-green-200 bg-green-50 py-2 pl-9 pr-8 text-sm text-slate-800 placeholder:text-green-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 transition"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* stats strip */}
          <div className="flex gap-4 border-b border-green-100 bg-green-50/60 px-4 py-2">
            <span className="text-[11px] text-green-600">
              <span className="font-bold text-green-800">{contacts.length}</span> total
            </span>
            <span className="text-[11px] text-amber-600">
              <span className="font-bold">{contacts.filter(c => c.favorite).length}</span> favorites
            </span>
          </div>

          {/* list */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-8 text-center text-sm text-green-400">Loading…</div>
            ) : filteredContacts.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
                    <BookUser size={22} className="text-green-500" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-green-800">
                  {search ? 'No results' : contactFilter === 'favorites' ? 'No favorites yet' : 'No contacts yet'}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {search ? 'Try a different search.' : contactFilter === 'favorites' ? 'Star a contact to see it here.' : 'Add your first contact.'}
                </p>
              </div>
            ) : (
              filteredContacts.map(c => (
                <ContactRow
                  key={c.id}
                  contact={c}
                  selected={selectedContact?.id === c.id}
                  onSelect={contact => { setSelectedContact(contact); setRightPanel('detail'); }}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className={`flex-1 overflow-hidden flex-col
          ${rightPanel === 'welcome' ? 'hidden md:flex' : 'flex'}
        `}>
          {rightPanel === 'form' ? (
            <div className="flex-1 overflow-y-auto bg-green-50 px-8 py-8">
              <div className="mx-auto max-w-xl">
                <div className="mb-7 flex items-center gap-4">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 rounded-xl border border-green-200 bg-white px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100 transition shadow-sm"
                  >
                    <ArrowLeft size={13} /> Back
                  </button>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                      {editingId ? 'Edit Contact' : 'New Contact'}
                    </p>
                    <h1 className="text-xl font-extrabold text-green-900">
                      {editingId ? 'Update details' : 'Add a contact'}
                    </h1>
                  </div>
                </div>
                <ContactForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  editing={Boolean(editingId)}
                  onCancel={handleCancel}
                  loading={loading}
                />
              </div>
            </div>
          ) : rightPanel === 'detail' && selectedContact ? (
            <DetailPanel
              contact={selectedContact}
              onEdit={() => openEditForm(selectedContact)}
              onDelete={() => handleDelete(selectedContact.id)}
              onBack={() => { setSelectedContact(null); setRightPanel('welcome'); }}
            />
          ) : (
            <WelcomePanel onAddNew={openAddForm} count={contacts.length} />
          )}
        </div>
      </main>

      {/* ══════════════ MOBILE BOTTOM NAV ══════════════ */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-green-950 border-t border-white/10 flex items-stretch h-16 z-50">
        <button
          onClick={() => { setContactFilter('all'); setSelectedContact(null); setRightPanel('welcome'); }}
          className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${
            contactFilter === 'all' && rightPanel !== 'form' ? 'text-amber-400' : 'text-green-600'
          }`}
        >
          <LayoutGrid size={20} />
          <span>Contacts</span>
        </button>

        <button
          onClick={() => { setContactFilter('favorites'); setSelectedContact(null); setRightPanel('welcome'); }}
          className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${
            contactFilter === 'favorites' ? 'text-amber-400' : 'text-green-600'
          }`}
        >
          <Star size={20} className={contactFilter === 'favorites' ? 'fill-amber-400' : ''} />
          <span>Favorites</span>
        </button>

        <button
          onClick={openAddForm}
          className="flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors ${
            rightPanel === 'form' ? 'bg-amber-400' : 'bg-green-700'
          }`}>
            <UserPlus size={18} className="text-white" />
          </div>
        </button>
      </nav>

    </div>
  );
}

export default DashboardLayout;
