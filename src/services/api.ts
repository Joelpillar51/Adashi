import * as SecureStore from 'expo-secure-store';
import { 
  User, 
  Group, 
  Contribution, 
  Payment, 
  Notification, 
  ApiResponse,
  UserRegistrationForm,
  CreateGroupForm,
  JoinGroupForm,
  BankAccountForm
} from '../types';
import { generateStorageKey, handleApiError, log } from '../utils';

// Mock API Base URL - In production, this would be your actual API endpoint
const API_BASE_URL = 'https://api.adashi.app/v1';

// Auth Token Management
const AUTH_TOKEN_KEY = generateStorageKey('auth_token');
const USER_DATA_KEY = generateStorageKey('user_data');

class ApiService {
  private baseURL: string;
  private authToken: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.loadAuthToken();
  }

  // Initialize auth token from storage
  private async loadAuthToken(): Promise<void> {
    try {
      this.authToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    } catch (error) {
      log('Failed to load auth token:', error);
    }
  }

  // Save auth token to storage
  private async saveAuthToken(token: string): Promise<void> {
    try {
      this.authToken = token;
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    } catch (error) {
      log('Failed to save auth token:', error);
    }
  }

  // Clear auth token
  private async clearAuthToken(): Promise<void> {
    try {
      this.authToken = null;
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
    } catch (error) {
      log('Failed to clear auth token:', error);
    }
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
        ...options.headers,
      };

      log('API Request:', { url, method: options.method || 'GET' });

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP Error: ${response.status}`);
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      const errorMessage = handleApiError(error);
      log('API Error:', errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  // Authentication Methods
  async register(userData: UserRegistrationForm): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      await this.saveAuthToken(response.data.token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(response.data.user));
    }

    return response;
  }

  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      await this.saveAuthToken(response.data.token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(response.data.user));
    }

    return response;
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request<void>('/auth/logout', {
      method: 'POST',
    });

    await this.clearAuthToken();
    return response;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      log('Failed to get current user:', error);
      return null;
    }
  }

  // User Profile Methods
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await this.request<User>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(response.data));
    }

    return response;
  }

  async updateBankAccount(bankData: BankAccountForm): Promise<ApiResponse<User>> {
    return this.request<User>('/user/bank-account', {
      method: 'PUT',
      body: JSON.stringify(bankData),
    });
  }

  // Group Management Methods
  async createGroup(groupData: CreateGroupForm): Promise<ApiResponse<Group>> {
    return this.request<Group>('/groups', {
      method: 'POST',
      body: JSON.stringify(groupData),
    });
  }

  async joinGroup(joinData: JoinGroupForm): Promise<ApiResponse<Group>> {
    return this.request<Group>('/groups/join', {
      method: 'POST',
      body: JSON.stringify(joinData),
    });
  }

  async getUserGroups(): Promise<ApiResponse<Group[]>> {
    return this.request<Group[]>('/groups');
  }

  async getGroup(groupId: string): Promise<ApiResponse<Group>> {
    return this.request<Group>(`/groups/${groupId}`);
  }

  async updateGroup(groupId: string, groupData: Partial<Group>): Promise<ApiResponse<Group>> {
    return this.request<Group>(`/groups/${groupId}`, {
      method: 'PUT',
      body: JSON.stringify(groupData),
    });
  }

  async transferGroupOwnership(groupId: string, newAdminId: string): Promise<ApiResponse<Group>> {
    return this.request<Group>(`/groups/${groupId}/transfer-ownership`, {
      method: 'POST',
      body: JSON.stringify({ newAdminId }),
    });
  }

  async leaveGroup(groupId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/groups/${groupId}/leave`, {
      method: 'POST',
    });
  }

  // Contribution and Payment Methods
  async getGroupContributions(groupId: string): Promise<ApiResponse<Contribution[]>> {
    return this.request<Contribution[]>(`/groups/${groupId}/contributions`);
  }

  async getCurrentContribution(groupId: string): Promise<ApiResponse<Contribution | null>> {
    return this.request<Contribution | null>(`/groups/${groupId}/contributions/current`);
  }

  async makePayment(contributionId: string, paymentData: Omit<Payment, 'id' | 'createdAt' | 'status'>): Promise<ApiResponse<Payment>> {
    return this.request<Payment>(`/contributions/${contributionId}/payments`, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async confirmPayment(paymentId: string, confirmed: boolean, notes?: string): Promise<ApiResponse<Payment>> {
    return this.request<Payment>(`/payments/${paymentId}/confirm`, {
      method: 'POST',
      body: JSON.stringify({ confirmed, notes }),
    });
  }

  async getPaymentHistory(userId?: string): Promise<ApiResponse<Payment[]>> {
    const endpoint = userId ? `/payments?userId=${userId}` : '/payments';
    return this.request<Payment[]>(endpoint);
  }

  // Notification Methods
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    return this.request<Notification[]>('/notifications');
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  }

  async markAllNotificationsAsRead(): Promise<ApiResponse<void>> {
    return this.request<void>('/notifications/mark-all-read', {
      method: 'POST',
    });
  }

  // Chat Methods (if implementing in-app chat)
  async getGroupMessages(groupId: string, page: number = 1): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/groups/${groupId}/messages?page=${page}`);
  }

  async sendMessage(groupId: string, content: string, type: string = 'text'): Promise<ApiResponse<any>> {
    return this.request<any>(`/groups/${groupId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, type }),
    });
  }

  // Admin Methods
  async getDashboardStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/admin/dashboard');
  }

  async getGroupStats(groupId: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/admin/groups/${groupId}/stats`);
  }

  // Bank and Payment Integration (Nigerian banks)
  async verifyBankAccount(accountNumber: string, bankCode: string): Promise<ApiResponse<{ accountName: string }>> {
    return this.request<{ accountName: string }>('/payments/verify-account', {
      method: 'POST',
      body: JSON.stringify({ accountNumber, bankCode }),
    });
  }

  async getBankList(): Promise<ApiResponse<Array<{ name: string; code: string }>>> {
    return this.request<Array<{ name: string; code: string }>>('/payments/banks');
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;