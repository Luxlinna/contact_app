import { UserPlus } from 'lucide-react';
import ContactCard from './ContactCard';
import ContactDetails from './ContactDetails';
import SearchBar from './SearchBar';

function ContactList({
  contacts,
  search,
  setSearch,
  onDelete,
  onEdit,
  onSelect,
  selectedContact,
  onCloseDetail,
}) {
  return (
    <div className="space-y-5">
      {/* toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <select className="shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
          <option>All Contacts</option>
          <option>Favorites</option>
          <option>Work</option>
        </select>
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50">
            <UserPlus size={26} className="text-indigo-400" />
          </div>
          <p className="text-base font-bold text-slate-700">No contacts here</p>
          <p className="mt-1 text-sm text-slate-400">
            {search ? 'Try a different search term.' : 'Add your first contact to get started.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
              onEdit={onEdit}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      <ContactDetails contact={selectedContact} onClose={onCloseDetail} />
    </div>
  );
}

export default ContactList;
