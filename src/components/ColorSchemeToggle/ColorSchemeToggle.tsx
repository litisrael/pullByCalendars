import React from 'react';
import { Switch, useMantineColorScheme, useComputedColorScheme, rem ,Group} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleToggleChange = () => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  };

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color="yellow" // Cambiado para utilizar el color directamente
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color="blue" // Cambiado para utilizar el color directamente
    />
  );

  return (
    <Group justify="end"> 
    <Switch 

size="md"
color="dark.4"
onLabel={sunIcon}
offLabel={moonIcon}
checked={computedColorScheme === 'dark'} // Asegúrate de que el interruptor refleje el esquema de color actual
onChange={handleToggleChange}
/>
</Group>
  );
}
