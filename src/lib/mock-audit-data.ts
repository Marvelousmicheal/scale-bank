export const mockUsers = [
  { id: "USR-789034", channel: "POS Terminal", business: "Chicken Republic", amount: "₦184,300,500", time: "2m ago", status: "Success" },
  { id: "USR-789035", channel: "POS Terminal", business: "Chicken Republic", amount: "₦184,300,500", time: "2m ago", status: "Success" },
  { id: "USR-789036", channel: "POS Terminal", business: "Chicken Republic", amount: "₦184,300,500", time: "2m ago", status: "Failed" },
  { id: "USR-789037", channel: "POS Terminal", business: "Chicken Republic", amount: "₦184,300,500", time: "2m ago", status: "Success" },
  { id: "USR-789038", channel: "POS Terminal", business: "Chicken Republic", amount: "₦184,300,500", time: "2m ago", status: "Success" },
]

export const mockBusinesses = [
  { name: "Chicken Republic", id: "BIZ-789034", owner: "Adebayo Kayode", kyb: "Verified", volume: "₦184,300,500", status: "Active" },
  { name: "Shoprite Nigeria", id: "BIZ-789035", owner: "Chukwuemeka Obi", kyb: "Verified", volume: "₦92,100,000", status: "Active" },
  { name: "Tantalizers", id: "BIZ-789036", owner: "Funke Adeola", kyb: "Pending", volume: "₦45,600,000", status: "Inactive" },
  { name: "Mr Biggs", id: "BIZ-789037", owner: "Segun Martins", kyb: "Rejected", volume: "₦78,900,500", status: "Inactive" },
  { name: "Domino's Pizza", id: "BIZ-789038", owner: "Ngozi Okonkwo", kyb: "Verified", volume: "₦210,400,000", status: "Active" },
]

export const mockVerifications = [
  { subject: "Adebayo John", secondary: "Adebayo.jo@gmail.com", id: "TX-789034", type: "KYC", tierRequest: "Standard Verification", submittedAt: "10/03/2026 - 12:45", status: "Approved" },
  { subject: "Reeva Supermarket", secondary: "Adebayo John", id: "TX-789035", type: "KYC", tierRequest: "Standard Verification", submittedAt: "10/03/2026 - 12:45", status: "Pending" },
  { subject: "TechMart Lagos", secondary: "Aisha Mohammed", id: "TX-789036", type: "KYB", tierRequest: "Upgrade to Titanium", submittedAt: "10/03/2026 - 12:45", status: "Pending" },
  { subject: "Chuks Laundromat", secondary: "Chukwudi Okafor", id: "TX-789098", type: "KYB", tierRequest: "Upgrade to Diamond", submittedAt: "10/03/2026 - 12:45", status: "Rejected" },
  { subject: "Adebayo Kayode", secondary: "Adebayo.jo@gmail.com", id: "TX-789099", type: "KYB", tierRequest: "Upgrade to Diamond", submittedAt: "10/03/2026 - 12:45", status: "Approved" },
  { subject: "Skyline Logistics", secondary: "Aljaxa Francis", id: "TX-789021", type: "KYB", tierRequest: "Standard Verification", submittedAt: "10/03/2026 - 12:45", status: "Pending" },
]

export const mockVerificationMetrics = [
  { label: "Total Approved", value: "630" },
  { label: "Pending Reviews", value: "12" },
  { label: "Rejected", value: "18" },
  { label: "Avg Review Time", value: "14 mins" },
  { label: "Flagged", value: "9" },
  { label: "Escalated Cases", value: "5" },
]
