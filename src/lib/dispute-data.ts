export type DisputeStatus = "Under Review" | "Pending" | "Resolved" | "Rejected";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export type Dispute = {
  slug: string;
  disputeId: string;
  transactionId: string;
  user: string;
  business: string;
  type: string;
  amount: string;
  priority: Priority;
  status: DisputeStatus;
};

export const disputes: Dispute[] = [
  { slug: "DSP-1291", disputeId: "TX-789098", transactionId: "TX-789098", user: "Mustapha Danjuma", business: "Danuma Industries", type: "Unauthorized Payment", amount: "₦12,300,500", priority: "Medium", status: "Under Review" },
  { slug: "DSP-1292", disputeId: "TX-789033", transactionId: "TX-789033", user: "Mgborogwu Godswill", business: "Mujhiz Holdings", type: "Incorrect amount", amount: "₦184,300", priority: "Low", status: "Pending" },
  { slug: "DSP-1293", disputeId: "TX-789034", transactionId: "TX-789034", user: "Chinwe Okafor", business: "Macdel Stores Abuja", type: "Duplicate Charge", amount: "₦14,300,500", priority: "Critical", status: "Resolved" },
  { slug: "DSP-1294", disputeId: "TX-789034", transactionId: "TX-789034", user: "Providus Bank", business: "Medhealth", type: "Duplicate Charge", amount: "₦14,300,500", priority: "Medium", status: "Resolved" },
  { slug: "DSP-1295", disputeId: "TX-789098", transactionId: "TX-789098", user: "Osaze Iganda", business: "Penusula Stores", type: "Incorrect amount", amount: "₦12,300,500", priority: "High", status: "Resolved" },
  { slug: "DSP-1296", disputeId: "TX-789021", transactionId: "TX-789021", user: "Emeka kingsley", business: "Enviable Logistics", type: "Duplicate Charge", amount: "₦4,300,500", priority: "Low", status: "Resolved" },
  { slug: "DSP-1297", disputeId: "TX-789021", transactionId: "TX-789021", user: "Bourgundey Aspard", business: "Aspard Automobiles", type: "Unauthorized Payment", amount: "₦4,300,500", priority: "High", status: "Rejected" },
  { slug: "DSP-1298", disputeId: "TX-789033", transactionId: "TX-789033", user: "Muhammad Manga", business: "Manga Automobiles", type: "Services not received", amount: "₦184,300", priority: "Critical", status: "Resolved" },
];
