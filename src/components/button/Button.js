import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Button({labelText, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.label}>{labelText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 150,
    backgroundColor: '#645CAA',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 7,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
