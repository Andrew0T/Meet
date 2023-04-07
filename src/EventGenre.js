import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData ] = useState([]);

  const getData = () => {
    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
    const data = genres.map((genre) =>{
      const value = events.filter((event) => event.summary.split(" ").includes(genre)).length;
      return {name: genre, value};
    });
    return data.filter((events) => events.value !== 0);
  };

  const colors = ["#BBFF66", "#000000", "#FF0000", "#FFFFFF", "#1221BB"];

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={90}
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