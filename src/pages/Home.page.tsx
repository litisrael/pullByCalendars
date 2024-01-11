import { SelectOptionComponent } from '../components/claendar/selectCalendar/SelectCalendar';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Container } from '@mantine/core';

export function HomePage() {
  return (
      <Container bg="var(--mantine-color-blue-light)" >

      <ColorSchemeToggle  />
      <SelectOptionComponent />
    
    </Container>
    
  );
}
