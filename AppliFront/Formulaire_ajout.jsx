import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function Formulaire_ajout({ onValider }) {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codepostal, setCodepostal] = useState('');
  const [ville, setVille] = useState('');
  const [infos, setInfos] = useState(null);

  const handleSubmit = () => {
    const data = { nom, description, adresse, codepostal, ville };
    setInfos(data);
    if (onValider) {
      onValider(data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#0055A4', '#fff', '#EF4135']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.background}


      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={{ uri: 'https://i.postimg.cc/2SLtxq3S/logo-epn.png' }}
           style={{ width: 370, height: 350, alignSelf: 'center', marginBottom: 40 }}
            resizeMode="contain"
          />

<View style={styles.rowButtons}>
  <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={{ flex: 1, marginHorizontal: 8 }}>
    <LinearGradient
      colors={['#0055A4', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientButton}
    >
      <Text style={styles.actionButtonText}>Valider</Text>
    </LinearGradient>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => { if (onValider) onValider(null); }} activeOpacity={0.7} style={{ flex: 1, marginHorizontal: 8 }}>
    <LinearGradient
      colors={['#fff', '#0055A4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientButton, { borderWidth: 2, borderColor: '#0055A4' }]}
    >
      <Text style={[styles.actionButtonText, { color: '#0055A4' }]}>Retour</Text>
    </LinearGradient>
  </TouchableOpacity>
</View>

          <Text style={styles.label}>Nom de l'entreprise</Text>
          <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Nom" />

          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />

          <Text style={styles.label}>Adresse</Text>
          <TextInput style={styles.input} value={adresse} onChangeText={setAdresse} placeholder="Adresse" />

          <Text style={styles.label}>Code postal</Text>
          <TextInput style={styles.input} value={codepostal} onChangeText={setCodepostal} placeholder="Code postal" keyboardType="numeric" />

          <Text style={styles.label}>Ville</Text>
          <TextInput style={styles.input} value={ville} onChangeText={setVille} placeholder="Ville" />

          <View style={{ height: 16 }} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
  },
  // Retire les styles bullesContainer, bulle, bulleTexte si tu ne les utilises plus
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#0055A4',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  rowButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 16,
},
gradientButton: {
  paddingVertical: 14,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 4,
  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},
actionButton: {
  flex: 1,
  marginHorizontal: 8,
  paddingVertical: 14,
  borderRadius: 30, // plus arrondi
  alignItems: 'center',
  elevation: 4,
  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},
actionButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
  letterSpacing: 1,
  textTransform: 'uppercase',
  letterSpacing: 2,
},
});
