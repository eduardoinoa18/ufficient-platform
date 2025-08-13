import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createTask, fetchTasks, Task } from './api';

const Tab = createBottomTabNavigator();

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    list: {
        padding: 16,
        gap: 12,
    },
    card: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    cardTitle: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '600',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#E5E7EB',
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 16,
        color: '#111827',
    },
    button: {
        backgroundColor: '#6C00FF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

// Placeholder Dashboard
const DashboardScreen = () => (
    <View style={styles.center}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Track your progress and streaks</Text>
    </View>
);

// Tasks screen with API integration and optimistic updates
const TasksScreen = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const userId = 'demo-user';

    const load = async () => {
        try {
            setLoading(true);
            const data = await fetchTasks(userId);
            setTasks(data);
            setError(null);
        } catch (e: any) {
            setError(e.message || 'Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const onAdd = async () => {
        if (!newTitle.trim()) return;
        const optimistic: Task = {
            id: `tmp-${Date.now()}`,
            userId,
            title: newTitle.trim(),
            completed: false,
        };
        setTasks((t) => [optimistic, ...t]);
        setNewTitle('');
        try {
            const created = await createTask({ userId, title: optimistic.title });
            setTasks((prev) => prev.map((x) => (x.id === optimistic.id ? created : x)));
        } catch (e) {
            // rollback
            setTasks((prev) => prev.filter((x) => x.id !== optimistic.id));
            setError('Failed to add task');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#6C00FF" />
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={{ padding: 16 }}
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.center}>
                            <Text style={styles.subtitle}>No tasks yet. Add one below.</Text>
                        </View>
                    )}
                />
            )}
            <View style={styles.inputRow}>
                <TextInput
                    placeholder="Add a new task"
                    value={newTitle}
                    onChangeText={setNewTitle}
                    style={styles.input}
                    returnKeyType="done"
                    onSubmitEditing={onAdd}
                />
                <TouchableOpacity style={styles.button} onPress={onAdd}>
                    <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const FeedScreen = () => (
    <View style={styles.center}>
        <Text style={styles.title}>Feed</Text>
        <Text style={styles.subtitle}>Connect with the community</Text>
    </View>
);

const ProfileScreen = () => (
    <View style={styles.center}>
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
