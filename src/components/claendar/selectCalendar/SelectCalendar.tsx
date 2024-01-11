import { Select, Group } from '@mantine/core';
import { useState } from 'react';
import { DatePicker,MonthPicker } from '@mantine/dates';
import { CalendarDayPicker} from "../Calendarday";
import '@mantine/dates/styles.css';


const componentsMap: Record<string, React.ReactNode> = {
 
  'One day': <CalendarDayPicker minDate={minDate} />,
  // 'From day, To day': null,
'One month': <MonthPicker/>
//   'All Days': null,
};

export function SelectOptionComponent() {
  const [selectedValue, setSelectedValue] = useState<string | null>('One day');
  const handleSelectChange = (value: string | null) => {
    console.log('valor', value);

    setSelectedValue(value);
  };
  return (
    <>
    <Group justify='center'>
      <Select
        label="Input label"
        description="Input description"
        placeholder="Select placeholder"
        defaultValue="One day"
        allowDeselect={false}
        onChange={handleSelectChange}
        data={['One day', 'From day, To day', 'One month', 'All Days']}
        value={selectedValue}
        />
    </Group>
    <Group justify='center'>

        {componentsMap[selectedValue ]}
    </Group>
        </>
  );
}
