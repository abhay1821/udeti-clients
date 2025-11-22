interface AppointmentData {
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
}

export const generateICS = (appointment: AppointmentData): string => {
  const formatDate = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };

  const escapeText = (text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  };

  return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Appointment Booking//EN
BEGIN:VEVENT
SUMMARY:${escapeText(appointment.title)}
DTSTART:${formatDate(appointment.start)}
DTEND:${formatDate(appointment.end)}
DESCRIPTION:${escapeText(appointment.description)}
LOCATION:${escapeText(appointment.location)}
END:VEVENT
END:VCALENDAR
  `.trim();
};

export const downloadICS = (
  icsContent: string,
  filename = 'appointment.ics'
): void => {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
