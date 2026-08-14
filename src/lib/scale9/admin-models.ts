type UnknownRecord = Record<string, unknown>

export type AdminPagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type AdminUser = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  tier: string
  active: boolean
  joinedAt: string
  kycStatus: string
}

export type AdminBusiness = {
  id: string
  name: string
  email: string
  phone: string
  owner: string
  ownerId: string
  tier: string
  active: boolean
  verified: boolean
  address: string
  rcNumber: string
  balance: number
  ledgerBalance: number
  posDevices: number
  transactions: number
  createdAt: string
}

export type AdminVerification = {
  id: string
  type: "KYC" | "KYB"
  subject: string
  secondary: string
  status: string
  riskLevel: string
  submittedAt: string
}

export type AdminPosDevice = {
  id: string
  serialNumber: string
  business: string
  businessId: string
  firmwareVersion: string
  batteryLevel?: number
  signalStrength: string
  lastSeenAt: string
  updatedAt: string
  transactions: number
  status: string
  createdAt: string
}

export type AdminTransaction = {
  id: string
  reference: string
  type: string
  category: string
  serviceType: string
  channel: string
  business: string
  businessId: string
  userId: string
  posDeviceId: string
  amount: number
  fee: number
  status: string
  narration: string
  createdAt: string
  updatedAt: string
}

export type AdminDispute = {
  id: string
  reason: string
  status: string
  createdAt: string
}

export type AdminPage<T> = {
  items: T[]
  meta: AdminPagination
}

function record(value: unknown): UnknownRecord {
  return value && typeof value === "object" ? value as UnknownRecord : {}
}

function string(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback
}

function number(value: unknown, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function boolean(value: unknown) {
  return value === true
}

function fullName(source: UnknownRecord) {
  return [string(source.first_name), string(source.last_name)].filter(Boolean).join(" ") || "Unnamed user"
}

export function toAdminUser(value: unknown): AdminUser {
  const source = record(value)
  const tier = record(source.tier)
  const kyc = record(source.kycRecord)

  return {
    id: string(source.id),
    name: [string(source.first_name), string(source.last_name)].filter(Boolean).join(" ") || "—",
    email: string(source.email, "—"),
    phone: string(source.phone_number, "—"),
    role: string(source.role, "—"),
    tier: string(tier.name, "—"),
    active: boolean(source.is_active),
    joinedAt: string(source.createdAt),
    kycStatus: string(kyc.status, "—"),
  }
}

export function toAdminBusiness(value: unknown): AdminBusiness {
  const source = record(value)
  const tier = record(source.tier)
  const wallet = record(source.wallet)
  const owner = record(source.owner)
  const counts = record(source._count)

  return {
    id: string(source.id),
    name: string(source.name, "Unnamed business"),
    email: string(source.email, "Not provided"),
    phone: string(source.phone, "Not provided"),
    owner: Object.keys(owner).length ? fullName(owner) : "—",
    ownerId: string(source.ownerId),
    tier: string(tier.name, "Unassigned"),
    active: boolean(source.isActive),
    verified: boolean(source.isVerified),
    address: string(source.address, "Not provided"),
    rcNumber: string(source.rcNumber, "Not provided"),
    balance: number(wallet.balance),
    ledgerBalance: number(wallet.ledgerBalance),
    posDevices: number(counts.posDevices),
    transactions: number(counts.transactions),
    createdAt: string(source.createdAt),
  }
}

export function toAdminPage<T>(value: unknown, adapter: (item: unknown) => T): AdminPage<T> {
  const source = record(value)
  const items = Array.isArray(source.data) ? source.data : []
  const meta = record(source.meta)

  return {
    items: items.map(adapter),
    meta: {
      page: number(meta.page, 1),
      limit: number(meta.limit, 20),
      total: number(meta.total),
      totalPages: number(meta.totalPages, 1),
    },
  }
}

export function toAdminVerification(value: unknown, type: "KYC" | "KYB"): AdminVerification {
  const source = record(value)
  const user = record(source.user)
  const business = record(source.business)
  const subject = type === "KYC"
    ? fullName(user)
    : string(business.name, string(source.businessName, "Unnamed business"))

  return {
    id: string(source.id),
    type,
    subject,
    secondary: type === "KYC"
      ? string(user.email, string(user.phone_number, "Not provided"))
      : string(business.email, string(business.phone, "Not provided")),
    status: string(source.status, "PENDING"),
    riskLevel: string(source.riskLevel, string(source.risk_level, "Not assessed")),
    submittedAt: string(source.createdAt, string(source.submittedAt)),
  }
}

export function toAdminPosDevice(value: unknown): AdminPosDevice {
  const source = record(value)
  const business = record(source.business)
  const counts = record(source._count)

  return {
    id: string(source.id),
    serialNumber: string(source.serialNumber, string(source.serial_number, "Not provided")),
    business: string(business.name, "Unassigned"),
    businessId: string(source.businessId),
    firmwareVersion: string(source.firmwareVersion, "Not reported"),
    batteryLevel: source.batteryLevel === null || source.batteryLevel === undefined ? undefined : number(source.batteryLevel),
    signalStrength: string(source.signalStrength, "Not reported"),
    lastSeenAt: string(source.lastSeen, string(source.lastSeenAt)),
    updatedAt: string(source.updatedAt),
    transactions: number(counts.transactions),
    status: string(source.status, "INACTIVE"),
    createdAt: string(source.createdAt),
  }
}

export function toAdminTransaction(value: unknown): AdminTransaction {
  const source = record(value)
  const business = record(source.business)

  return {
    id: string(source.id),
    reference: string(source.reference, string(source.transactionReference, string(source.transaction_reference))),
    type: string(source.type, string(source.channel, "—")),
    category: string(source.category, "—"),
    serviceType: string(source.serviceType, string(source.service_type, "—")),
    channel: string(source.channel, "—"),
    business: string(business.name, string(source.businessName, "—")),
    businessId: string(source.businessId),
    userId: string(source.userId),
    posDeviceId: string(source.posDeviceId, string(source.posTerminalId)),
    amount: number(source.amount),
    fee: number(source.fee, number(source.platformFee)),
    status: string(source.status, "PENDING"),
    narration: string(source.narration, "—"),
    createdAt: string(source.createdAt),
    updatedAt: string(source.updatedAt),
  }
}

export function toAdminDispute(value: unknown): AdminDispute {
  const source = record(value)

  return {
    id: string(source.id),
    reason: string(source.reason, "—"),
    status: string(source.status, "OPEN"),
    createdAt: string(source.createdAt),
  }
}
