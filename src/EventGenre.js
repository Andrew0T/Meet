import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  useEffect(() => {
    setData(() => getData());
  }, [events]);

  const [data, setData ] = useState([]);

  const getData = () => {
    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
    const input = genres.map((genre) =>{
      const value = events.filter((event) => event.summary.split(" ").includes(genre)).length;
      return {name: genre, value};
    });
    const data = input.filter((genre) => genre.value !== 0);
    return data;
  }

  const colors = ["#BBFF66", "#000000", "#FF0000", "#FFFFFF", "#1221BB"];

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;