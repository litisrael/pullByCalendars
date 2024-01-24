import { useState, useMemo, useEffect } from 'react';
import { DatePicker, DatesProvider } from '@mantine/dates';
import { CharatLine } from '../chart/Line';
import dayjs from 'dayjs';
import { supabase } from '../../conection/client';

interface CalendarDayPickerProps {
  minDate?: Date;
  maxDate?: Date;
}

interface DateObject {
  date: string;
  total: number;
}

export const CalendarDayPicker: React.FC<CalendarDayPickerProps> = ({ minDate, maxDate }) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [chartData, setChartData] = useState<DateObject[]>([]);
  const [dataShipState, setDataShipState] = useState<DateObject[]>([]);

  const handleDateChange = async (newDates: [Date | null, Date | null]) => {
    const formattedStartDate = newDates[0]
      ? dayjs(newDates[0]).format('YYYY-MM-DD HH:mm:ss')
      : null;
    const formattedEndDate = newDates[1]
    ? dayjs(newDates[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
    : null;
    console.log('formated elegiste ', formattedStartDate, formattedEndDate);

    setValue(newDates);
    // Realizar la consulta a Supabase directamente en el componente
    if (formattedStartDate !== null && formattedEndDate !== null) {
      try {
        const { data, error } = await supabase
          .from('spapi_allOrders')
          .select('purchase_date, item_price')
          .gte('purchase_date', formattedStartDate) // Utiliza el nombre de tu columna de fecha y ajusta el operador según tus necesidades
          .lte('purchase_date', formattedEndDate);

        if (error) {
          console.error('Error al obtener datos de Supabase:', error);
        }
        if (data !== null) {
          const groupedData: DateObject[] = data.reduce((result, order) => {
            const dateKey = new Date(order.purchase_date).toLocaleDateString();
            result[dateKey] = (result[dateKey] || 0) + order.item_price;
            return result;
          }, {});

          // Convertir el objeto a un array de objetos
          const dataArray = Object.entries(groupedData).map(([date, total]) => ({
            date,
            total: parseFloat(total.toFixed(2)),
          }));
          dataArray.sort((a, b) => new Date(a.date) - new Date(b.date));

          setChartData(dataArray);
          console.log('dataArray', dataArray);

          const states = await supabase
            .from('spapi_allOrders')
            .select('purchase_date, ship_state')
            .gte('purchase_date', formattedStartDate) // Utiliza el nombre de tu columna de fecha y ajusta el operador según tus necesidades
            .lte('purchase_date', formattedEndDate);

          console.log('ju aju aju ', states);

   
// Inicializar un objeto para almacenar el recuento de estados
const stateCounts = {};

// Iterar sobre los resultados y contar el número de pedidos para cada estado
states.data.forEach(order => {
  const dateKey = new Date(order.purchase_date).toLocaleDateString();
  const state = order.ship_state;

  // Inicializar el objeto para la fecha si aún no existe
  stateCounts[dateKey] = stateCounts[dateKey] || {};
  // Incrementar el recuento para el estado correspondiente
  stateCounts[dateKey][state] = (stateCounts[dateKey][state] || 0) + 1;
});

// Convertir el objeto a un array de objetos
const dataStates = Object.entries(stateCounts).map(([date, stateCount]) => ({
  date,
  ...stateCount,
}));

console.log("stateCounts",stateCounts);

dataStates.sort((a, b) => new Date(a.date) - new Date(b.date));
setDataShipState(dataStates)
}
      } catch (error) {
        console.error('Error en la consulta a Supabase:', error);
      }
    }
  };



  return (
    <>
      <DatesProvider settings={{ timezone: 'America/New_York' }}>
        <DatePicker
          type="range"
          allowSingleDateInRange
          minDate={minDate}
          defaultDate={maxDate}
          maxDate={maxDate}
          value={value}
          onChange={handleDateChange}
        />
      </DatesProvider>

      <CharatLine data={chartData} />
  <CharatLine data={dataShipState} />
    </>
  );
};
