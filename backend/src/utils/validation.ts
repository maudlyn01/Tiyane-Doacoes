export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const generateTrackingCode = (): string => {
  return "DON" + Math.random().toString(36).substr(2, 6).toUpperCase()
}

