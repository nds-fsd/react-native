import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';

interface NoteItemProps {
  note: {
    id: string;
    text: string;
    completed: boolean;
  };
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onToggleComplete }) => {
  return (
    <View style={styles.noteItem}>
      <Checkbox
        value={note.completed}
        onValueChange={() => onToggleComplete(note.id)}
      />
      <Text style={note.completed ? styles.completed : styles.text}>{note.text}</Text>
      <TouchableOpacity onPress={() => onDelete(note.id)}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    width: '70%',
  },
  completed: {
    width: '70%',
    textDecorationLine: 'line-through',
  },
});

export default NoteItem;
