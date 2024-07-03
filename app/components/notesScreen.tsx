import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteInput from '../components/noteInput';
import NoteItem from '../components/noteItem';

interface Note {
  id: string;
  text: string;
  completed: boolean;
}

const NotesScreen: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [completedNotes, setCompletedNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        const storedCompletedNotes = await AsyncStorage.getItem('completedNotes');
        if (storedNotes) setNotes(JSON.parse(storedNotes));
        if (storedCompletedNotes) setCompletedNotes(JSON.parse(storedCompletedNotes));
      } catch (error) {
        console.error(error);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        await AsyncStorage.setItem('completedNotes', JSON.stringify(completedNotes));
      } catch (error) {
        console.error(error);
      }
    };

    saveNotes();
  }, [notes, completedNotes]);

  const addNoteHandler = (noteText: string) => {
    const newNote: Note = { id: Math.random().toString(), text: noteText, completed: false };
    setNotes((currentNotes) => [...currentNotes, newNote]);
  };

  const deleteNoteHandler = (noteId: string) => {
    setNotes((currentNotes) => currentNotes.filter(note => note.id !== noteId));
    setCompletedNotes((currentNotes) => currentNotes.filter(note => note.id !== noteId));
  };

  const toggleCompleteHandler = (noteId: string) => {
    setCompletedNotes((currentCompletedNotes) => {
        const noteIndex = currentCompletedNotes.findIndex(note => note.id === noteId);
        if (noteIndex >= 0) {
          const updatedNotes = [...currentCompletedNotes];
          const note = updatedNotes[noteIndex];
          note.completed = !note.completed;
          if (!note.completed) {
            setNotes((currentNotes) => [...currentNotes, note]);
            updatedNotes.splice(noteIndex, 1);
            console.log('note completed', updatedNotes);
          }
          return updatedNotes;
        }
        return currentCompletedNotes;
      });
    
  };

  const toggleNotCompleteHandler = (noteId: string) => {
    setNotes((currentNotes) => {
      const noteIndex = currentNotes.findIndex(note => note.id === noteId);
      if (noteIndex >= 0) {
        const updatedNotes = [...currentNotes];
        const note = updatedNotes[noteIndex];
        note.completed = !note.completed;
        if (note.completed) {
            console.log('note current', note);
          setCompletedNotes((currentCompletedNotes) => [...currentCompletedNotes, note]);
          updatedNotes.splice(noteIndex, 1);
          console.log('note', updatedNotes);
        }
        return updatedNotes;
      }
      return currentNotes;
    });

    
  };

  return (
    <ScrollView>
    <View style={styles.screen}>
      <NoteInput onAddNote={addNoteHandler} />
      {notes && notes.length > 0 && <Text style={styles.sectionTitle}>Notas</Text>}
      {notes && notes.length === 0 && <Text style={styles.sectionTitle}>No tienes ninguna nota pendiente</Text>}
      <FlatList
        keyExtractor={(item) => item.id}
        data={notes}
        renderItem={(itemData) => (
          <NoteItem
            note={itemData.item}
            onDelete={deleteNoteHandler}
            onToggleComplete={toggleNotCompleteHandler}
          />
        )}
      />
      {completedNotes && completedNotes.length > 0 && <Text style={styles.sectionTitle}>Notas Completadas</Text>}
      <FlatList
        keyExtractor={(item) => item.id}
        data={completedNotes}
        renderItem={(itemData) => (
          <NoteItem
            note={itemData.item}
            onDelete={deleteNoteHandler}
            onToggleComplete={toggleCompleteHandler}
          />
        )}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default NotesScreen;
