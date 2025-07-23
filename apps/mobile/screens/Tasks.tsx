import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TasksScreen() {
  const taskCategories = ['Work', 'Personal', 'Fitness', 'Side Hustle', 'Social'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>
          Task Management
        </Text>

        {/* Add Task Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>
            + Add New Task
          </Text>
        </TouchableOpacity>

        {/* AI Suggestions */}
        <View style={styles.aiSuggestions}>
          <Text style={styles.aiTitle}>
            🤖 AI Task Suggestions
          </Text>
          <Text style={styles.aiDescription}>
            Based on your preferences, here are some recommended tasks:
          </Text>
          <TouchableOpacity style={styles.generateButton}>
            <Text style={styles.generateButtonText}>Generate Tasks</Text>
          </TouchableOpacity>
        </View>

        {/* Task Categories */}
        <Text style={styles.sectionTitle}>
          Categories
        </Text>
        <View style={styles.categoriesContainer}>
          {taskCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryItem}
            >
              <Text style={styles.categoryName}>{category}</Text>
              <Text style={styles.taskCount}>0 tasks</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  aiSuggestions: {
    backgroundColor: '#faf5ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  aiTitle: {
    color: '#7c3aed',
    fontWeight: '600',
    marginBottom: 8,
  },
  aiDescription: {
    color: '#8b5cf6',
    marginBottom: 12,
  },
  generateButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  categoriesContainer: {
    gap: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  categoryName: {
    fontWeight: '500',
    color: '#111827',
  },
  taskCount: {
    color: '#6b7280',
  },
});
