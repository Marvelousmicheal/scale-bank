"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const revenue = [
  { name: "Week 1", volume: 400, revenue: 670 }, { name: "", volume: 590, revenue: 420 },
  { name: "Week 2", volume: 640, revenue: 590 }, { name: "", volume: 710, revenue: 930 },
  { name: "", volume: 910, revenue: 800 }, { name: "Week 3", volume: 620, revenue: 980 },
  { name: "", volume: 690, revenue: 620 }, { name: "", volume: 650, revenue: 550 }, { name: "Week 4", volume: 790, revenue: 240 },
];
const channels = [{ name: "POS Payments", value: 45 }, { name: "Transfer", value: 30 }, { name: "QR", value: 20 }, { name: "NFC", value: 15 }];
const colors = ["#20E67C", "#6C57E4", "#F4B51C", "#019ED7"];
const locations = [{ name: "Abuja", value: 856 }, { name: "Lagos", value: 646 }, { name: "Kano", value: 769 }, { name: "Rivers", value: 781 }, { name: "Others", value: 710 }];
const pos = ["856","646","769","781","710","710","710"].map((value,index) => ({ name: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][index], value: Number(value) }));
const users = [{ name: "Week 1", value: 700 }, { name: "Week 2", value: 400 }, { name: "Week 3", value: 800 }, { name: "Week 4", value: 550 }];

function Header({ title, subtitle, monthly = false }: { title: string; subtitle: string; monthly?: boolean }) {
  return <div className="mb-4 flex justify-between"><div><h2 className="text-xl font-bold">{title}</h2><p className="text-sm text-[#707EAE]">{subtitle}</p></div><button className="h-[34px] rounded-[8px] border border-light-gray/10 px-4 text-sm text-[#8E8E93]">{monthly ? "Monthly" : "Weekly"}　⌄</button></div>;
}
const axis = { fill: "#77758B", fontSize: 12 };

export default function ReportCharts() {
  return <>
    <section className="rounded-[12px] bg-app-black p-[15px]"><Header title="Revenue & Transaction Volume" subtitle="Weekly performance overview" /><div className="h-[320px] rounded-[12px] border border-light-gray/10 p-4"><ResponsiveContainer><LineChart data={revenue}><CartesianGrid stroke="#262333" strokeDasharray="5 5" /><XAxis dataKey="name" tick={axis} /><YAxis domain={[0,1000]} tick={axis} /><Tooltip /><Line type="linear" dataKey="volume" stroke="#20E67C" strokeWidth={2} dot={false} /><Line type="linear" dataKey="revenue" stroke="#01AEF0" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></section>
    <section className="grid grid-cols-2 gap-[15px]">
      <article className="rounded-[12px] bg-app-black p-[15px]"><Header title="Payment Channels Performance" subtitle="Distribution by payment method" /><div className="flex h-[270px]"><div className="w-1/2"><ResponsiveContainer><PieChart><Pie data={channels} innerRadius={62} outerRadius={88} dataKey="value" stroke="none">{channels.map((entry,index) => <Cell key={entry.name} fill={colors[index]} />)}</Pie></PieChart></ResponsiveContainer></div><div className="flex flex-1 flex-col justify-center gap-7">{channels.map((entry,index) => <div key={entry.name} className="text-sm" style={{color: colors[index]}}>● {entry.name}: <span className="text-[#BEC2DA]">{entry.value}%</span></div>)}</div></div></article>
      <article className="rounded-[12px] bg-app-black p-[15px]"><Header title="Transactions by Location" subtitle="Regional distribution" /><div className="h-[270px]"><ResponsiveContainer><BarChart data={locations} layout="vertical"><CartesianGrid stroke="#262333" strokeDasharray="3 3" /><XAxis type="number" tick={axis} /><YAxis type="category" dataKey="name" tick={axis} width={55} /><Tooltip /><Bar dataKey="value" fill="#2379D8" /></BarChart></ResponsiveContainer></div></article>
      <article className="rounded-[12px] bg-app-black p-[15px]"><Header title="POS Performance (₦M)" subtitle="Weekly device usage trend" /><div className="h-[270px]"><ResponsiveContainer><BarChart data={pos}><CartesianGrid stroke="#262333" strokeDasharray="3 3" /><XAxis dataKey="name" tick={axis} /><YAxis tick={axis} /><Tooltip /><Bar dataKey="value" fill="#2379D8" /></BarChart></ResponsiveContainer></div></article>
      <article className="rounded-[12px] bg-app-black p-[15px]"><Header title="User Growth" subtitle="New users per distribution" monthly /><div className="h-[270px]"><ResponsiveContainer><BarChart data={users}><CartesianGrid vertical={false} stroke="#77758B" strokeDasharray="5 5" /><XAxis dataKey="name" tick={axis} /><Tooltip /><Bar dataKey="value" fill="#E9EDF7" radius={[7,7,0,0]} /></BarChart></ResponsiveContainer></div></article>
    </section>
  </>;
}
