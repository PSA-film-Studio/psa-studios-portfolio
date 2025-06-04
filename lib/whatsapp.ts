export const sendToWhatsApp = (message: string) => {
  const phoneNumber = "919243333284"
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

export const sendFormToWhatsApp = (formData: {
  name?: string
  email?: string
  company?: string
  services?: string
  message?: string
}) => {
  let message = "New Inquiry from PSA Studios Website:\n\n"

  if (formData.name) message += `Name: ${formData.name}\n`
  if (formData.email) message += `Email: ${formData.email}\n`
  if (formData.company) message += `Company: ${formData.company}\n`
  if (formData.services) message += `Services: ${formData.services}\n`
  if (formData.message) message += `Message: ${formData.message}\n`

  message += `\nSent from: ${window.location.href}`

  sendToWhatsApp(message)
}
