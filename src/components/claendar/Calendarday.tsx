import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

interface CalendarDayPickerProps {
    minDate?: Date; // Añadir ? para que la prop sea opcional
}

export const CalendarDayPicker: React.FC<CalendarDayPickerProps> = ({ minDate  }) => {
  const [value, setValue] = useState<Date | null>(null);

  return <DatePicker
  minDate={minDate}
  maxDate={new Date() } value={value} onChange={setValue} />;
};
