export type TerminalStatus = "Online" | "Suspended" | "Unassigned";

export type PosTerminal = {
  id: string;
  serialNumber: string;
  business: string;
  owner: string;
  location: string;
  address: string;
  todayVolume: string;
  monthlyVolume: string;
  lastActivity: string;
  status: TerminalStatus;
  firmware: string;
  battery: number;
  signal: string;
};

export const posTerminals: PosTerminal[] = [
  {
    id: "POS-4391",
    serialNumber: "SN88403921",
    business: "Global Start",
    owner: "Okechukwu Valentine",
    location: "Lokogoma, Abuja",
    address: "No 44 Efab Estate Lokogoma, Abuja",
    todayVolume: "₦142,000",
    monthlyVolume: "₦12,400,000",
    lastActivity: "2 mins ago",
    status: "Online",
    firmware: "v1.4.3",
    battery: 84,
    signal: "Strong",
  },
  {
    id: "POS-4418",
    serialNumber: "SN88404418",
    business: "TechStark Corp",
    owner: "Adesanya Khabib",
    location: "Ogbomosho, Lagos",
    address: "12 Unity Road, Ogbomosho, Lagos",
    todayVolume: "₦1,440,300,500",
    monthlyVolume: "₦18,200,000",
    lastActivity: "4 mins ago",
    status: "Online",
    firmware: "v1.4.3",
    battery: 76,
    signal: "Strong",
  },
  {
    id: "POS-3820",
    serialNumber: "SN88403820",
    business: "Skyline Logistics",
    owner: "Aljaxa Francis",
    location: "Garki, Abuja",
    address: "Garki Area 3, Abuja",
    todayVolume: "₦0",
    monthlyVolume: "₦4,200,000",
    lastActivity: "14 days ago",
    status: "Suspended",
    firmware: "v1.3.9",
    battery: 12,
    signal: "Offline",
  },
  {
    id: "POS-5098",
    serialNumber: "SN88405098",
    business: "Main St. Cafe",
    owner: "Anastasia Priscilla",
    location: "Katampe, Abuja",
    address: "5 Katampe Road, Abuja",
    todayVolume: "₦102,300,500",
    monthlyVolume: "₦9,840,000",
    lastActivity: "35 mins ago",
    status: "Online",
    firmware: "v1.4.2",
    battery: 61,
    signal: "Good",
  },
  {
    id: "POS-5210",
    serialNumber: "SN88405210",
    business: "Unassigned",
    owner: "In warehouse",
    location: "—",
    address: "Central inventory",
    todayVolume: "₦0",
    monthlyVolume: "₦0",
    lastActivity: "—",
    status: "Unassigned",
    firmware: "v1.4.3",
    battery: 100,
    signal: "—",
  },
  {
    id: "POS-4982",
    serialNumber: "SN88404982",
    business: "Adebayo Kayode",
    owner: "Gold",
    location: "Akure, Ondo",
    address: "28 Alagbaka Road, Akure",
    todayVolume: "₦102,300,500",
    monthlyVolume: "₦7,410,000",
    lastActivity: "1hr ago",
    status: "Online",
    firmware: "v1.4.3",
    battery: 91,
    signal: "Strong",
  },
];

export const terminalTransactions = [
  { id: "TX-789034", amount: "₦14,300,500", time: "2m ago", status: "Success" },
  { id: "TX-789098", amount: "₦12,300,500", time: "5d ago", status: "Success" },
  { id: "TX-789021", amount: "₦4,300,500", time: "1w ago", status: "Failed" },
  { id: "TX-789033", amount: "₦184,300", time: "4mon ago", status: "Success" },
];

