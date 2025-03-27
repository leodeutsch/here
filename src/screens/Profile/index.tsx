import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { getStatistics } from '../../services/statisticsService'
import { COLORS } from '../../styles/theme'
import { Statistics } from '../../types'
import { styles } from './styles'

export const Profile = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null)

  useEffect(() => {
    const loadStatistics = async () => {
      const stats = await getStatistics()
      setStatistics(stats)
    }
    loadStatistics()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {/* <Image
            // TODO: use app icon as user avatar
            source={{
              uri: 'https://ui-avatars.com/api/?name=Usuario&background=random',
            }}
            style={styles.avatar}
          /> */}
          <MaterialIcons
            size={56}
            name="person-pin"
            color={COLORS.PRIMARY}
          />
        </View>
        <Text style={styles.name}>Snapper</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Status</Text>
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
