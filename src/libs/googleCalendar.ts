/**
 * Google Calendar API Utility for habit tracking.
 */

export interface DailyStudyTime {
  date: string; // YYYY-MM-DD
  minutes: number;
}

/**
 * Fetches events from Google Calendar and returns aggregated study time per day.
 * @param apiKey Google Calendar API Key
 * @param calendarId Google Calendar ID (e.g. primary or email)
 * @param timeMin ISO string for start time
 * @param timeMax ISO string for end time
 */
export async function fetchStudyTime(
  apiKey: string,
  calendarId: string,
  timeMin: string,
  timeMax: string
): Promise<Record<string, number>> {
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
  url.searchParams.append('key', apiKey);
  url.searchParams.append('timeMin', timeMin);
  url.searchParams.append('timeMax', timeMax);
  url.searchParams.append('singleEvents', 'true');
  url.searchParams.append('orderBy', 'startTime');

  const response = await fetch(url.toString());
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Google Calendar API Error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const events = data.items || [];

  const studyTimeByDay: Record<string, number> = {};

  events.forEach((event: any) => {
    const start = event.start.dateTime || event.start.date;
    const end = event.end.dateTime || event.end.date;
    
    if (!start || !end) return;

    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Calculate duration in minutes
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationMinutes = Math.floor(durationMs / (1000 * 60));

    // Group by YYYY-MM-DD
    const dateKey = startDate.toISOString().split('T')[0];
    
    // Add to daily total (handling cases where events might span across midnight, though simplified here)
    studyTimeByDay[dateKey] = (studyTimeByDay[dateKey] || 0) + durationMinutes;
  });

  return studyTimeByDay;
}

/**
 * Generates an array of all days for the last year (or specified range).
 */
export function getCalendarDays(daysBack = 365) {
  const days = [];
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - daysBack);

  // Adjust start to the previous Sunday to align the grid
  while (start.getDay() !== 0) {
    start.setDate(start.getDate() - 1);
  }

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d).toISOString().split('T')[0]);
  }
  return days;
}
