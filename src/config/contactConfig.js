/**
 * FAHMRISE Official Contact & WhatsApp Configuration
 * 
 * Official WhatsApp click-to-chat URL format: https://wa.me/254XXXXXXXXX
 * - When configured with a real phone number (e.g. via VITE_FAHMRISE_WHATSAPP_NUMBER or code),
 *   it directs to https://wa.me/<realNumber>?text=<message>
 * - When unconfigured, it defaults to the official placeholder format: https://wa.me/254XXXXXXXXX
 * - We do NOT invent a phone number. If no number is configured, we report that the real number is required.
 */

export const CONTACT_CONFIG = {
  // Official Support Email
  email: 'fahmrise.contact@gmail.com',

  // Official FAHMRISE WhatsApp Phone Number Placeholder
  // Format when provided: Country code + phone number without '+' or leading zeros (e.g. '254712345678')
  // Defaults to official placeholder '254XXXXXXXXX' until the real number is configured.
  whatsappPlaceholderNumber: '254XXXXXXXXX',
  whatsappNumber: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FAHMRISE_WHATSAPP_NUMBER) || '254XXXXXXXXX',

  // Default pre-filled message when visitor starts a WhatsApp chat
  whatsappDefaultMessage: 'Hello FAHMRISE, I would like to make an inquiry regarding your learning pathways.',

  // Support Operating Details
  location: 'Nairobi, Kenya',
  officeHours: 'Monday – Saturday: 8:00 AM – 6:00 PM (EAT / UTC+3)',
  responseTime: 'Typically within 24 hours'
};

/**
 * Validates whether the WhatsApp number has been configured with an actual, active phone number
 * (i.e. not empty and not containing placeholder 'X' characters).
 */
export function isRealWhatsAppConfigured(number = CONTACT_CONFIG.whatsappNumber) {
  if (!number || typeof number !== 'string') return false;
  const trimmed = number.trim();
  if (trimmed.length < 9) return false;
  // If it still contains placeholder characters like 'X' or '0000000', treat as unconfigured
  if (trimmed.toUpperCase().includes('X')) return false;
  const digitsOnly = trimmed.replace(/[^0-9]/g, '');
  return digitsOnly.length >= 9 && digitsOnly.length <= 15;
}

/**
 * Backward compatibility alias for isRealWhatsAppConfigured
 */
export const isWhatsAppConfigured = isRealWhatsAppConfigured;

/**
 * Generates the official WhatsApp click-to-chat URL:
 * https://wa.me/<number>?text=<encodedMessage>
 * 
 * Uses the configured number if provided; otherwise defaults to the official placeholder '254XXXXXXXXX'.
 * Always returns a valid URL string so clicking the button always triggers click-to-chat navigation.
 */
export function getWhatsAppChatUrl(number = CONTACT_CONFIG.whatsappNumber, message = CONTACT_CONFIG.whatsappDefaultMessage) {
  const effectiveNumber = (number && typeof number === 'string' && number.trim())
    ? number.trim()
    : CONTACT_CONFIG.whatsappPlaceholderNumber;
  const cleanNumber = effectiveNumber.replace(/[^a-zA-Z0-9]/g, '');
  const encodedText = encodeURIComponent(message || '');
  return `https://wa.me/${cleanNumber}${encodedText ? `?text=${encodedText}` : ''}`;
}
