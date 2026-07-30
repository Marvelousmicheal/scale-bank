export type SettlementStatus = "Success" | "Processing" | "Failed" | "Pending";

export type Settlement = {
  slug: string;
  displayId: string;
  business: string;
  amount: string;
  bank: string;
  account: string;
  date: string;
  time: string;
  status: SettlementStatus;
};

export const settlements: Settlement[] = [
  { slug: "STL-3290", displayId: "TX-789034", business: "Macdel Stores Abuja", amount: "₦14,300,500", bank: "Access Bank", account: "•••• 9021", date: "03.02.2026", time: "12:45 PM", status: "Success" },
  { slug: "STL-3291", displayId: "TX-789034", business: "Macdel Stores Abuja", amount: "₦14,300,500", bank: "Providus Bank", account: "•••• 9021", date: "03.02.2026", time: "12:45 PM", status: "Success" },
  { slug: "STL-3292", displayId: "TX-789098", business: "Medhealth Kubwa", amount: "₦12,300,500", bank: "GT Bank", account: "•••• 9021", date: "03.02.2026", time: "12:45 PM", status: "Success" },
  { slug: "STL-3293", displayId: "TX-789098", business: "Medhealth Kubwa", amount: "₦12,300,500", bank: "Union Bank", account: "•••• 9021", date: "03.02.2026", time: "12:45 PM", status: "Processing" },
  { slug: "STL-3294", displayId: "TX-789021", business: "Agrofinatel Agricultural and Financial Institutions Garki", amount: "₦4,300,500", bank: "United Bank of Africa", account: "•••• 9021", date: "03.02.2026", time: "12:45 PM", status: "Failed" },
  { slug: "STL-3295", displayId: "TX-789021", business: "Agrofinatel Agricultural and Financial Institutions Garki", amount: "₦4,300,500", bank: "Moniepoint MFB", account: "•••• 9021", date: "03.02.2026", time: "12:45 PM", status: "Failed" },
  { slug: "STL-3296", displayId: "TX-789033", business: "Checkpoint Restaurants Wuse II", amount: "₦184,300", bank: "Kuda Bank", account: "•••• 9021", date: "03.02.2026", time: "12:45 PM", status: "Pending" },
  { slug: "STL-3297", displayId: "TX-789033", business: "Checkpoint Restaurants Wuse II", amount: "₦184,300", bank: "Fidelity Bank", account: "•••• 9021", date: "03.02.2026", time: "12:45 PM", status: "Success" },
];
