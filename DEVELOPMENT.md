# Adashi - Development Documentation

## Project Overview

Adashi is a comprehensive mobile application for managing rotating savings groups (ROSCA/tontine) in Nigeria. The app provides a digital platform for transparent contribution tracking, automated reminders, and seamless payment coordination among group members.

## Architecture & Tech Stack

### Frontend (Mobile App)
- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Navigation**: React Navigation v7 (Stack + Bottom Tabs)
- **State Management**: React Hooks + Context (extensible to Redux)
- **UI Components**: Custom component library with consistent design system
- **Styling**: StyleSheet with centralized theme system
- **Storage**: Expo SecureStore for sensitive data
- **Notifications**: Expo Notifications
- **Platform Support**: iOS, Android, Web

### Backend Integration
- **API Layer**: RESTful API service layer with TypeScript
- **Authentication**: JWT-based with secure token storage
- **Payment Integration**: Nigerian banking system support
- **Real-time Features**: WebSocket support for chat and notifications

## Key Features Implemented

### 🏠 Home Dashboard
- **Overview Stats**: Total savings, active groups, pending payments
- **Quick Actions**: Create group, join group, view notifications
- **Recent Activity**: Latest group updates and contributions
- **Upcoming Payments**: Due dates with urgency indicators

### 👥 Group Management
- **Group Creation**: Full setup wizard with rules configuration
- **Member Management**: Invite system with role-based permissions
- **Ownership Transfer**: Admin can transfer ownership to other members
- **Group Settings**: Customizable rules and preferences

### 💰 Contribution Tracking
- **Real-time Progress**: Visual progress bars for contribution cycles
- **Payment Status**: Clear status indicators (collecting, disbursed, overdue)
- **Rotation Schedule**: Transparent recipient order and timing
- **Payment History**: Complete transaction records

### 🔔 Notifications System
- **Payment Reminders**: 5-day advance warnings + 2-day grace period
- **Status Updates**: Collection completion, disbursement notifications
- **Group Activities**: Member joins, admin actions, chat messages

### 💳 Payment Flow
- **Bank Transfer Coordination**: Nigerian banking system integration
- **Transfer Details**: Structured payment information display
- **Confirmation System**: Admin verification workflow
- **Receipt Management**: Transaction documentation

### 💬 Communication
- **Group Chat**: Integrated messaging system
- **Number Selection**: In-chat rotation number choosing
- **System Messages**: Automated status updates
- **Real-time Updates**: Live message synchronization

## Project Structure

```
/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx       # Button component with variants
│   │   ├── Input.tsx        # Input component with validation
│   │   ├── Card.tsx         # Card container component
│   │   ├── GroupCard.tsx    # Group display component
│   │   └── index.ts         # Component exports
│   │
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx   # Dashboard with overview
│   │   ├── GroupsScreen.tsx # Groups listing
│   │   ├── OnboardingScreen.tsx
│   │   ├── AuthScreen.tsx
│   │   └── ...              # Other screens
│   │
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx # Main navigation setup
│   │
│   ├── services/            # Business logic and API
│   │   └── api.ts          # API service layer
│   │
│   ├── constants/           # App constants and theme
│   │   └── theme.ts        # Design system tokens
│   │
│   ├── utils/               # Utility functions
│   │   └── index.ts        # Helper functions
│   │
│   └── types/               # TypeScript definitions
│       └── index.ts        # App-wide type definitions
│
├── assets/                  # Static assets
├── App.tsx                 # Root component
├── app.json               # Expo configuration
└── package.json           # Dependencies and scripts
```

## Component Design System

