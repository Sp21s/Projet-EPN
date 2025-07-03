import React from 'react';
import { Modal, View, Text, Image, Button, ScrollView } from 'react-native';

export default function ModalEntreprise({ visible, entreprise, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', maxHeight: 400, width: 300 }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            {entreprise && entreprise.logo && (
              <Image source={{ uri: entreprise.logo }} style={{ width: 80, height: 90, marginTop: 10 }} />
            )}
          <Text style={{ fontSize: 22, fontWeight: 'bold', fontFamily: 'serif', color: '#222' }}>
              {entreprise ? entreprise.nom : ''}
          </Text>
            <Text style={{ fontSize: 16,  marginBottom: 8 }}>
              {entreprise ? entreprise.raison_social : ''}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              {entreprise ? entreprise.codepostal : ''}
            </Text>
            <Text style={{ fontSize: 16,  marginBottom: 8 }}>
              {entreprise ? entreprise.ville : ''}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
              {entreprise ? entreprise.adresse : ''}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
              {entreprise ? entreprise.code_postal + ' ' + entreprise.ville : ''}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8, textAlign: 'center', color: '#007AFF' }}>
              {entreprise ? entreprise.site_web : ''}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
              {entreprise ? entreprise.description : ''}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8, textAlign: 'center'}}>
              {entreprise ? entreprise.detail : ''}
              
            </Text>
          </ScrollView>
          <Button title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}