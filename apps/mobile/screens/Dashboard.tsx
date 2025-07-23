import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Good morning! 👋
          </Text>
          <Text style={styles.subtitle}>
            Ready to unlock your potential today?
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.blueCard]}>
              <Text style={styles.statLabel}>Streak</Text>
              <Text style={styles.statValue}>7 days</Text>
            </View>
            <View style={[styles.statCard, styles.greenCard]}>
              <Text style={styles.statLabel}>Points</Text>
              <Text style={styles.statValue}>250</Text>
            </View>
          </View>
        </View>

        {/* Today's Tasks */}
        <View style={styles.tasksContainer}>
          <Text style={styles.sectionTitle}>
            Today's Tasks
          </Text>
          <View style={styles.tasksList}>
            {[
              { id: 1, title: 'Complete morning workout', category: 'Fitness', completed: true },
              { id: 2, title: 'Review project proposal', category: 'Work', completed: false },
              { id: 3, title: 'Call family', category: 'Personal', completed: false },
            ].map((task) => (
              <TouchableOpacity
                key={task.id}
                style={[styles.taskItem, task.completed ? styles.completedTask : styles.pendingTask]}
              >
                <Text style={[styles.taskTitle, task.completed && styles.completedTaskText]}>
                  {task.title}
                </Text>
                <Text style={styles.taskCategory}>{task.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
  },
  blueCard: {
    backgroundColor: '#dbeafe',
  },
  greenCard: {
    backgroundColor: '#dcfce7',
  },
  statLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tasksContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  tasksList: {
    gap: 12,
  },
  taskItem: {
    padding: 16,
    borderRadius: 8,
  },
  completedTask: {
    backgroundColor: '#f0fdf4',
  },
  pendingTask: {
    backgroundColor: '#ffffff',
  },
  taskTitle: {
    fontWeight: '500',
    color: '#111827',
    fontSize: 16,
  },
  completedTaskText: {
    color: '#166534',
    textDecorationLine: 'line-through',
  },
  taskCategory: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});
