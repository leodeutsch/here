import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import {
  getStatistics,
  resetStatistics,
} from '../../services/statisticsService'
import { Statistics } from '../../types'
import { profileStyles } from './styles'

export const Profile = () => {
  const { theme } = useTheme()
  const styles = useMemo(() => profileStyles(theme), [theme])

  const [statistics, setStatistics] = useState<Statistics | null>(null)

  const loadStatistics = async () => {
    const stats = await getStatistics()
    setStatistics(stats)
  }

  useEffect(() => {
    loadStatistics()
  }, [])

  const handleResetStatistics = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all statistics? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: async () => {
            await resetStatistics()
            loadStatistics()
          },
          style: 'destructive',
        },
      ],
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <MaterialIcons
            size={56}
            name="person-pin"
            color={theme.colors.primary}
          />
        </View>
        <Text style={styles.name}>Snapper</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Status</Text>
          <TouchableOpacity
            onPress={handleResetStatistics}
            style={styles.resetButton}
          >
            <MaterialIcons
              name="loop"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>
          Created tasks: {statistics?.tasksCreated}
        </Text>
        <Text style={styles.infoText}>
          Concluded tasks: {statistics?.tasksCompleted || 0}
        </Text>
        <Text style={styles.infoText}>
          Done rate: {statistics?.completionRate.toFixed(2) || 0}%
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sobre o App</Text>
        <Text style={styles.infoText}>SnapHabit</Text>
        <Text style={styles.infoText}>Versão 1.0.0</Text>
      </View>
    </ScrollView>
  )
}
