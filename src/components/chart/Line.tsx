

import '@mantine/charts/styles.css';
import { AreaChart } from '@mantine/charts';

// export const data = [
//     {
//       date: 'Mar 22',
//       Apples: 2890,
//       Oranges: 2338,
//       Tomatoes: 2452,
//     },
//     {
//       date: 'Mar 23',
//       Apples: 2756,
//       Oranges: 2103,
//       Tomatoes: 2402,
//     },
//     {
//       date: 'Mar 24',
//       Apples: 3322,
//       Oranges: 986,
//       Tomatoes: 1821,
//     },
//     {
//       date: 'Mar 25',
//       Apples: 3470,
//       Oranges: 2108,
//       Tomatoes: 2809,
//     },
//     {
//       date: 'Mar 26',
//       Apples: 3129,
//       Oranges: 1726,
//       Tomatoes: 2290,
//     },
//   ];
 export function CharatLine( {data}) {
  if (!data || data.length === 0) {
    return null;
  }

  const properties = Object.keys(data[0]);

  // Excluir la primera propiedad como el name
  const name = properties.slice(1);

  const colorArray = ['indigo.6', 'blue.1', 'teal.4'];
  // Obtener el array de series con name y color
  const series = name.map((property, index) => ({
    name: property,
    color: colorArray[index % colorArray.length], 
  }));

  console.log("series",series);
  
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={series}
      // series={[
      //   { name: 'total', color: 'indigo.6' },
      //   { name: 'Oranges', color: 'blue.6' },
      //   { name: 'Tomatoes', color: 'teal.6' },
      // ]}
      curveType="linear"
    />
  );
}