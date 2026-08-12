export type Scale9Envelope<T> = {
  success: boolean
  message?: string
  data: T
  timestamp?: string
  requestId?: string
}

export type Scale9Tokens = {
  accessToken: string
  refreshToken: string
  expiresIn?: number
  role?: string
}

export type Scale9LoginResult = Scale9Tokens & {
  requiresTwoFactor?: boolean
  challengeId?: string
}

export type Scale9Health = {
  status: string
  service: string
  version: string
}
