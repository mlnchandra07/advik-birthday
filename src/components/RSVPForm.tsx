import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Replace with the admin's WhatsApp number (with country code, no + or spaces)
// Example: India +91 98765 43210  →  919876543210
const ADMIN_WHATSAPP = '918639055564';

interface FormData {
  name: string;
  adults: number;
  kids: number;
  attending: 'yes' | 'no' | '';
  dietary: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  adults: 1,
  kids: 0,
  attending: '',
  dietary: '',
  message: '',
};

function buildWhatsAppMessage(data: FormData): string {
  const attendingText = data.attending === 'yes' ? '✅ YES — Will attend' : '❌ NO — Cannot attend';
  const totalGuests = data.adults + data.kids;

  const lines = [
    `🎪 *RSVP — Advik's 1st Birthday*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Name:* ${data.name}`,
    ``,
    `🎟️ *Attendance:* ${attendingText}`,
    ``,
    `👥 *Guests:* ${totalGuests} total`,
    `   • Adults: ${data.adults}`,
    `   • Kids: ${data.kids}`,
    data.dietary ? `🥗 *Dietary:* ${data.dietary}` : null,
    ``,
    data.message ? `💬 *Message:* ${data.message}` : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📅 *Event:* September 15, 2026`,
    `🕖 *Time:* 7:00 PM Onwards`,
    `📍 *Venue:* Park Hyatt, Hyderabad`,
  ];

  return lines.filter(Boolean).join('\n');
}

function openWhatsApp(data: FormData) {
  const message = buildWhatsAppMessage(data);
  const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function fireConfetti() {
  import('canvas-confetti').then(({ default: confetti }) => {
    const colors = ['#D4AF37', '#F0D060', '#C62828', '#1F4BA5', '#FF6B35', '#ffffff'];
    const burst = (x: number, y: number) => {
      confetti({ particleCount: 80, spread: 80, origin: { x, y }, colors, startVelocity: 45 });
    };
    burst(0.2, 0.5);
    setTimeout(() => burst(0.8, 0.5), 200);
    setTimeout(() => burst(0.5, 0.3), 400);
    setTimeout(() => {
      confetti({ particleCount: 150, spread: 120, origin: { x: 0.5, y: 0.6 }, colors, shapes: ['star'], startVelocity: 60 });
    }, 600);
  });
}

function InputField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-body text-sm font-semibold" style={{ color: '#3B2F2F' }}>
        {label}
        {required && <span style={{ color: '#C62828' }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = `
  w-full px-5 py-3.5 rounded-2xl font-body text-sm outline-none transition-all duration-300
  border focus:border-gold-DEFAULT
`.trim();

const inputStyle = {
  background: 'rgba(255,249,242,0.9)',
  border: '1.5px solid rgba(212,175,55,0.25)',
  color: '#3B2F2F',
};

const inputFocusStyle = {
  borderColor: '#D4AF37',
  boxShadow: '0 0 0 3px rgba(212,175,55,0.15)',
};

export default function RSVPForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const update = (key: keyof FormData, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.attending) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    // Open WhatsApp FIRST — must be synchronous inside user gesture
    openWhatsApp(form);

    // Then show success UI and confetti
    setSubmitted(true);
    setLoading(false);
    fireConfetti();
  };

  const getInputStyle = (field: string) => ({
    ...inputStyle,
    ...(focusedField === field ? inputFocusStyle : {}),
  });

  return (
    <section
      id="rsvp"
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF9F2 0%, #F5E6D3 100%)',
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C62828, transparent)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: 'repeating-linear-gradient(90deg, #C62828 0px, #C62828 20px, #FFF9F2 20px, #FFF9F2 40px, #D4AF37 40px, #D4AF37 60px, #FFF9F2 60px, #FFF9F2 80px)',
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#A68B2A' }}
          >
            ✦ Kindly Respond By Sep 10 ✦
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: '#3B2F2F' }}>
            RSVP{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Here
            </span>
          </h2>
          <p className="font-body text-base" style={{ color: '#6B4F4F' }}>
            Let us know you're coming to the celebration! 🎉
          </p>
          <div className="gold-divider mt-6" />
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            /* Success state */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center py-16 px-8 rounded-3xl"
              style={{
                background: 'rgba(255,249,242,0.9)',
                border: '2px solid rgba(212,175,55,0.3)',
                boxShadow: '0 20px 60px rgba(212,175,55,0.15)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-7xl mb-6"
              >
                🎉
              </motion.div>
              <h3 className="font-display text-4xl font-bold mb-4" style={{ color: '#3B2F2F' }}>
                Thank You!
              </h3>
              <p className="font-body text-xl mb-3" style={{ color: '#6B4F4F' }}>
                {form.name}, we can't wait to celebrate with you! 🎊
              </p>
              <p className="font-body text-base mb-2" style={{ color: '#A68B2A' }}>
                "We can't wait to celebrate with you."
              </p>
              <div
                className="mt-6 px-5 py-3 rounded-2xl inline-flex items-center gap-2"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)' }}
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-body text-sm font-medium" style={{ color: '#128C7E' }}>
                  WhatsApp is opening — please tap Send!
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
                <span style={{ color: '#D4AF37', fontSize: '1.5rem' }}>✦</span>
                <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="text-3xl"
                >🎈</motion.span>
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="text-3xl"
                >🎪</motion.span>
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  className="text-3xl"
                >🎂</motion.span>
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                  className="text-3xl"
                >🎠</motion.span>
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
                  className="text-3xl"
                >✨</motion.span>
              </div>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
              style={{
                background: 'rgba(255,249,242,0.85)',
                border: '1px solid rgba(212,175,55,0.25)',
                boxShadow: '0 20px 60px rgba(59,47,47,0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Corner ornaments */}
              <span className="absolute top-4 left-4 text-xl opacity-30" style={{ color: '#D4AF37' }}>✦</span>
              <span className="absolute top-4 right-4 text-xl opacity-30" style={{ color: '#D4AF37' }}>✦</span>
              <span className="absolute bottom-4 left-4 text-xl opacity-30" style={{ color: '#D4AF37' }}>✦</span>
              <span className="absolute bottom-4 right-4 text-xl opacity-30" style={{ color: '#D4AF37' }}>✦</span>

              <div className="space-y-6">
                {/* Name */}
                <InputField label="Your Name" required>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass}
                    style={getInputStyle('name')}
                    required
                    aria-label="Your name"
                  />
                </InputField>

                {/* Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Number of Adults" required>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110"
                        style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1.5px solid rgba(212,175,55,0.3)' }}
                        onClick={() => update('adults', Math.max(1, form.adults - 1))}
                        aria-label="Decrease adults"
                      >
                        −
                      </button>
                      <span className="font-display text-2xl font-bold w-8 text-center" style={{ color: '#3B2F2F' }}>
                        {form.adults}
                      </span>
                      <button
                        type="button"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110"
                        style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1.5px solid rgba(212,175,55,0.3)' }}
                        onClick={() => update('adults', form.adults + 1)}
                        aria-label="Increase adults"
                      >
                        +
                      </button>
                    </div>
                  </InputField>

                  <InputField label="Number of Kids">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110"
                        style={{ background: 'rgba(198,40,40,0.12)', color: '#C62828', border: '1.5px solid rgba(198,40,40,0.25)' }}
                        onClick={() => update('kids', Math.max(0, form.kids - 1))}
                        aria-label="Decrease kids"
                      >
                        −
                      </button>
                      <span className="font-display text-2xl font-bold w-8 text-center" style={{ color: '#3B2F2F' }}>
                        {form.kids}
                      </span>
                      <button
                        type="button"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110"
                        style={{ background: 'rgba(198,40,40,0.12)', color: '#C62828', border: '1.5px solid rgba(198,40,40,0.25)' }}
                        onClick={() => update('kids', form.kids + 1)}
                        aria-label="Increase kids"
                      >
                        +
                      </button>
                    </div>
                  </InputField>
                </div>

                {/* Attendance */}
                <InputField label="Will You Attend?" required>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { value: 'yes', label: '🎉 Yes, I\'ll be there!', color: '#D4AF37' },
                      { value: 'no', label: '😢 Sorry, can\'t make it', color: '#C62828' },
                    ] as const).map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all"
                        style={{
                          border: `2px solid ${form.attending === opt.value ? opt.color : 'rgba(212,175,55,0.2)'}`,
                          background: form.attending === opt.value
                            ? `${opt.color}15`
                            : 'rgba(255,249,242,0.5)',
                        }}
                      >
                        <input
                          type="radio"
                          name="attending"
                          value={opt.value}
                          checked={form.attending === opt.value}
                          onChange={(e) => update('attending', e.target.value as 'yes' | 'no')}
                          className="sr-only"
                        />
                        <div
                          className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                          style={{
                            border: `2px solid ${opt.color}`,
                            background: form.attending === opt.value ? opt.color : 'transparent',
                          }}
                        >
                          {form.attending === opt.value && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="font-body text-sm font-medium" style={{ color: '#3B2F2F' }}>
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </InputField>

                {/* Dietary */}
                <InputField label="Dietary Requirements">
                  <input
                    type="text"
                    placeholder="Vegetarian, Vegan, Allergies, etc."
                    value={form.dietary}
                    onChange={(e) => update('dietary', e.target.value)}
                    onFocus={() => setFocusedField('dietary')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass}
                    style={getInputStyle('dietary')}
                    aria-label="Dietary requirements"
                  />
                </InputField>

                {/* Message */}
                <InputField label="Leave a Message">
                  <textarea
                    rows={3}
                    placeholder="Share your excitement or a special wish for Advik! 🎈"
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass}
                    style={{ ...getInputStyle('message'), resize: 'none' }}
                    aria-label="Message"
                  />
                </InputField>

                {/* Error */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-body text-sm font-medium text-center py-3 px-4 rounded-xl"
                    style={{ background: 'rgba(198,40,40,0.08)', color: '#C62828', border: '1px solid rgba(198,40,40,0.2)' }}
                  >
                    ⚠️ {error}
                  </motion.p>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, boxShadow: '0 15px 50px rgba(212,175,55,0.5)' } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="w-full py-5 rounded-2xl font-body font-bold text-lg text-black transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)',
                    boxShadow: '0 8px 30px rgba(212,175,55,0.35)',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                      />
                      Submitting...
                    </span>
                  ) : (
                    '🎟️ Confirm RSVP'
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
