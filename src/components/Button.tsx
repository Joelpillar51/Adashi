import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.lg,
      ...Shadows.sm,
    };

    // Size variations
    if (size === 'small') {
      baseStyle.height = 36;
      baseStyle.paddingHorizontal = Spacing.md;
    } else if (size === 'large') {
      baseStyle.height = 56;
      baseStyle.paddingHorizontal = Spacing.xl;
    } else {
      baseStyle.height = 48;
      baseStyle.paddingHorizontal = Spacing.lg;
    }

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: Typography.fontWeight.semibold as any,
    };

    if (size === 'small') {
      baseTextStyle.fontSize = Typography.fontSize.sm;
    } else if (size === 'large') {
      baseTextStyle.fontSize = Typography.fontSize.lg;
    } else {
      baseTextStyle.fontSize = Typography.fontSize.base;
    }

    // Color variations
    if (variant === 'primary') {
      baseTextStyle.color = Colors.white;
    } else if (variant === 'secondary') {
      baseTextStyle.color = Colors.white;
    } else if (variant === 'outline') {
      baseTextStyle.color = Colors.primary;
    } else if (variant === 'ghost') {
      baseTextStyle.color = Colors.primary;
    } else if (variant === 'danger') {
      baseTextStyle.color = Colors.white;
    }

    if (disabled) {
      baseTextStyle.color = Colors.gray500;
    }

    return baseTextStyle;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
        />
      );
    }

    return (
      <>
        {icon && <>{icon}</>}
        <Text style={[getTextStyle(), textStyle, icon ? { marginLeft: Spacing.sm } : null]}>
          {title}
        </Text>
      </>
    );
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyle(), style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={disabled ? [Colors.gray400, Colors.gray400] : (Colors.gradientPrimary as any)}
          style={[StyleSheet.absoluteFill, { borderRadius: BorderRadius.lg }]}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          getButtonStyle(),
          {
            backgroundColor: disabled ? Colors.gray400 : Colors.secondary,
          },
          style,
        ]}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          getButtonStyle(),
          {
            backgroundColor: Colors.white,
            borderWidth: 1.5,
            borderColor: disabled ? Colors.gray400 : Colors.primary,
          },
          style,
        ]}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  if (variant === 'ghost') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          getButtonStyle(),
          {
            backgroundColor: 'transparent',
            shadowOpacity: 0,
            elevation: 0,
          },
          style,
        ]}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  if (variant === 'danger') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          getButtonStyle(),
          {
            backgroundColor: disabled ? Colors.gray400 : Colors.error,
          },
          style,
        ]}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return null;
};