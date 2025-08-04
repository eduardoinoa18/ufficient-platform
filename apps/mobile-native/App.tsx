import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C00FF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
});

// Temporary placeholder screens
const DashboardScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Track your progress and streaks</Text>
    </View>
);

const TasksScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>Manage your daily tasks</Text>
    </View>
);

const FeedScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Feed</Text>
        <Text style={styles.subtitle}>Connect with the community</Text>
    </View>
);

const ProfileScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>View your achievements</Text>
    </View>
);

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: '#6C00FF',
                        tabBarInactiveTintColor: '#9CA3AF',
                        headerStyle: {
                            backgroundColor: '#6C00FF',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Tab.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                        options={{
                            title: 'Dashboard',
                            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                                <Ionicons name="analytics-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Tasks"
                        component={TasksScreen}
                        options={{
                            title: 'Tasks',
                            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                                <Ionicons name="checkbox-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Feed"
                        component={FeedScreen}
                        options={{
                            title: 'Feed',
                            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                                <Ionicons name="people-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            title: 'Profile',
                            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                                <Ionicons name="person-outline" size={size} color={color} />
                            ),
                        }}
                    />
                </Tab.Navigator>
                <StatusBar style="light" />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
