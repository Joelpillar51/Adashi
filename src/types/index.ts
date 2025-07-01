// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bankAccount?: BankAccount;
  profilePicture?: string;
  createdAt: Date;
  isVerified: boolean;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

// Group Types
export interface Group {
  id: string;
  name: string;
  description: string;
  adminId: string;
  members: GroupMember[];
  contributionAmount: number;
  currency: string;
  frequency: 'monthly' | 'weekly' | 'bi-weekly';
  startDate: Date;
  endDate?: Date;
  inviteCode: string;
  currentCycle: number;
  totalCycles: number;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  rotationOrder: string[]; // Array of user IDs in rotation order
  rules: GroupRules;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupMember {
  userId: string;
  user: User;
  role: 'admin' | 'member';
  joinedAt: Date;
  rotationNumber?: number;
  isActive: boolean;
  totalContributions: number;
  missedPayments: number;
}

export interface GroupRules {
  gracePerodDays: number;
  reminderDaysBefore: number;
  allowMemberNumberSelection: boolean;
  requireVerification: boolean;
  autoKickAfterMissedPayments: number;
}

// Contribution and Payment Types
export interface Contribution {
  id: string;
  groupId: string;
  cycleNumber: number;
  recipientId: string;
  amount: number;
  currency: string;
  dueDate: Date;
  status: 'pending' | 'collecting' | 'disbursed' | 'overdue';
  payments: Payment[];
  totalCollected: number;
  collectionCompletedAt?: Date;
  disbursedAt?: Date;
  createdAt: Date;
}

export interface Payment {
  id: string;
  contributionId: string;
  payerId: string;
  amount: number;
  currency: string;
  method: 'bank_transfer' | 'cash';
  status: 'pending' | 'confirmed' | 'failed';
  transferDetails?: TransferDetails;
  confirmedAt?: Date;
  confirmedBy?: string; // Admin who confirmed
  notes?: string;
  createdAt: Date;
}

export interface TransferDetails {
  reference: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  transferDate: Date;
  screenshot?: string; // Base64 or URL
}

// Chat and Communication Types
export interface ChatMessage {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'number_selection' | 'payment_reminder' | 'system';
  metadata?: any;
  timestamp: Date;
  readBy: string[]; // Array of user IDs who read the message
}

export interface NumberSelection {
  messageId: string;
  userId: string;
  selectedNumber: number;
  timestamp: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  groupId?: string;
  type: 'payment_reminder' | 'grace_period' | 'collection_complete' | 'disbursement' | 'group_invite' | 'system';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  GroupDetails: { groupId: string };
  CreateGroup: undefined;
  JoinGroup: { inviteCode?: string };
  PaymentFlow: { contributionId: string };
  UserProfile: undefined;
  GroupChat: { groupId: string };
  GroupSettings: { groupId: string };
  TransferOwnership: { groupId: string };
  // Tab screens accessible from stack
  Groups: undefined;
  Notifications: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Groups: undefined;
  Notifications: undefined;
  Profile: undefined;
};

// Form Types
export interface CreateGroupForm {
  name: string;
  description: string;
  contributionAmount: string;
  frequency: 'monthly' | 'weekly' | 'bi-weekly';
  startDate: Date;
  totalMembers: number;
  allowMemberNumberSelection: boolean;
  gracePerodDays: number;
  reminderDaysBefore: number;
}

export interface JoinGroupForm {
  inviteCode: string;
}

export interface UserRegistrationForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface BankAccountForm {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

// State Management Types
export interface AppState {
  user: User | null;
  groups: Group[];
  currentGroup: Group | null;
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
}

// Utility Types
export type GroupCreationStep = 'basic' | 'rules' | 'members' | 'review';
export type PaymentStep = 'details' | 'transfer' | 'confirmation';
export type OnboardingStep = 'welcome' | 'features' | 'account' | 'complete';

// Constants
export const CURRENCIES = ['NGN', 'USD'] as const;
export const CONTRIBUTION_FREQUENCIES = ['weekly', 'bi-weekly', 'monthly'] as const;
export const GROUP_STATUSES = ['active', 'completed', 'paused', 'cancelled'] as const;
export const PAYMENT_STATUSES = ['pending', 'confirmed', 'failed'] as const;
export const USER_ROLES = ['admin', 'member'] as const;