export type TransactionStatus = "Success" | "Reversed" | "Failed" | "Pending";

export type Transaction = {
  slug: string;
  displayId: string;
  type: string;
  business: string;
  amount: string;
  fee: string;
  date: string;
  time: string;
  status: TransactionStatus;
};

export const transactions: Transaction[] = [
  { slug: "TXN-98321", displayId: "TX-789034", type: "POS", business: "Macdel Stores Abuja", amount: "₦14,300,500", fee: "₦100.30", date: "03.02.2026", time: "12:45 PM", status: "Success" },
  { slug: "TXN-98322", displayId: "TX-789034", type: "POS", business: "Macdel Stores Abuja", amount: "₦14,300,500", fee: "₦100.30", date: "03.02.2026", time: "12:45 PM", status: "Success" },
  { slug: "TXN-98323", displayId: "TX-789098", type: "Transfer", business: "Medhealth Kubwa", amount: "₦12,300,500", fee: "₦100.30", date: "03.02.2026", time: "12:45 PM", status: "Success" },
  { slug: "TXN-98324", displayId: "TX-789098", type: "Transfer", business: "Medhealth Kubwa", amount: "₦12,300,500", fee: "₦100.30", date: "03.02.2026", time: "12:45 PM", status: "Reversed" },
  { slug: "TXN-98325", displayId: "TX-789021", type: "Card", business: "Agrofinatel Agricultural and Financial Institutions Garki", amount: "₦4,300,500", fee: "₦100.30", date: "03.02.2026", time: "12:45 PM", status: "Failed" },
  { slug: "TXN-98326", displayId: "TX-789021", type: "Card", business: "Agrofinatel Agricultural and Financial Institutions Garki", amount: "₦4,300,500", fee: "₦100.30", date: "03.02.2026", time: "12:45 PM", status: "Failed" },
  { slug: "TXN-98327", displayId: "TX-789033", type: "NFC", business: "Checkpoint Restaurants Wuse II", amount: "₦184,300", fee: "₦100.30", date: "03.02.2026", time: "12:45 PM", status: "Pending" },
  { slug: "TXN-98328", displayId: "TX-789033", type: "NFC", business: "Checkpoint Restaurants Wuse II", amount: "₦184,300", fee: "₦100.30", date: "03.02.2026", time: "12:45 PM", status: "Success" },
];
