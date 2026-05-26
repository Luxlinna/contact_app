import { User, Mail, Phone, MessageSquare, Send, Star, MapPin, Calendar } from 'lucide-react';

const field =
  'w-full rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-slate-800 transition focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-100';

const lbl = 'block text-xs font-semibold text-green-700 mb-1.5';

function Section({ icon: Icon, title, color, children }) {
  return (
    <div className="rounded-2xl bg-white border border-green-100 shadow-sm p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${color}`}>
          <Icon size={15} className="text-white" />
        </span>
        <h3 className="text-sm font-bold text-green-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ContactForm({ formData, setFormData, onSubmit, editing, loading }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      {/* Personal */}
      <Section icon={User} title="Personal Information" color="bg-gradient-to-br from-green-700 to-green-900">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>First Name</label>
              <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="John" className={field} />
            </div>
            <div>
              <label className={lbl}>Last Name</label>
              <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Doe" className={field} />
            </div>
          </div>
          <div>
            <label className={lbl}>Company <span className="font-normal text-green-400">(optional)</span></label>
            <input name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Acme Corp" className={field} />
          </div>
        </div>
      </Section>

      {/* Contact details */}
      <Section icon={Mail} title="Contact Details" color="bg-gradient-to-br from-green-600 to-emerald-700">
        <div className="space-y-3">
          <div>
            <label className={lbl}>Email Address</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={field} />
          </div>
          <div>
            <label className={lbl}>Phone Number</label>
            <div className="grid grid-cols-3 gap-2">
              <input name="phone_part1" value={formData.phone_part1} onChange={handleChange} placeholder="###" className={field} />
              <input name="phone_part2" value={formData.phone_part2} onChange={handleChange} placeholder="###" className={field} />
              <input name="phone_part3" value={formData.phone_part3} onChange={handleChange} placeholder="####" className={field} />
            </div>
          </div>
          <div>
            <label className={lbl}>Working Days <span className="font-normal text-green-400">(optional)</span></label>
            <input name="working_days" value={formData.working_days} onChange={handleChange} placeholder="e.g. Mon – Fri, 9am – 5pm" className={field} />
          </div>
        </div>
      </Section>

      {/* Address */}
      <Section icon={MapPin} title="Address" color="bg-gradient-to-br from-amber-500 to-yellow-600">
        <div className="space-y-3">
          <div>
            <label className={lbl}>Address Type</label>
            <select name="addr_type" value={formData.addr_type} onChange={handleChange} className={field}>
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className={lbl}>Street Address</label>
            <input name="addr_street" value={formData.addr_street} onChange={handleChange} placeholder="123 Main Street" className={field} />
          </div>
          <div>
            <label className={lbl}>Apt / Suite <span className="font-normal text-green-400">(optional)</span></label>
            <input name="addr_street_2" value={formData.addr_street_2} onChange={handleChange} placeholder="Apt 4B" className={field} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>City</label>
              <input name="addr_city" value={formData.addr_city} onChange={handleChange} placeholder="New York" className={field} />
            </div>
            <div>
              <label className={lbl}>State / Region</label>
              <input name="addr_region" value={formData.addr_region} onChange={handleChange} placeholder="NY" className={field} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Postal Code</label>
              <input name="addr_postal" value={formData.addr_postal} onChange={handleChange} placeholder="10001" className={field} />
            </div>
            <div>
              <label className={lbl}>Country</label>
              <input name="addr_country" value={formData.addr_country} onChange={handleChange} placeholder="United States" className={field} />
            </div>
          </div>
        </div>
      </Section>

      {/* Message */}
      <Section icon={MessageSquare} title="Message & Notes" color="bg-gradient-to-br from-green-800 to-green-950">
        <div className="space-y-3">
          <div>
            <label className={lbl}>Subject</label>
            <select name="message_subject" value={formData.message_subject} onChange={handleChange} className={field}>
              <option>Other</option>
              <option>New supplier</option>
              <option>Update request</option>
              <option>Support</option>
            </select>
          </div>
          <div>
            <label className={lbl}>Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any extra notes about this contact…" rows={3} className={`${field} resize-none`} />
          </div>
        </div>
      </Section>

      {/* Favorite */}
      <div className="flex items-center gap-3 rounded-2xl bg-white border border-green-100 shadow-sm px-5 py-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="favorite"
            checked={formData.favorite}
            onChange={handleChange}
            className="h-4 w-4 rounded border-green-300 text-amber-500 focus:ring-amber-400"
          />
          <Star size={15} className={formData.favorite ? 'text-amber-500 fill-amber-500' : 'text-slate-300'} />
          <span className="text-sm font-medium text-green-800">Mark as favorite contact</span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-700 to-green-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/30 transition hover:from-green-600 hover:to-green-800 active:scale-[0.98] disabled:opacity-50"
      >
        <Send size={15} />
        {loading ? 'Saving…' : editing ? 'Update Contact' : 'Save Contact'}
      </button>

    </form>
  );
}

export default ContactForm;
