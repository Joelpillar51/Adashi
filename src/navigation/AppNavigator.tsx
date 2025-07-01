import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, MainTabParamList } from '../types';
import { Colors, Typography } from '../constants/theme';

// Import screens (we'll create these next)
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import GroupsScreen from '../screens/GroupsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import PaymentFlowScreen from '../screens/PaymentFlowScreen';
import GroupChatScreen from '../screens/GroupChatScreen';
import GroupSettingsScreen from '../screens/GroupSettingsScreen';
import TransferOwnershipScreen from '../screens/TransferOwnershipScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Groups') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray500,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.borderLight,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: Typography.fontSize.xs,
          fontWeight: Typography.fontWeight.medium as any,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.surface,
            shadowColor: Colors.border,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          },
          headerTintColor: Colors.textPrimary,
          headerTitleStyle: {
            fontSize: Typography.heading4.fontSize,
            fontWeight: Typography.heading4.fontWeight as any,
          },

        }}
      >
        {/* Onboarding and Auth */}
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        
        {/* Main App */}
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        
        {/* Group Screens */}
        <Stack.Screen 
          name="GroupDetails" 
          component={GroupDetailsScreen}
          options={{ title: 'Group Details' }}
        />
        <Stack.Screen 
          name="CreateGroup" 
          component={CreateGroupScreen}
          options={{ title: 'Create Group' }}
        />
        <Stack.Screen 
          name="JoinGroup" 
          component={JoinGroupScreen}
          options={{ title: 'Join Group' }}
        />
        <Stack.Screen 
          name="GroupChat" 
          component={GroupChatScreen}
          options={{ title: 'Group Chat' }}
        />
        <Stack.Screen 
          name="GroupSettings" 
          component={GroupSettingsScreen}
          options={{ title: 'Group Settings' }}
        />
        <Stack.Screen 
          name="TransferOwnership" 
          component={TransferOwnershipScreen}
          options={{ title: 'Transfer Ownership' }}
        />
        
        {/* Payment Flow */}
        <Stack.Screen 
          name="PaymentFlow" 
          component={PaymentFlowScreen}
          options={{ title: 'Make Payment' }}
        />
        
        {/* Profile */}
        <Stack.Screen 
          name="UserProfile" 
          component={UserProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};