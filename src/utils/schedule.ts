import { differenceInDays, startOfDay } from 'date-fns';

export type DayStatus = 'work' | 'off';

// Base date: Monday, March 23, 2026 (Start of Week A)
// Based on the user's description:
// Thu (Today, 26/03/2026): Off
// Fri, Sat, Sun: Work
// Mon, Tue (Next): Off
// Wed, Thu (Next): Work
// Fri, Sat, Sun (Next): Off
const BASE_DATE = new Date(2026, 2, 23); // March is 2 (0-indexed)

const SCHEDULE_PATTERN: DayStatus[] = [
  'work', 'work', // Mon, Tue (Week A)
  'off',  'off',  // Wed, Thu (Week A) - Today (Thu) is Day 3
  'work', 'work', 'work', // Fri, Sat, Sun (Week A)
  'off',  'off',  // Mon, Tue (Week B)
  'work', 'work', // Wed, Thu (Week B)
  'off',  'off',  'off'  // Fri, Sat, Sun (Week B)
];

export function getDayStatus(date: Date): DayStatus {
  const normalizedDate = startOfDay(date);
  const normalizedBase = startOfDay(BASE_DATE);
  
  // Calculate difference in days. handle negative differences for dates before BASE_DATE
  const diff = differenceInDays(normalizedDate, normalizedBase);
  
  // Modulo in JS can be negative, so we normalize it to [0, 13]
  const index = ((diff % 14) + 14) % 14;
  
  return SCHEDULE_PATTERN[index];
}
