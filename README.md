# Adashi - Rotating Savings Group Mobile App

A digital platform for managing rotating savings groups (ROSCA/tontine) where members contribute monthly and take turns receiving the pooled funds.

## Overview

Adashi eliminates manual tracking, reduces disputes, enables transparent contribution tracking, and streamlines payment coordination for Nigerian community groups, friends, family members, or colleagues who want to save money together.

### Key Features

- **Group Management**: Create and manage savings groups with role-based access
- **Contribution Tracking**: Real-time contribution status and payment history
- **Communication**: Integrated group chat with number selection system
- **Payment Coordination**: Bank transfer integration for Nigerian banking system
- **Automated Reminders**: 5-day reminders with 2-day grace periods
- **Ownership Transfer**: Flexible admin controls and permissions

### User Roles

- **Group Admin**: Create groups, manage contributions, determine rotation order
- **Group Members**: Join groups, make payments, view status, select rotation numbers

## Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation
- **UI Components**: Custom components with modern design
- **Notifications**: Expo Notifications
- **Storage**: Expo SecureStore
- **Platform**: Cross-platform (iOS/Android)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Use Expo Go app to scan QR code or run on simulator:
   ```bash
   npm run ios     # iOS simulator
   npm run android # Android emulator
   npm run web     # Web browser
   ```

## Project Structure

```
/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation configuration
│   ├── types/          # TypeScript type definitions
│   ├── services/       # API and business logic
│   ├── utils/          # Helper functions
│   └── constants/      # App constants and theme
├── assets/             # Images, fonts, and static assets
└── App.tsx            # Root component
```

## Target Audience

Nigerian community groups looking for a transparent, reliable, and user-friendly way to manage their rotating savings groups with integrated payment coordination.
