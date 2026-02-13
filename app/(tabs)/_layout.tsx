import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/authStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user, initialized } = useAuthStore();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (initialized && !user) {
      router.replace('/auth/login');
    }
  }, [initialized, user]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E53935',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="welcome"
        options={{
          title: 'Welcome',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Detect',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
