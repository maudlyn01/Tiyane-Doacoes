export const generateTrackingCode = (): string => {
  const prefix = "DON"
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export const generateVerificationCode = (): string => {
  return Math.random().toString(36).substr(2, 8).toUpperCase()
}
