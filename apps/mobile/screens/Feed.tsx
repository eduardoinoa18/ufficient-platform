import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedScreen() {
  const feedItems = [
    {
      id: 1,
      user: 'Alex',
      action: 'earned the "Efficiency Champion" badge',
      time: '2 hours ago',
      type: 'badge'
    },
    {
      id: 2,
      user: 'Sarah',
      action: 'completed a 14-day streak',
      time: '4 hours ago',
      type: 'streak'
    },
    {
      id: 3,
      user: 'Mike',
      action: 'completed 25 tasks this week',
      time: '1 day ago',
      type: 'milestone'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>
          Community Feed
        </Text>

        <Text style={styles.subtitle}>
          See what the community is achieving
        </Text>

        <View style={styles.feedContainer}>
          {feedItems.map((item) => (
            <View key={item.id} style={styles.feedItem}>
              <View style={styles.userRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.user[0]}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.actionText}>
                    <Text style={styles.userName}>{item.user}</Text>
                    {` ${item.action}`}
                  </Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>

              {item.type === 'badge' && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>🏆 Badge Achievement</Text>
                </View>
              )}

              {item.type === 'streak' && (
                <View style={styles.streakContainer}>
                  <Text style={styles.streakText}>🔥 Streak Milestone</Text>
                </View>
              )}

              {item.type === 'milestone' && (
                <View style={styles.milestoneContainer}>
                  <Text style={styles.milestoneText}>🎯 Task Milestone</Text>
                </View>
              )}
            </View>
          ))}
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
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 24,
  },
  feedContainer: {
    gap: 16,
  },
  feedItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#dbeafe',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  actionText: {
    color: '#111827',
  },
  userName: {
    fontWeight: '600',
  },
  timeText: {
    color: '#6b7280',
    fontSize: 14,
  },
  badgeContainer: {
    backgroundColor: '#fefce8',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  badgeText: {
    color: '#92400e',
  },
  streakContainer: {
    backgroundColor: '#fff7ed',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  streakText: {
    color: '#c2410c',
  },
  milestoneContainer: {
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  milestoneText: {
    color: '#166534',
  },
});
