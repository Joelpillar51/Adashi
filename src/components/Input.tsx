import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  secureTextEntry?: boolean;
  currency?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  secureTextEntry,
  currency,
  multiline = false,
  numberOfLines = 1,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(!secureTextEntry);

  const getBorderColor = () => {
    if (error) return Colors.error;
    if (success) return Colors.success;
    if (isFocused) return Colors.primary;
    return Colors.border;
  };

  const getBackgroundColor = () => {
    if (props.editable === false) return Colors.gray100;
    return Colors.white;
  };

  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    
    return (
      <View style={styles.leftIconContainer}>
        <Ionicons
          name={leftIcon}
          size={20}
          color={error ? Colors.error : Colors.gray500}
        />
      </View>
    );
  };

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={() => setIsSecureVisible(!isSecureVisible)}
        >
          <Ionicons
            name={isSecureVisible ? 'eye-off' : 'eye'}
            size={20}
            color={Colors.gray500}
          />
        </TouchableOpacity>
      );
    }

    if (rightIcon) {
      return (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={onRightIconPress}
        >
          <Ionicons
            name={rightIcon}
            size={20}
            color={error ? Colors.error : Colors.gray500}
          />
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderCurrencyPrefix = () => {
    if (!currency) return null;
    
    return (
      <View style={styles.currencyContainer}>
        <Text style={styles.currencyText}>₦</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, error && styles.errorLabel]}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
            height: multiline ? Math.max(48, numberOfLines * 24) : 48,
          },
          inputStyle,
        ]}
      >
        {renderLeftIcon()}
        {renderCurrencyPrefix()}
        
        <TextInput
          {...props}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            currency && styles.inputWithCurrency,
            multiline && styles.multilineInput,
          ]}
          secureTextEntry={secureTextEntry && !isSecureVisible}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholderTextColor={Colors.gray500}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        
        {renderRightIcon()}
      </View>

      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.subtitle2,
    marginBottom: Spacing.sm,
    color: Colors.textPrimary,
  },
  errorLabel: {
    color: Colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: Typography.body1.fontSize,
    lineHeight: Typography.body1.lineHeight,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  inputWithLeftIcon: {
    marginLeft: Spacing.sm,
  },
  inputWithRightIcon: {
    marginRight: Spacing.sm,
  },
  inputWithCurrency: {
    marginLeft: Spacing.xs,
  },
  multilineInput: {
    paddingVertical: Spacing.sm,
    textAlignVertical: 'top',
  },
  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyText: {
    ...Typography.body1,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium as any,
  },
  helperText: {
    ...Typography.caption,
    marginTop: Spacing.xs,
    color: Colors.textSecondary,
  },
  errorText: {
    color: Colors.error,
  },
});