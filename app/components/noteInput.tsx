import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface NoteInputProps {
  onAddNote: (noteText: string) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote }) => {
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    onAddNote(note);
    setNote('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Escribe una nota"
        style={styles.input}
        value={note}
        onChangeText={setNote}
      />
      <Button title="Agregar Nota" onPress={handleAddNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '70%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default NoteInput;
