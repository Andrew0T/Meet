import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData ] = useState([]);

  useEffect(() => {
    setData(() => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter((event) =>
        event.summary.split(' ').includes(genre)).length;
      return { name: genre, value };
    });
    return data.filter((genre) => genre.value !== 0);
  });
}, [events]);
  

  const colors = ["#524C9A", "#C9B7AD", "#CED3DC", "#ABA9C3", "#635C51"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width="50%" height="50%">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;