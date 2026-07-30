export type PosOrder = {
  id: string;
  businessId: string;
  business: string;
  status: "Delivered" | "Pending" | "Processing" | "Shipped" | "Cancelled";
  model: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  transactionId: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  orderDate: string;
  recipient: string;
  phone: string;
  location: string;
  address: string;
  trackingNumber: string;
};

export const posOrders: PosOrder[] = [
  {
    id: "ORD-2031",
    businessId: "BUS-40291",
    business: "Reeva Supermarket",
    status: "Delivered",
    model: "ScanBank POS S1",
    quantity: 4,
    unitPrice: "₦80,000",
    totalPrice: "₦240,000",
    transactionId: "TXN-823091",
    paymentStatus: "Paid",
    orderDate: "Feb 10, 2026",
    recipient: "Osaze Iyamu",
    phone: "+234 801 234 5678",
    location: "Lokogoma, Abuja",
    address: "No 44 Efab Estate Lokogoma, Abuja",
    trackingNumber: "SH-492012",
  },
  {
    id: "ORD-2032",
    businessId: "BUS-40292",
    business: "TechStark Corp",
    status: "Processing",
    model: "ScanBank POS S1",
    quantity: 4,
    unitPrice: "₦60,000",
    totalPrice: "₦240,000",
    transactionId: "TXN-823092",
    paymentStatus: "Paid",
    orderDate: "Feb 10, 2026",
    recipient: "Adesanya Khabib",
    phone: "+234 802 100 4040",
    location: "Katampe, Abuja",
    address: "14 Katampe Extension, Abuja",
    trackingNumber: "SH-492013",
  },
  {
    id: "ORD-2033",
    businessId: "BUS-40293",
    business: "Skyline Logistics",
    status: "Pending",
    model: "ScanBank POS S1",
    quantity: 2,
    unitPrice: "₦120,000",
    totalPrice: "₦240,000",
    transactionId: "TXN-823093",
    paymentStatus: "Pending",
    orderDate: "Feb 10, 2026",
    recipient: "Aljaxa Francis",
    phone: "+234 803 200 3030",
    location: "Lugbe, Abuja",
    address: "3 Airport Road, Lugbe, Abuja",
    trackingNumber: "Pending",
  },
  {
    id: "ORD-2034",
    businessId: "BUS-40294",
    business: "Main St. Cafe",
    status: "Shipped",
    model: "ScanBank POS S1",
    quantity: 1,
    unitPrice: "₦240,000",
    totalPrice: "₦240,000",
    transactionId: "TXN-823094",
    paymentStatus: "Paid",
    orderDate: "Feb 10, 2026",
    recipient: "Anastasia Priscilla",
    phone: "+234 804 300 2020",
    location: "Kubwa, Abuja",
    address: "22 Gado Nasko Road, Kubwa, Abuja",
    trackingNumber: "SH-492014",
  },
  {
    id: "ORD-2035",
    businessId: "BUS-40295",
    business: "Unassigned",
    status: "Cancelled",
    model: "ScanBank POS Mini",
    quantity: 7,
    unitPrice: "₦34,286",
    totalPrice: "₦240,000",
    transactionId: "TXN-823095",
    paymentStatus: "Failed",
    orderDate: "Feb 10, 2026",
    recipient: "Warehouse",
    phone: "—",
    location: "Garki, Abuja",
    address: "Central Inventory, Garki, Abuja",
    trackingNumber: "—",
  },
  {
    id: "ORD-2036",
    businessId: "BUS-40296",
    business: "Adebayo Kayode",
    status: "Delivered",
    model: "ScanBank POS Mini",
    quantity: 4,
    unitPrice: "₦60,000",
    totalPrice: "₦240,000",
    transactionId: "TXN-823096",
    paymentStatus: "Paid",
    orderDate: "Feb 10, 2026",
    recipient: "Adebayo Kayode",
    phone: "+234 805 400 1010",
    location: "Wuse 2, Abuja",
    address: "18 Aminu Kano Crescent, Wuse 2, Abuja",
    trackingNumber: "SH-492015",
  },
];

export const orderActivity = [
  "Logout",
  "Initiated Transaction",
  "Activated",
  "Login",
  "Activation successful",
  "Initiated Activation",
  "Devices assigned",
  "Payment confirmed",
  "Order created by business",
  "Order created by business",
];
