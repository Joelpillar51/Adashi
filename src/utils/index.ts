import { format, formatDistanceToNow, isAfter, isBefore, addDays, differenceInDays } from 'date-fns';
import { Notification } from '../types';

// Currency Formatting
export const formatCurrency = (amount: number, currency: string = 'NGN'): string => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-NG').format(amount);
};

// Date Formatting
export const formatDate = (date: Date, formatString: string = 'MMM dd, yyyy'): string => {
  return format(date, formatString);
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'MMM dd, yyyy HH:mm');
};

export const formatTimeAgo = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatDueDate = (dueDate: Date): string => {
  const now = new Date();
  const daysDiff = differenceInDays(dueDate, now);
  
  if (daysDiff < 0) {
    return `Overdue by ${Math.abs(daysDiff)} days`;
  } else if (daysDiff === 0) {
    return 'Due today';
  } else if (daysDiff === 1) {
    return 'Due tomorrow';
  } else {
    return `Due in ${daysDiff} days`;
  }
};

// Date Utilities
export const isOverdue = (dueDate: Date): boolean => {
  return isBefore(dueDate, new Date());
};

export const isDueSoon = (dueDate: Date, daysBefore: number = 5): boolean => {
  const reminderDate = addDays(new Date(), daysBefore);
  return isAfter(dueDate, new Date()) && isBefore(dueDate, reminderDate);
};

export const getDaysUntilDue = (dueDate: Date): number => {
  return Math.max(0, differenceInDays(dueDate, new Date()));
};

export const getNextReminderDate = (dueDate: Date, reminderDaysBefore: number): Date => {
  return addDays(dueDate, -reminderDaysBefore);
};

// Validation Functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Nigerian phone number validation
  const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateAccountNumber = (accountNumber: string): boolean => {
  // Nigerian bank account number validation (typically 10 digits)
  const accountRegex = /^\d{10}$/;
  return accountRegex.test(accountNumber);
};

export const validateGroupInviteCode = (code: string): boolean => {
  // Simple alphanumeric code validation
  const codeRegex = /^[A-Z0-9]{6,8}$/;
  return codeRegex.test(code.toUpperCase());
};

// String Utilities
export const generateInviteCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatPhoneNumber = (phone: string): string => {
  // Format Nigerian phone number
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('234')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+234${cleaned.substring(1)}`;
  } else {
    return `+234${cleaned}`;
  }
};

// Array Utilities
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// Group Utilities
export const calculateTotalContribution = (amount: number, memberCount: number): number => {
  return amount * memberCount;
};

export const calculateCycleEndDate = (
  startDate: Date,
  frequency: 'weekly' | 'bi-weekly' | 'monthly',
  cycleNumber: number
): Date => {
  const multiplier = frequency === 'weekly' ? 7 : frequency === 'bi-weekly' ? 14 : 30;
  return addDays(startDate, multiplier * cycleNumber);
};

export const getNextRecipient = (rotationOrder: string[], currentCycle: number): string => {
  return rotationOrder[currentCycle % rotationOrder.length];
};

export const calculateProgress = (current: number, total: number): number => {
  return Math.min(100, Math.max(0, (current / total) * 100));
};

// Payment Utilities
export const formatTransferReference = (groupName: string, cycleNumber: number): string => {
  const groupCode = groupName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
  return `ADASHI-${groupCode}-C${cycleNumber}-${Date.now().toString().slice(-6)}`;
};

export const getBankDisplayName = (bankName: string): string => {
  const bankMappings: { [key: string]: string } = {
    'access': 'Access Bank',
    'gtb': 'Guaranty Trust Bank',
    'firstbank': 'First Bank of Nigeria',
    'uba': 'United Bank for Africa',
    'zenith': 'Zenith Bank',
    'fidelity': 'Fidelity Bank',
    'union': 'Union Bank',
    'sterling': 'Sterling Bank',
    'fcmb': 'First City Monument Bank',
    'ecobank': 'Ecobank Nigeria',
  };
  
  return bankMappings[bankName.toLowerCase()] || bankName;
};

// Notification Utilities
export const createNotification = (
  userId: string,
  type: Notification['type'],
  title: string,
  message: string,
  groupId?: string,
  data?: any
): Notification => {
  return {
    id: generateId(),
    userId,
    groupId,
    type,
    title,
    message,
    data,
    isRead: false,
    createdAt: new Date(),
  };
};

export const createPaymentReminderNotification = (
  userId: string,
  groupId: string,
  groupName: string,
  amount: number,
  dueDate: Date
): Notification => {
  return createNotification(
    userId,
    'payment_reminder',
    'Payment Reminder',
    `Your contribution of ${formatCurrency(amount)} for ${groupName} is due ${formatDueDate(dueDate)}`,
    groupId,
    { amount, dueDate }
  );
};

// Error Handling
export const handleApiError = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  } else if (error?.message) {
    return error.message;
  } else {
    return 'An unexpected error occurred. Please try again.';
  }
};

// Storage Utilities
export const generateStorageKey = (prefix: string, id?: string): string => {
  return id ? `adashi_${prefix}_${id}` : `adashi_${prefix}`;
};

// Time Zone Utilities (West Africa Time)
export const getWATDate = (): Date => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (1 * 3600000)); // WAT is UTC+1
};

export const formatWATTime = (date: Date): string => {
  return format(date, 'HH:mm') + ' WAT';
};

// Development Utilities
export const isDevelopment = (): boolean => {
  return __DEV__;
};

export const log = (...args: any[]): void => {
  if (isDevelopment()) {
    console.log('[Adashi]', ...args);
  }
};

export const logError = (...args: any[]): void => {
  if (isDevelopment()) {
    console.error('[Adashi Error]', ...args);
  }
};