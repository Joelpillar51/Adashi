import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '../constants/theme';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  style,
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BorderRadius.lg,
      backgroundColor: Colors.surface,
    };

    // Padding variations
    if (padding === 'small') {
      baseStyle.padding = Spacing.sm;
    } else if (padding === 'large') {
      baseStyle.padding = Spacing.lg;
    } else if (padding === 'medium') {
      baseStyle.padding = Spacing.md;
    }

    // Variant styles
    if (variant === 'outlined') {
      baseStyle.borderWidth = 1;
      baseStyle.borderColor = Colors.border;
    } else if (variant === 'elevated') {
      Object.assign(baseStyle, Shadows.lg);
    } else if (variant === 'flat') {
      // No shadow or border
    } else {
      // Default
      Object.assign(baseStyle, Shadows.sm);
    }

    return baseStyle;
  };

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};