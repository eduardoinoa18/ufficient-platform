import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingProps {
  onComplete: () => void;
}

interface UserProfile {
  name: string;
  workLifeBalance: 'work-focused' | 'life-focused' | 'balanced';
  taskTypes: string[];
  goals: string[];
  motivationStyle: 'competitive' | 'personal' | 'social';
}

export default function OnboardingScreen({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    workLifeBalance: 'balanced',
    taskTypes: [],
    goals: [],
    motivationStyle: 'personal'
  });

  const totalSteps = 4;

  const workLifeOptions = [
    { key: 'work-focused', label: 'Work-Focused', icon: '💼', desc: 'Career and productivity first' },
    { key: 'life-focused', label: 'Life-Focused', icon: '🌱', desc: 'Personal growth and wellness' },
    { key: 'balanced', label: 'Balanced', icon: '⚖️', desc: 'Equal focus on work and life' }
  ];

  const taskTypeOptions = [
    'Work Projects', 'Fitness & Health', 'Learning & Skills', 'Personal Development',
    'Family & Relationships', 'Hobbies & Creativity', 'Financial Goals', 'Home & Lifestyle'
  ];

  const goalOptions = [
    'Build Daily Habits', 'Increase Productivity', 'Better Work-Life Balance',
    'Learn New Skills', 'Improve Health', 'Achieve Career Goals'
  ];

  const motivationOptions = [
    { key: 'competitive', label: 'Competitive', icon: '🏆', desc: 'Leaderboards and challenges' },
    { key: 'personal', label: 'Personal', icon: '📈', desc: 'Track your own progress' },
    { key: 'social', label: 'Social', icon: '👥', desc: 'Share with friends' }
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save profile and complete onboarding
      console.log('User Profile:', profile);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleTaskType = (type: string) => {
    const updated = profile.taskTypes.includes(type)
      ? profile.taskTypes.filter(t => t !== type)
      : [...profile.taskTypes, type];
    setProfile({ ...profile, taskTypes: updated });
  };

  const toggleGoal = (goal: string) => {
    const updated = profile.goals.includes(goal)
      ? profile.goals.filter(g => g !== goal)
      : [...profile.goals, goal];
    setProfile({ ...profile, goals: updated });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Welcome to UFFICIENT! 🚀</Text>
            <Text style={styles.stepSubtitle}>
              Let's personalize your productivity journey. What's your name?
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              value={profile.name}
              onChangeText={(name) => setProfile({ ...profile, name })}
              autoFocus={true}
            />

            <View style={styles.featureHighlight}>
              <Text style={styles.featureTitle}>🎯 What you'll get:</Text>
              <Text style={styles.featureItem}>• AI-powered task suggestions</Text>
              <Text style={styles.featureItem}>• Gamified streak tracking</Text>
              <Text style={styles.featureItem}>• Social accountability features</Text>
              <Text style={styles.featureItem}>• Personalized productivity insights</Text>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Work-Life Preference</Text>
            <Text style={styles.stepSubtitle}>
              How do you prefer to balance your work and personal life?
            </Text>

            {workLifeOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.optionCard,
                  profile.workLifeBalance === option.key && styles.selectedCard
                ]}
                onPress={() => setProfile({ ...profile, workLifeBalance: option.key as any })}
              >
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <View style={styles.optionContent}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionDesc}>{option.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Task Categories</Text>
            <Text style={styles.stepSubtitle}>
              Which areas would you like to focus on? (Select all that apply)
            </Text>

            <View style={styles.optionsGrid}>
              {taskTypeOptions.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.gridOption,
                    profile.taskTypes.includes(type) && styles.selectedGridOption
                  ]}
                  onPress={() => toggleTaskType(type)}
                >
                  <Text style={[
                    styles.gridOptionText,
                    profile.taskTypes.includes(type) && styles.selectedGridOptionText
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Your Goals & Motivation</Text>
            <Text style={styles.stepSubtitle}>
              What do you hope to achieve with UFFICIENT?
            </Text>

            <Text style={styles.sectionLabel}>Goals (Select your top priorities):</Text>
            <View style={styles.optionsGrid}>
              {goalOptions.map((goal) => (
                <TouchableOpacity
                  key={goal}
                  style={[
                    styles.gridOption,
                    profile.goals.includes(goal) && styles.selectedGridOption
                  ]}
                  onPress={() => toggleGoal(goal)}
                >
                  <Text style={[
                    styles.gridOptionText,
                    profile.goals.includes(goal) && styles.selectedGridOptionText
                  ]}>
                    {goal}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Motivation Style:</Text>
            {motivationOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.optionCard,
                  profile.motivationStyle === option.key && styles.selectedCard
                ]}
                onPress={() => setProfile({ ...profile, motivationStyle: option.key as any })}
              >
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <View style={styles.optionContent}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionDesc}>{option.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.name.trim().length > 0;
      case 2:
        return true; // workLifeBalance has default value
      case 3:
        return profile.taskTypes.length > 0;
      case 4:
        return profile.goals.length > 0;
      default:
        return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / totalSteps) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{step} of {totalSteps}</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderStep()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.nextButton,
            !canProceed() && styles.disabledButton
          ]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {step === totalSteps ? '🚀 Start My Journey' : 'Continue →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C00FF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  featureHighlight: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    lineHeight: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  selectedCard: {
    borderColor: '#6C00FF',
    backgroundColor: '#f3f4f6',
  },
  optionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
    color: '#6b7280',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    marginTop: 8,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  gridOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    margin: 4,
    backgroundColor: '#fff',
  },
  selectedGridOption: {
    backgroundColor: '#6C00FF',
    borderColor: '#6C00FF',
  },
  gridOptionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedGridOptionText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#6C00FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
