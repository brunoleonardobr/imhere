import { FlatList, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { styles } from './styles';
import Participant from '../../components/Participant';
import { useState } from 'react';
export default function Home() {

  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante Existe!", "Já existe um participante na lista com esse nome!")
    }
    setParticipants(prev => [...prev, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: String) {
    Alert.alert("Remover", `Deseja remover o participante ${ name }?`,
      [
        {
          text: 'Sim',
          onPress: () => { setParticipants(prev => participants.filter(participant => participant !== name)) }
        },
        {
          text: 'Não',
          style: 'cancel'
        }])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de novembro de 2022</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={name => setParticipantName(name)}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)} />
        )}
        ListEmptyComponent={() => (<Text style={styles.listEmptyText}> Ninguém chegou no evento ainda!</Text>)}
      />
    </View>
  )
}
