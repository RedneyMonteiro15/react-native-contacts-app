import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';

import { inserirContato } from '../../../baseDados/crudContacto';
//import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';



export default function AdicionarContato () {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState(null);
  const [nomeError, setNomeError] = useState(null);
  const [contatoError, setContatoError] = useState(null);
  const [emailError, setEmailError] = useState(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
      console.log("Caminho uri: " + foto);
    }
  };

  const emailIsValid = (email) => {
    // Expressão regular para validar o e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const adicionar = () => {
    // Limpar mensagens de erro anteriores
    setNomeError(null);
    setContatoError(null);
    setEmailError(null);

    // Validação dos campos
    let hasErrors = false;

    if (nome.length <= 5) {
      setNomeError('O nome deve ter mais de 5 caracteres');
      hasErrors = true;
    }

    if (contato.length !== 9) {
      setContatoError('O contato deve ter 9 dígitos');
      hasErrors = true;
    }

    if (!emailIsValid(email)) {
      setEmailError('E-mail inválido');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    //adicionar o adicionar
    inserirContato(
        nome, contato, email, foto,
        (insertedId) => {
            // Sucesso na inserção
            console.log('Contato inserido com sucesso. ID:', insertedId);
            Alert.alert('Sucesso', 'Contato inserido com sucesso!');
        },
        (errorMessage) => {
            // Erro na inserção
            console.log(errorMessage);
            // Ocorreu um erro ao atualizar o contato
            Alert.alert('Erro', errorMessage);
        }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar</Text>
      <TextInput
        style={[styles.input, nomeError && styles.inputError]}
        placeholder="Nome"
        onChangeText={setNome}
        value={nome}
      />
      {nomeError && <Text style={styles.errorMessage}>{nomeError}</Text>}
      <TextInput
        style={[styles.input, contatoError && styles.inputError]}
        placeholder="Contato"
        onChangeText={setContato}
        value={contato}
        keyboardType="numeric"
      />
      {contatoError && <Text style={styles.errorMessage}>{contatoError}</Text>}
      <TextInput
        style={[styles.input, emailError && styles.inputError]}
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      {emailError && <Text style={styles.errorMessage}>{emailError}</Text>}
      <TouchableOpacity onPress={pickImage} style={styles.btAdicionar}>
        <Text style={styles.btTxt}>Selecionar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={adicionar} style={[styles.btAdicionar, {marginTop: 30}]}>
        <Text style={styles.btTxt}>Adicionar</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin: 20
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginVertical: 5,
      width: '100%',
      borderRadius: 20
    },
    inputError: {
      borderColor: 'red',
    },
    errorMessage: {
      color: 'red',
      marginBottom: 5,
    },
    btAdicionar:{
      width: '100%',
      backgroundColor: '#2488FF',
      borderRadius: 20,
      padding: 10,
      alignItems: 'center'
    },
    btTxt:{
        color: '#fff',
    },
    titulo:{  
        fontSize: 30,
        textAlign: 'center',
        color: '#2488FF',
        fontWeight: 'bold',
        marginBottom: 10
    }
  })

