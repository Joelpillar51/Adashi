import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { RootStackParamList, MainTabParamList } from '../types';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { Card, Button, GroupCard } from '../components';
import { formatCurrency } from '../utils';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

// Mock data - in real app this would come from API/state management
const mockUser = {
  id: '1',
  name: 'Adebayo Johnson',
  email: 'adebayo@example.com',
  phone: '+2348012345678',
  isVerified: true,
  createdAt: new Date(),
};

const mockGroups = [
  {
    id: '1',
    name: 'Friends Adashi Group',
    description: 'Monthly savings group with university friends',
    adminId: '1',
    members: [
      { userId: '1', user: mockUser, role: 'admin' as const, joinedAt: new Date(), isActive: true, totalContributions: 50000, missedPayments: 0 },
      { userId: '2', user: { ...mockUser, id: '2', name: 'Kemi Okafor' }, role: 'member' as const, joinedAt: new Date(), isActive: true, totalContributions: 50000, missedPayments: 0 },
    ],
    contributionAmount: 50000,
    currency: 'NGN',
    frequency: 'monthly' as const,
    startDate: new Date('2024-01-01'),
    inviteCode: 'ABC123',
    currentCycle: 3,
    totalCycles: 12,
    status: 'active' as const,
    rotationOrder: ['1', '2'],
    rules: {
      gracePerodDays: 2,
      reminderDaysBefore: 5,
      allowMemberNumberSelection: true,
      requireVerification: true,
      autoKickAfterMissedPayments: 3,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockCurrentContribution = {
  id: '1',
  groupId: '1',
  cycleNumber: 3,
  recipientId: '2',
  amount: 50000,
  currency: 'NGN',
  dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  status: 'collecting' as const,
  payments: [],
  totalCollected: 25000,
  createdAt: new Date(),
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getTotalSavings = () => {
    return mockGroups.reduce((total, group) => {
      const userMember = group.members.find(m => m.userId === mockUser.id);
      return total + (userMember?.totalContributions || 0);
    }, 0);
  };

  const getPendingPayments = () => {
    // In real app, this would calculate based on current contributions
    return 1;
  };

  const getActiveGroups = () => {
    return mockGroups.filter(group => group.status === 'active').length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{mockUser.name}</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('UserProfile')}
          >
            <Ionicons name="person-circle" size={32} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Savings Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatCurrency(getTotalSavings())}</Text>
              <Text style={styles.statLabel}>Total Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{getActiveGroups()}</Text>
              <Text style={styles.statLabel}>Active Groups</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{getPendingPayments()}</Text>
              <Text style={styles.statLabel}>Pending Payments</Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('CreateGroup')}
            >
              <View style={[styles.actionIcon, { backgroundColor: Colors.primarySoft }]}>
                <Ionicons name="add-circle" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.actionText}>Create Group</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('JoinGroup', {})}
            >
              <View style={[styles.actionIcon, { backgroundColor: Colors.secondarySoft }]}>
                <Ionicons name="person-add" size={24} color={Colors.secondary} />
              </View>
              <Text style={styles.actionText}>Join Group</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.jumpTo('Notifications')}
            >
              <View style={[styles.actionIcon, { backgroundColor: Colors.accentSoft }]}>
                <Ionicons name="notifications" size={24} color={Colors.accent} />
              </View>
              <Text style={styles.actionText}>Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.jumpTo('Groups')}
            >
              <View style={[styles.actionIcon, { backgroundColor: Colors.successSoft }]}>
                <Ionicons name="people" size={24} color={Colors.success} />
              </View>
              <Text style={styles.actionText}>All Groups</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.jumpTo('Groups')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {mockGroups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              currentContribution={mockCurrentContribution}
              userRole="admin"
              onPress={() => navigation.navigate('GroupDetails', { groupId: group.id })}
              onChatPress={() => navigation.navigate('GroupChat', { groupId: group.id })}
            />
          ))}
        </View>

        {/* Upcoming Payments */}
        <Card style={styles.upcomingCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Payments</Text>
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentText}>Due in 5 days</Text>
            </View>
          </View>
          
          <View style={styles.paymentItem}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentGroup}>Friends Adashi Group</Text>
              <Text style={styles.paymentAmount}>{formatCurrency(50000)}</Text>
            </View>
            <Button
              title="Pay Now"
              variant="primary"
              size="small"
              onPress={() => navigation.navigate('PaymentFlow', { contributionId: '1' })}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: Typography.body1.fontSize,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs / 2,
  },
  userName: {
    fontSize: Typography.heading3.fontSize,
    fontWeight: Typography.heading3.fontWeight as any,
    color: Colors.textPrimary,
  },
  profileButton: {
    padding: Spacing.xs,
  },
  statsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsTitle: {
    fontSize: Typography.subtitle1.fontSize,
    fontWeight: Typography.subtitle1.fontWeight as any,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.heading4.fontSize,
    fontWeight: Typography.heading4.fontWeight as any,
    color: Colors.primary,
    marginBottom: Spacing.xs / 2,
  },
  statLabel: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  actionsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.subtitle1.fontSize,
    fontWeight: Typography.subtitle1.fontWeight as any,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: Spacing.md,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionText: {
    fontSize: Typography.body2.fontSize,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  seeAllText: {
    fontSize: Typography.body2.fontSize,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium as any,
  },
  upcomingCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  urgentBadge: {
    backgroundColor: Colors.warningSoft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.full,
  },
  urgentText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.warning,
    fontWeight: Typography.fontWeight.medium as any,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  paymentGroup: {
    fontSize: Typography.body1.fontSize,
    fontWeight: Typography.fontWeight.medium as any,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs / 2,
  },
  paymentAmount: {
    fontSize: Typography.body2.fontSize,
    color: Colors.textSecondary,
  },
});

export default HomeScreen;