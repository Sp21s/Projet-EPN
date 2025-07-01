import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.7;

export default function Dropdown({ options, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-MENU_WIDTH)).current;

  const openMenu = () => {
    setOpen(true);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(translateX, {
      toValue: -MENU_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setOpen(false));
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity style={styles.menuIcon} onPress={openMenu} activeOpacity={0.7}>
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </TouchableOpacity>
      {open && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            onPress={closeMenu}
            activeOpacity={1}
            pointerEvents="auto"
          />
          <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
            <View style={styles.menuTitleRow}>
              <Text style={styles.menuTitle}>Filtre</Text>
              <Text style={styles.selectedText}>
                {selected ? `: ${selected}` : ''}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.option, styles.clearOption]}
              onPress={() => {
                onSelect(null);
                closeMenu();
              }}
            >
              <Text style={[styles.optionText, styles.clearText]}>Effacer les filtres</Text>
            </TouchableOpacity>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => {
                  onSelect(option);
                  closeMenu();
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  menuIcon: {
    margin: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    zIndex: 110,
  },
  bar: {
    width: 28,
    height: 4,
    backgroundColor: '#222',
    marginVertical: 2,
    borderRadius: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 101,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: MENU_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 18,
    zIndex: 102,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 0 },
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  menuTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  selectedText: {
    fontSize: 16,
    color: '#03aafd',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
  clearOption: {
    backgroundColor: '#f5f5f5',
  },
  clearText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});