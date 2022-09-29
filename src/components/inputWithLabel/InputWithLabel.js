import {View, TextInput, Text, StyleSheet} from 'react-native';

export default function InputWithLabel({
  labelText,
  keyboardType,
  onChange,
  value,
  secureTextEntry = false,
  error,
  onBlur,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{labelText}</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <TextInput
        style={styles.textInput}
        keyboardType={keyboardType}
        onChangeText={onChange}
        value={value}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#A084CA',
    width: 350,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
