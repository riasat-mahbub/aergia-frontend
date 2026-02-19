import { DateFormat } from '@/types/FormHolderTypes';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_ABBREVIATIONS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const DATE_FORMATS: { name: string; value: DateFormat; example: string }[] = [
  { name: 'MM-YYYY', value: 'mm-yyyy', example: '01-2024' },
  { name: 'DD-MM-YYYY', value: 'dd-mm-yyyy', example: '15-01-2024' },
  { name: 'DD-MM-YY', value: 'dd-mm-yy', example: '15-01-24' },
  { name: 'Month YYYY', value: 'month_name-yyyy', example: 'January 2024' },
  { name: 'Mon YYYY', value: 'mon-yyyy', example: 'Jan 2024' },
  { name: 'YYYY', value: 'yyyy', example: '2024' },
];

interface ParsedDate {
  year: number;
  month: number;
  day: number;
}

function parseDate(dateStr: string): ParsedDate | null {
  if (!dateStr || dateStr.trim() === '') return null;

  const normalized = dateStr.trim().toLowerCase();

  if (normalized === 'present' || normalized === 'current' || normalized === 'now') {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1, day: 1 };
  }

  const patterns = [
    /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/,
    /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/,
    /^(\d{1,2})-(\d{1,2})-(\d{2,4})$/,
    /^(\d{1,2})\/(\d{4})$/,
    /^(\d{1,2})-(\d{4})$/,
    /^(\d{4})$/,
  ];

  for (let i = 0; i < patterns.length; i++) {
    const match = normalized.match(patterns[i]);
    if (match) {
      if (i === 0) {
        return {
          year: parseInt(match[1], 10),
          month: parseInt(match[2], 10),
          day: match[3] ? parseInt(match[3], 10) : 1,
        };
      } else if (i >= 1 && i <= 3) {
        const year = match[3].length === 2 ? 2000 + parseInt(match[3], 10) : parseInt(match[3], 10);
        return {
          month: parseInt(match[1], 10),
          day: parseInt(match[2], 10),
          year,
        };
      } else if (i === 4 || i === 5) {
        return {
          month: parseInt(match[1], 10),
          year: parseInt(match[2], 10),
          day: 1,
        };
      } else {
        return {
          year: parseInt(match[1], 10),
          month: 1,
          day: 1,
        };
      }
    }
  }

  return null;
}

export function formatDate(dateStr: string, format: DateFormat): string {
  const parsed = parseDate(dateStr);
  if (!parsed) return dateStr;

  const { year, month, day } = parsed;

  switch (format) {
    case 'mm-yyyy':
      return `${String(month).padStart(2, '0')}-${year}`;

    case 'dd-mm-yyyy':
      return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;

    case 'dd-mm-yy':
      return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${String(year).slice(-2)}`;

    case 'month_name-yyyy':
      return `${MONTH_NAMES[month - 1]} ${year}`;

    case 'mon-yyyy':
      return `${MONTH_ABBREVIATIONS[month - 1]} ${year}`;

    case 'yyyy':
      return String(year);

    default:
      return `${String(month).padStart(2, '0')}-${year}`;
  }
}

export function formatDateRange(
  startDate: string,
  endDate: string,
  format: DateFormat,
  isCurrent: boolean = false
): string {
  const startFormatted = formatDate(startDate, format);
  
  if (isCurrent || !endDate || endDate.trim() === '') {
    return `${startFormatted} - Present`;
  }

  if (startDate === endDate) {
    return startFormatted;
  }

  const endFormatted = formatDate(endDate, format);
  return `${startFormatted} - ${endFormatted}`;
}

export function getDefaultDateFormat(): DateFormat {
  return 'mon-yyyy';
}