### Colors
- **Primary**: Nigerian green (#1B5E20) - inspired by flag
- **Secondary**: Warm orange (#FF8F00) - trust and energy
- **Accent**: Blue (#2196F3) - reliability
- **Status Colors**: Success, warning, error, info variants
- **Neutrals**: Comprehensive gray scale

### Typography
- **Headings**: 4 levels with consistent spacing
- **Body Text**: 2 variants for content hierarchy
- **Captions**: Small text for metadata
- **Button Text**: Medium weight for actions

### Components
- **Button**: 5 variants (primary, secondary, outline, ghost, danger)
- **Input**: Validation states, icons, currency support
- **Card**: Multiple padding and styling variants
- **GroupCard**: Complex component with progress tracking

## User Roles & Permissions

### Group Admin (Creator/Owner)
- Create and configure groups
- Set contribution amounts and schedules
- Determine rotation order (or allow member selection)
- Transfer ownership to other members
- Confirm payments and manage disbursements
- Send reminders and notifications
- Access group analytics and stats

### Group Members
- Join groups via invite codes
- View contribution status and rotation schedule
- Make payments to current recipient
- Select rotation numbers (if admin allows)
- Participate in group chat
- Receive automated notifications
- Access payment history

## Key Workflows

### Group Creation Flow
1. **Basic Info**: Name, description, contribution amount
2. **Rules Setup**: Frequency, grace period, member selection
3. **Member Invitation**: Generate invite codes
4. **Review & Launch**: Confirm settings and activate

### Payment Flow
1. **Payment Details**: View recipient and amount
2. **Transfer Info**: Bank details and reference
3. **Payment Submission**: Upload proof and details
4. **Admin Confirmation**: Review and confirm payment
5. **Status Update**: Notify all members

### Rotation Management
1. **Order Determination**: Admin sets or members choose
2. **Cycle Tracking**: Automatic progression
3. **Recipient Notification**: Alert current recipient
4. **Collection Monitoring**: Track contribution progress
5. **Disbursement**: Admin-managed fund transfer

## Nigerian Banking Integration

### Supported Features
- **Bank Account Verification**: Real-time account validation
- **Transfer Details**: Structured recipient information
- **Reference Generation**: Unique payment references
- **Receipt Tracking**: Payment proof management

### Popular Banks Supported
- Access Bank, GTB, First Bank, UBA, Zenith Bank
- Fidelity Bank, Union Bank, Sterling Bank
- FCMB, Ecobank, and other major Nigerian banks

## Security Features

### Data Protection
- **Secure Storage**: Sensitive data encrypted locally
- **JWT Authentication**: Secure API access tokens
- **Input Validation**: Client and server-side validation
- **Error Handling**: Graceful failure management

### User Verification
- **Phone Verification**: SMS-based account confirmation
- **Bank Account Verification**: Real-time validation
- **Payment Confirmation**: Multi-step verification process

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Studio
- Expo Go app for device testing

### Installation
```bash
# Clone and install dependencies
git clone <repository>
cd adashi-app
npm install

# Start development server
npm start

# Run on specific platforms
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

### Environment Configuration
Create `.env` file:
```
API_BASE_URL=https://api.adashi.app/v1
EXPO_PROJECT_ID=your-project-id
```

## Testing Strategy

### Unit Testing
- Component testing with React Native Testing Library
- Utility function testing with Jest
- API service mocking and testing

### Integration Testing
- Navigation flow testing
- API integration testing
- Payment flow end-to-end testing

### User Acceptance Testing
- Nigerian user feedback and testing
- Banking integration validation
- Accessibility and usability testing

## Deployment

### Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure builds
eas build:configure

# Build for app stores
eas build --platform android
eas build --platform ios

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

### Over-the-Air Updates
```bash
# Publish updates
eas update --branch production
```

## Localization Support

### Nigerian Context
- **Currency**: Nigerian Naira (₦) display and formatting
- **Time Zone**: West Africa Time (WAT) support
- **Phone Format**: Nigerian mobile number validation
- **Banking**: Local bank integration and terminology

### Language Support
- Primary: English (Nigerian context)
- Extensible: Hausa, Yoruba, Igbo support planned

## Performance Optimization

### App Performance
- **Lazy Loading**: Screen-based code splitting
- **Image Optimization**: Efficient asset management
- **State Management**: Optimized re-rendering
- **Bundle Size**: Tree shaking and dead code elimination

### User Experience
- **Offline Support**: Local data caching
- **Fast Navigation**: Optimized screen transitions
- **Responsive Design**: Multiple screen size support
- **Accessibility**: Screen reader and keyboard support

## Future Enhancements

### Planned Features
- **Advanced Analytics**: Group performance insights
- **Smart Reminders**: AI-powered notification timing
- **Multi-Currency**: Support for USD and other currencies
- **Investment Options**: Group investment opportunities
- **Referral System**: Member recruitment rewards

### Technical Improvements
- **Redux Integration**: Advanced state management
- **Real-time Chat**: WebSocket-based messaging
- **Push Notifications**: Enhanced notification system
- **Biometric Auth**: Fingerprint and Face ID support

## Support & Maintenance

### Monitoring
- **Crash Reporting**: Automatic error tracking
- **Analytics**: User behavior and app performance
- **API Monitoring**: Backend service health
- **User Feedback**: In-app feedback collection

### Updates
- **Security Patches**: Regular vulnerability updates
- **Feature Releases**: Monthly feature additions
- **Bug Fixes**: Bi-weekly maintenance releases
- **Performance**: Quarterly optimization reviews

## Contributing

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Structured commit messages

### Pull Request Process
1. Fork and create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit PR with description
5. Code review and approval
6. Merge to main branch

## License

This project is proprietary software developed for Nigerian rotating savings groups. All rights reserved.

---

**Contact**: development@adashi.app
**Documentation**: Last updated December 2024