import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palette - Nigerian-inspired with professional touch
export const Colors = {
  // Primary Colors
  primary: '#1B5E20', // Deep Green (Nigerian flag inspired)
  primaryLight: '#4CAF50',
  primaryDark: '#0D4E13',
  primarySoft: '#E8F5E8',
  
  // Secondary Colors
  secondary: '#FF8F00', // Warm Orange
  secondaryLight: '#FFB74D',
  secondaryDark: '#E65100',
  secondarySoft: '#FFF3E0',
  
  // Accent Colors
  accent: '#2196F3', // Blue
  accentLight: '#64B5F6',
  accentDark: '#1976D2',
  accentSoft: '#E3F2FD',
  
  // Status Colors
  success: '#4CAF50',
  successSoft: '#E8F5E8',
  warning: '#FF9800',
  warningSoft: '#FFF3E0',
  error: '#F44336',
  errorSoft: '#FFEBEE',
  info: '#2196F3',
  infoSoft: '#E3F2FD',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
  
  // Background Colors
  background: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F5F5',
  
  // Text Colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textTertiary: '#BDBDBD',
  textInverse: '#FFFFFF',
  
  // Border Colors
  border: '#E0E0E0',
  borderLight: '#F5F5F5',
  borderDark: '#BDBDBD',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Gradient Colors
  gradientPrimary: ['#1B5E20', '#4CAF50'],
  gradientSecondary: ['#FF8F00', '#FFB74D'],
  gradientAccent: ['#2196F3', '#64B5F6'],
};

// Typography
export const Typography = {
  // Font Families
  fontFamilyRegular: 'System',
  fontFamilyMedium: 'System',
  fontFamilyBold: 'System',
  fontFamilySemiBold: 'System',
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Text Styles
  heading1: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 36,
    color: Colors.textPrimary,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    color: Colors.textPrimary,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: Colors.textPrimary,
  },
  heading4: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    color: Colors.textPrimary,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: Colors.textTertiary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: Colors.white,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

// Border Radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
};

// Layout
export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  headerHeight: 60,
  tabBarHeight: 80,
  containerPadding: Spacing.md,
  screenPadding: Spacing.lg,
};

// Animation
export const Animation = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    linear: 'linear',
  },
};

// Component Specific Styles
export const ComponentStyles = {
  button: {
    height: 48,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
  },
  input: {
    height: 48,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  card: {
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  header: {
    height: Layout.headerHeight,
    backgroundColor: Colors.surface,
    ...Shadows.sm,
  },
  tabBar: {
    height: Layout.tabBarHeight,
    backgroundColor: Colors.surface,
    ...Shadows.lg,
  },
};

// Z-Index Levels
export const ZIndex = {
  hide: -1,
  base: 0,
  elevated: 10,
  modal: 1000,
  popover: 1010,
  overlay: 1020,
  toast: 1030,
  tooltip: 1040,
};

// Breakpoints
export const Breakpoints = {
  xs: 0,
  sm: 376,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Layout,
  Animation,
  ComponentStyles,
  ZIndex,
  Breakpoints,
};