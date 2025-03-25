import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { createStyle } from './styles'

export const Profile = () => {
  const styles = createStyle()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://ui-avatars.com/api/?name=Usuario&background=random',
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Usuário</Text>
        <Text style={styles.subtitle}>Convidado</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sobre o App</Text>
        <Text style={styles.infoText}>Here - Gerenciador de Convidados</Text>
        <Text style={styles.infoText}>Versão 1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Detalhes do Evento</Text>
        <Text style={styles.infoText}>Casamento Mércia & Leo</Text>
        <Text style={styles.infoText}>17 de Agosto de 2024</Text>
        <Text style={styles.infoText}>Local: A confirmar</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
