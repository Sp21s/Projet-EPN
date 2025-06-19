import React from 'react';
import { Modal, View, Text, Image, Button, ScrollView } from 'react-native';

export default function ModalEntreprise({ visible, entreprise, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', maxHeight: 400, width: 300 }}>
          <ScrollView>
            {entreprise && entreprise.logo && (
              <Image source={{ uri: entreprise.logo }} style={{ width: 60, height: 60, marginBottom: 12 }} />
            )}
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
              {entreprise ? entreprise.nom : ''}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
              {entreprise ? entreprise.description : ''}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
              {entreprise ? entreprise.detail : ''}
            </Text>
          </ScrollView>
          <Button title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}