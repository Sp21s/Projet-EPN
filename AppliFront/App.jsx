import React from 'react';
import ModalEntreprise from './ModalEntreprise';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';

const entreprises = [
  { id: '1', nom: 'Libraire L\'oiseau Lire', description: 'librarie.', detail: "remise de 5%", logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png' },
  { id: '2', nom: 'Apple', description: 'Électronique grand public et logiciels innovants.' },
  { id: '3', nom: 'Google', description: 'Moteur de recherche et géant de la technologie.' },
  { id: '4', nom: 'Amazon', description: 'Leader du e-commerce et du cloud computing.' },
  { id: '5', nom: 'Tesla', description: 'Véhicules électriques et énergie propre.' },
  { id: '6', nom: 'Samsung', description: 'Marque de téléphone bien chinoise' },
  { id: '7', nom: 'Facebook', description: 'Réseau social et applications de communication.' },
  { id: '8', nom: 'IBM', description: 'Solutions informatiques et cloud pour entreprises.' },
  { id: '9', nom: 'Intel', description: 'Leader des processeurs et technologies informatiques.' },
  { id: '10', nom: 'Nvidia', description: 'Pionnier des cartes graphiques et de l\'IA.' },
  { id: '11', nom: 'Sony', description: 'Électronique grand public et divertissement.' },
  { id: '12', nom: 'Oracle', description: 'Solutions de base de données et cloud pour entreprises.' },
  { id: '13', nom: 'Adobe', description: 'Logiciels de création et de design.' },
  { id: '14', nom: 'Spotify', description: 'Service de streaming musical.' },
];

function CarteEntreprise({ nom, description, logo, onPress }) {
  return (
    <TouchableOpacity style={styles.carte} onPress={onPress}>
      {logo && (
        <Image source={{ uri: logo }} style={{ width: 40, height: 40, marginBottom: 8 }} />
      )}
      <Text style={styles.nomEntreprise}>{nom}</Text>
      <Text style={styles.descriptionEntreprise}>{description}</Text>
    </TouchableOpacity>
  );
}

function Application() {
  const modeSombre = useColorScheme() === 'dark';
  const styleFond = {
    backgroundColor: modeSombre ? '#222' : '#03aafd',
    flex: 1,
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedEntreprise, setSelectedEntreprise] = React.useState(null);

  return (
    <SafeAreaView style={styleFond}>
      <StatusBar
        barStyle={modeSombre ? 'light-content' : 'dark-content'}
        backgroundColor={styleFond.backgroundColor}
      />
      <Text style={[styles.entete, { color: modeSombre ? '#fff' : '#222' }]}>Entreprises</Text>

      <ModalEntreprise
        visible={modalVisible}
        entreprise={selectedEntreprise}
        onClose={() => setModalVisible(false)}
      />
      <FlatList
        data={entreprises}
        renderItem={({ item }) => (
          <CarteEntreprise
            nom={item.nom}
            description={item.description}
            logo={item.logo}
            onPress={() => {
              setSelectedEntreprise(item);
              setModalVisible(true);
            }}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grille}
      />
    </SafeAreaView>
  );
}

const TAILLE_CARTE = Dimensions.get('window').width / 2 - 30;

const styles = StyleSheet.create({
  entete: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  grille: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  carte: {
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 16,
    margin: 10,
    width: TAILLE_CARTE,
    height: TAILLE_CARTE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  nomEntreprise: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  descriptionEntreprise: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default Application;
