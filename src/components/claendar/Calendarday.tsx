import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

interface CalendarDayPickerProps {
    minDate?: Date; // Añadir ? para que la prop sea opcional
    maxDate?: Date
}

export const CalendarDayPicker: React.FC<CalendarDayPickerProps> = ({ minDate, maxDate  }) => {
  const [value, setValue] = useState<Date | null>(null);

  return <DatePicker
  minDate={minDate}
  defaultDate={maxDate}
  maxDate={maxDate } value={value} onChange={setValue} />;
};
