import React from 'react';
import ModalEntreprise from './ModalEntreprise';
import Formulaire_ajout from './Formulaire_ajout';
import Dropdown from './Dropdown';
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
import Icon from 'react-native-vector-icons/MaterialIcons';

function CarteEntreprise({ nom, description, logo, onPress }) {
  const isValidLogo = logo && (logo.startsWith('http://') || logo.startsWith('https://'));
  return (
    <TouchableOpacity style={styles.carte} onPress={onPress}>
      {isValidLogo ? (
        <Image source={{ uri: logo }} style={{ width: 40, height: 60, marginBottom: 8 }} />
      ) : (
        <View style={{ width: 60, height: 80, marginBottom: 8, backgroundColor: '#ccc', borderRadius: 8 }} />
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
  const [modalAjoutVisible, setModalAjoutVisible] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [entreprises, setEntreprises] = React.useState([]); // <-- Ajout

  // Chargement des entreprises depuis l'API
  React.useEffect(() => {
    fetch('http://10.0.2.2:8000/entreprise')
      .then(res => {
        if (!res.ok) throw new Error('API non disponible');
        return res.json();
      })
      .then(data => {
        setEntreprises(data);
        console.log('Entreprises reçues:', data);
      })
      .catch((err) => {
        setEntreprises([]);
        console.error('Erreur lors du fetch:', err);
      });
  }, []);

  // Filtrage dynamique
  const filteredEntreprises = selectedOption
    ? entreprises.filter(
        e =>
          e.category &&
          e.category.toLowerCase() === selectedOption.toLowerCase()
      )
    : entreprises;

  return (
    <SafeAreaView style={styleFond}>
      <StatusBar
        barStyle={modeSombre ? 'light-content' : 'dark-content'}
        backgroundColor={styleFond.backgroundColor}
      />
       <Dropdown
        options={['Culture/Loisirs', 'Mobilité', 'Restauration,épicerie', 'sport']}
        selected={selectedOption}
        onSelect={setSelectedOption}
      />
      <Text style={[styles.entete, { color: modeSombre ? '#fff' : '#222' }]}>Entreprises</Text>

      <ModalEntreprise
        visible={modalVisible}
        entreprise={selectedEntreprise}
        onClose={() => setModalVisible(false)}
      />
      <FlatList
        data={filteredEntreprises}
        renderItem={({ item }) => (
          <CarteEntreprise
            nom={item.raison_social}
            adresse={item.adresse}
            codepostal={item.codepostal}
            ville={item.ville}
            description={item.detail}
            logo={item.logo}
            onPress={() => {
              setSelectedEntreprise(item);
              setModalVisible(true);
            }}
          />
        )}
        keyExtractor={item => item.id?.toString() || item.nom}
        numColumns={2}
        contentContainerStyle={styles.grille}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalAjoutVisible(true)}
      >
        <Icon name="add-circle" size={32} color="#fff" />
      </TouchableOpacity>

      {/* MODAL POUR LE FORMULAIRE */}
     <Modal
        visible={modalAjoutVisible}
        animationType="slide"
        onRequestClose={() => setModalAjoutVisible(false)}
      >
        <Formulaire_ajout onValider={() => setModalAjoutVisible(false)} />
        
      </Modal>

    </SafeAreaView>
  );
}

const TAILLE_CARTE = Dimensions.get('window').width / 2 - 30;

const styles = StyleSheet.create({
 fab: {
  position: 'absolute',
  right: 24,
  bottom: 32,
  backgroundColor: '#0055A4',
  width: 64,
  height: 64,
  borderRadius: 32,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 8,
  zIndex: 10,
  borderWidth: 3,
  borderColor: '#fff',
  shadowColor: '#0055A4',
  shadowOpacity: 0.35,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },


  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 24,
    backgroundColor: '#0055A4',
    borderRadius: 20,
    padding: 8,
    zIndex: 20,
  },

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
