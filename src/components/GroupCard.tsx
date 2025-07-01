import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { Group, Contribution } from '../types';
import { formatCurrency, formatDate, calculateProgress } from '../utils';

export interface GroupCardProps {
  group: Group;
  currentContribution?: Contribution;
  userRole: 'admin' | 'member';
  onPress: () => void;
  onChatPress?: () => void;
  style?: ViewStyle;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  currentContribution,
  userRole,
  onPress,
  onChatPress,
  style,
}) => {
  const getStatusColor = () => {
    switch (group.status) {
      case 'active':
        return Colors.success;
      case 'paused':
        return Colors.warning;
      case 'completed':
        return Colors.primary;
      case 'cancelled':
        return Colors.error;
      default:
        return Colors.gray500;
    }
  };

  const getStatusText = () => {
    switch (group.status) {
      case 'active':
        return 'Active';
      case 'paused':
        return 'Paused';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getContributionStatus = () => {
    if (!currentContribution) {
      return {
        text: 'No active contribution',
        color: Colors.gray500,
      };
    }

    switch (currentContribution.status) {
      case 'collecting':
        return {
          text: 'Collecting contributions',
          color: Colors.warning,
        };
      case 'disbursed':
        return {
          text: 'Disbursed',
          color: Colors.success,
        };
      case 'overdue':
        return {
          text: 'Overdue',
          color: Colors.error,
        };
      default:
        return {
          text: 'Pending',
          color: Colors.gray500,
        };
    }
  };

  const getCurrentRecipient = () => {
    if (!currentContribution) return null;
    
    const recipient = group.members.find(
      member => member.userId === currentContribution.recipientId
    );
    
    return recipient?.user.name || 'Unknown';
  };

  const getProgress = () => {
    if (!currentContribution) return 0;
    
    const totalExpected = group.contributionAmount * group.members.length;
    return calculateProgress(currentContribution.totalCollected, totalExpected);
  };

  const contributionStatus = getContributionStatus();
  const recipient = getCurrentRecipient();
  const progress = getProgress();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      <Card variant="default" style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.groupName} numberOfLines={1}>
              {group.name}
            </Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            {userRole === 'admin' && (
              <View style={styles.adminBadge}>
                <Ionicons name="shield-checkmark" size={12} color={Colors.white} />
              </View>
            )}
            {onChatPress && (
              <TouchableOpacity onPress={onChatPress} style={styles.chatButton}>
                <Ionicons name="chatbubble-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Contribution Info */}
        <View style={styles.contributionInfo}>
          <View style={styles.contributionRow}>
            <Text style={styles.contributionLabel}>Amount</Text>
            <Text style={styles.contributionValue}>
              {formatCurrency(group.contributionAmount, group.currency)}
            </Text>
          </View>
          
          <View style={styles.contributionRow}>
            <Text style={styles.contributionLabel}>Members</Text>
            <Text style={styles.contributionValue}>{group.members.length}</Text>
          </View>
          
          <View style={styles.contributionRow}>
            <Text style={styles.contributionLabel}>Cycle</Text>
            <Text style={styles.contributionValue}>
              {group.currentCycle} of {group.totalCycles}
            </Text>
          </View>
        </View>

        {/* Current Contribution Status */}
        {currentContribution && (
          <View style={styles.currentContribution}>
            <View style={styles.contributionHeader}>
              <Text style={styles.currentContributionTitle}>Current Round</Text>
              <Text style={[styles.contributionStatusText, { color: contributionStatus.color }]}>
                {contributionStatus.text}
              </Text>
            </View>
            
            {recipient && (
              <Text style={styles.recipientText}>
                Recipient: {recipient}
              </Text>
            )}
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      width: `${progress}%`,
                      backgroundColor: contributionStatus.color,
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {formatCurrency(currentContribution.totalCollected, group.currency)} / {formatCurrency(group.contributionAmount * group.members.length, group.currency)}
              </Text>
            </View>
            
            <Text style={styles.dueDate}>
              Due: {formatDate(currentContribution.dueDate)}
            </Text>
          </View>
        )}

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{group.frequency}</Text>
            <Text style={styles.statLabel}>Frequency</Text>
          </View>
          
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {formatCurrency(group.contributionAmount * group.members.length, group.currency)}
            </Text>
            <Text style={styles.statLabel}>Total Pool</Text>
          </View>
          
          <View style={styles.stat}>
            <Text style={styles.statValue}>{formatDate(group.startDate, 'MMM yyyy')}</Text>
            <Text style={styles.statLabel}>Started</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  groupName: {
    fontSize: Typography.heading4.fontSize,
    fontWeight: Typography.heading4.fontWeight as any,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: Typography.fontWeight.medium as any,
  },
  adminBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  chatButton: {
    padding: Spacing.xs,
  },
  contributionInfo: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  contributionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  contributionLabel: {
    fontSize: Typography.body2.fontSize,
    color: Colors.textSecondary,
  },
  contributionValue: {
    fontSize: Typography.body2.fontSize,
    fontWeight: Typography.fontWeight.medium as any,
    color: Colors.textPrimary,
  },
  currentContribution: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  contributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  currentContributionTitle: {
    fontSize: Typography.subtitle2.fontSize,
    fontWeight: Typography.subtitle2.fontWeight as any,
    color: Colors.textPrimary,
  },
  contributionStatusText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: Typography.fontWeight.medium as any,
  },
  recipientText: {
    fontSize: Typography.body2.fontSize,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  progressContainer: {
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
  progressText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  dueDate: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.md,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.body2.fontSize,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs / 2,
  },
  statLabel: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textSecondary,
  },
});