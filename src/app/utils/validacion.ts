export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const re = /^\+?[1-9]\d{1,14}$/
  return re.test(phoneNumber)
}
