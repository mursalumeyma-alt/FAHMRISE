/**
 * FAHMRISE Official Contact & WhatsApp Configuration
 * 
 * Official WhatsApp click-to-chat URL format: https://wa.me/254XXXXXXXXX
 * (Kenyan country code 254, digits only, no '+' sign or spaces)
 * - Number is configurable via VITE_FAHMRISE_WHATSAPP_NUMBER in client/.env
 * - Automatically normalizes local formats (e.g. 0727930103 -> 254727930103)
 * - Connects all three support buttons across Floating Button, Footer, and Contact Page
 * - Preserves pre-filled customer inquiry message
 */

/**
 * Normalizes a phone number into clean WhatsApp wa.me digits (e.g. 254XXXXXXXXX, no '+' or spaces).
 * Converts Kenyan local format (07XXXXXXXX / 01XXXXXXXX / 7XXXXXXXX) to 2547XXXXXXXX / 2541XXXXXXXX.
 * Returns empty string if input contains placeholder characters (e.g. 'X').
 */
export function normalizeWhatsAppNumber(number) {
  if (!number || typeof number !== 'string') return '';
  const trimmed = number.trim();
  if (!trimmed || trimmed.toUpperCase().includes('X')) return '';

  let digitsOnly = trimmed.replace(/[^0-9]/g, '');
  if (digitsOnly.startsWith('0') && digitsOnly.length === 10) {
    digitsOnly = `254${digitsOnly.slice(1)}`;
  } else if (digitsOnly.length === 9 && (digitsOnly.startsWith('7') || digitsOnly.startsWith('1'))) {
    digitsOnly = `254${digitsOnly}`;
  }
  return digitsOnly;
}

// Temporary official FAHMRISE WhatsApp Business support number (0727930103 -> 254727930103)
const DEFAULT_WHATSAPP_NUMBER = '254727930103';

const envNumber = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FAHMRISE_WHATSAPP_NUMBER;
const rawNumber = envNumber || DEFAULT_WHATSAPP_NUMBER;

export const CONTACT_CONFIG = {
  // Official Support Email
  email: 'fahmrise.contact@gmail.com',

  // Official FAHMRISE WhatsApp Phone Number (normalized Kenyan format: 254XXXXXXXXX)
  whatsappNumber: normalizeWhatsAppNumber(rawNumber) || DEFAULT_WHATSAPP_NUMBER,

  // Default pre-filled message when visitor starts a WhatsApp chat
  whatsappDefaultMessage: 'Hello FAHMRISE, I would like to make an inquiry regarding your learning pathways.',

  // Support Operating Details
  location: 'Nairobi, Kenya',
  officeHours: 'Monday – Saturday: 8:00 AM – 6:00 PM (EAT / UTC+3)',
  responseTime: 'Typically within 24 hours'
};

/**
 * Formats a WhatsApp number for clean human-readable display (e.g. +254 727 930 103).
 */
export function formatWhatsAppDisplay(number = CONTACT_CONFIG.whatsappNumber) {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return '';
  if (normalized.startsWith('254') && normalized.length === 12) {
    return `+254 ${normalized.slice(3, 6)} ${normalized.slice(6, 9)} ${normalized.slice(9)}`;
  }
  return `+${normalized}`;
}

/**
 * Validates whether the WhatsApp number has been configured with an actual, active phone number
 * (i.e. not empty, no placeholder 'X' characters, valid international digit length 9-15).
 */
export function isRealWhatsAppConfigured(number = CONTACT_CONFIG.whatsappNumber) {
  const digitsOnly = normalizeWhatsAppNumber(number);
  if (!digitsOnly) return false;
  if (/^2540+$/.test(digitsOnly) || /^0+$/.test(digitsOnly)) return false;
  return digitsOnly.length >= 9 && digitsOnly.length <= 15;
}

/**
 * Backward compatibility alias for isRealWhatsAppConfigured
 */
export const isWhatsAppConfigured = isRealWhatsAppConfigured;

/**
 * Generates the official WhatsApp click-to-chat URL:
 * https://wa.me/254XXXXXXXXX?text=<encodedMessage>
 * 
 * Returns null if no real official WhatsApp number is configured (preventing broken wa.me 404 links).
 */
export function getWhatsAppChatUrl(number = CONTACT_CONFIG.whatsappNumber, message = CONTACT_CONFIG.whatsappDefaultMessage) {
  if (!isRealWhatsAppConfigured(number)) return null;
  const cleanNumber = normalizeWhatsAppNumber(number);
  const encodedText = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanNumber}${encodedText ? `?text=${encodedText}` : ''}`;
}
