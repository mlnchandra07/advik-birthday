import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EVENT = {
  title: "Advik's 1st Birthday - Circus Carnival",
  description: "Join us for a magical Luxury Circus Carnival birthday celebration! RSVP: [your-site-url]",
  location: 'Park Hyatt, Hyderabad',
  startDate: '20260915T133000Z', // Sep 15 2026, 7:00 PM IST = 1:30 PM UTC
  endDate: '20260915T163000Z',   // Sep 15 2026, 10:00 PM IST = 4:30 PM UTC
};

function encodeParam(s: string) {
  return encodeURIComponent(s);
}

function getGoogleCalendarUrl() {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeParam(EVENT.title)}&dates=${EVENT.startDate}/${EVENT.endDate}&details=${encodeParam(EVENT.description)}&location=${encodeParam(EVENT.location)}`;
}

function getAppleCalendarData() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${EVENT.startDate}`,
    `DTEND:${EVENT.endDate}`,
    `SUMMARY:${EVENT.title}`,
    `DESCRIPTION:${EVENT.description}`,
    `LOCATION:${EVENT.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n');
  return `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;
}

function getOutlookCalendarUrl() {
  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeParam(EVENT.title)}&startdt=2026-09-15T19:00:00&enddt=2026-09-15T22:00:00&body=${encodeParam(EVENT.description)}&location=${encodeParam(EVENT.location)}`;
}

const SITE_URL = 'https://adorable-ascension.netlify.app'; // Update with actual URL

function getWhatsAppUrl() {
  const message = `🎪 You're invited to Advik's 1st Birthday!\n\n👑 *Advik Baragada* turns ONE!\n📅 September 15, 2026\n🕖 7:00 PM Onwards\n📍 Park Hyatt, Hyderabad\n\n✨ A Luxury Circus Carnival celebration awaits!\n\n🎟️ RSVP here: ${SITE_URL}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

const calendarButtons = [
  {
    label: 'Google Calendar',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.1)',
    action: () => window.open(getGoogleCalendarUrl(), '_blank'),
  },
  {
    label: 'Apple Calendar',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    color: '#555555',
    bg: 'rgba(85,85,85,0.08)',
    action: () => {
      const link = document.createElement('a');
      link.href = getAppleCalendarData();
      link.download = 'advik-birthday.ics';
      link.click();
    },
  },
  {
    label: 'Outlook',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6V2.55q0-.44.3-.75.3-.3.75-.3h12.fishing6q.45 0 .75.3.3.3.3.75V10.5q0 .04 0 .06v1.44zm-8-6h-4v1.9h4zm-4 3.8v1.9h4v-1.9zm4 5.7v-1.9h-4v1.9zM7.5 21.7h9v-1.9h-9zm9-3.8v-1.9h-9v1.9zM3.77 12.09q0-.3-.06-.62-.05-.32-.19-.63-.13-.3-.38-.5-.25-.21-.63-.21-.35 0-.6.17-.26.17-.43.45-.17.28-.26.63-.08.35-.08.73 0 .34.07.65.08.31.22.56.15.25.4.4.26.15.62.15.37 0 .63-.17.26-.17.42-.45.16-.29.24-.63.08-.35.08-.73zm1.78 3.15q-.79.57-1.75.57-.91 0-1.62-.32-.71-.32-1.18-.87-.47-.55-.7-1.27-.24-.72-.24-1.53 0-.76.22-1.46.22-.7.66-1.25.44-.55 1.13-.87.7-.33 1.62-.33.82 0 1.56.35.74.34 1.22.93.49.59.72 1.38.23.78.23 1.68v.35q0 .17-.01.17H3.84q.03.51.2.87.18.36.46.57.29.2.64.28.34.07.7.07.52 0 1.06-.2.54-.19.86-.5l.73.97z" />
      </svg>
    ),
    color: '#0078D4',
    bg: 'rgba(0,120,212,0.1)',
    action: () => window.open(getOutlookCalendarUrl(), '_blank'),
  },
];

export default function CalendarShare() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const shareWhatsApp = () => window.open(getWhatsAppUrl(), '_blank');

  const downloadPDF = () => {
    window.print();
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#FFF9F2' }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#A68B2A' }}
          >
            ✦ Save &amp; Share ✦
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: '#3B2F2F' }}>
            Add to Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Calendar
            </span>
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Calendar buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {calendarButtons.map((btn, i) => (
            <motion.button
              key={btn.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04, boxShadow: `0 10px 40px ${btn.color}25` }}
              whileTap={{ scale: 0.97 }}
              onClick={btn.action}
              className="flex items-center justify-center gap-3 p-5 rounded-2xl font-body font-semibold transition-all"
              style={{
                background: btn.bg,
                border: `1.5px solid ${btn.color}30`,
                color: btn.color,
              }}
            >
              {btn.icon}
              {btn.label}
            </motion.button>
          ))}
        </div>

        {/* Share section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
          <span className="font-body text-sm font-semibold tracking-widest" style={{ color: '#A68B2A' }}>SHARE INVITATION</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* WhatsApp */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 10px 40px rgba(37,211,102,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl font-body font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              boxShadow: '0 4px 20px rgba(37,211,102,0.2)',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share on WhatsApp
          </motion.button>

          {/* Copy link */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={copyLink}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl font-body font-semibold transition-all"
            style={{
              background: copied ? 'rgba(212,175,55,0.15)' : 'rgba(255,249,242,0.9)',
              border: '1.5px solid rgba(212,175,55,0.3)',
              color: '#A68B2A',
            }}
          >
            {copied ? (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Link Copied!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                Copy Link
              </>
            )}
          </motion.button>

          {/* Download PDF */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={downloadPDF}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl font-body font-semibold transition-all"
            style={{
              background: 'rgba(31,75,165,0.08)',
              border: '1.5px solid rgba(31,75,165,0.25)',
              color: '#1F4BA5',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </motion.button>

          {/* QR Code */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowQR(!showQR)}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl font-body font-semibold transition-all"
            style={{
              background: 'rgba(198,40,40,0.08)',
              border: '1.5px solid rgba(198,40,40,0.25)',
              color: '#C62828',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            QR Code
          </motion.button>
        </div>

        {/* QR Code modal */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mt-8 flex flex-col items-center gap-4 p-8 rounded-3xl"
              style={{
                background: 'rgba(255,249,242,0.9)',
                border: '1.5px solid rgba(212,175,55,0.3)',
                boxShadow: '0 10px 40px rgba(212,175,55,0.1)',
              }}
            >
              <p className="font-body text-sm font-semibold" style={{ color: '#6B4F4F' }}>
                Scan to open the invitation
              </p>
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'white', border: '2px solid rgba(212,175,55,0.3)' }}
              >
                {/* Simple QR placeholder — in production use react-qr-code */}
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <rect width="150" height="150" fill="white" />
                  <text x="75" y="80" textAnchor="middle" fontSize="12" fill="#3B2F2F" fontFamily="monospace">QR Code</text>
                  <text x="75" y="100" textAnchor="middle" fontSize="9" fill="#6B4F4F" fontFamily="monospace">{SITE_URL}</text>
                  {/* QR-like pattern */}
                  {[...Array(10)].map((_, i) =>
                    [...Array(10)].map((_, j) =>
                      Math.random() > 0.5 ? (
                        <rect key={`${i}-${j}`} x={15 + j * 12} y={15 + i * 12} width="10" height="10" fill="#3B2F2F" rx="1" />
                      ) : null
                    )
                  )}
                </svg>
              </div>
              <p className="font-body text-xs text-center" style={{ color: '#A68B2A' }}>
                Scan with your phone camera
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
