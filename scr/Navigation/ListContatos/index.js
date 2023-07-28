import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StatusBar, StyleSheet, Image, TouchableOpacity, Modal, Alert } from 'react-native'
import { atualizarContato, eliminarContato, getContatos } from '../../../baseDados/crudContacto';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


export default function ListContatos() {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [idDel, setIdDel] = useState(0);
  const [showDel, setShowDel] = useState(false);

  const [idEdit, setIdEdit] = useState(0);
  const [showEdit, setShowEdit] = useState(false);

  

  useEffect(() => {
    // Carregar os contatos ao iniciar o componente
    loadContacts();
  }, []);

  const loadContacts = () => {
    getContatos(
        (contatos) => {
          // Atualiza o estado com os dados dos contatos obtidos
          setContacts(contatos);
        },
        (errorMessage) => {
          // Ocorreu um erro ao obter os contatos, faça o tratamento adequado aqui
          console.log(errorMessage);
        }
      );
  };

  const delContato = (id) => {
    setShowDel(true);
    setIdDel(id);
  }

  const editContato = (id) => {
    setShowEdit(true);
    setIdEdit(id);
  }

  const handleAtualizarContato = (nome, contato, email, foto) => {
    atualizarContato(
      idEdit,
      nome,
      contato,
      email,
      foto,
      () => {
        // Operação de atualização bem-sucedida
        Alert.alert('Sucesso', 'Contato atualizado com sucesso!');

        loadContacts();
        setShowEdit(false);
      },
      (errorMessage) => {
        // Ocorreu um erro ao atualizar o contato
        Alert.alert('Erro', errorMessage);
      }
    );
  };

  const handleEliminarContato = () => {
    console.log("Iremos eliminar o, " + JSON.stringify(idDel));
    eliminarContato(
      idDel,
      () => {
        // Operação de eliminação bem-sucedida
        Alert.alert('Sucesso', 'Contato eliminado com sucesso!');
        // carregar os contatos
        loadContacts();
        setShowDel(false);
      },
      (errorMessage) => {
        // Ocorreu um erro ao eliminar o contato
        Alert.alert('Erro', errorMessage);
      }
    );
  };

  

  const renderContatos = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.viewItem}>
        <Image source={{ uri: item.photo }} style={{ width: 64, height: 64, borderRadius: 50 }} />
        <Text style={styles.contactName}>{item.name}</Text>
      </View>
      <View style={styles.viewItem}>
        <TouchableOpacity style={styles.item} onPress={() => editContato(item.id)}>
            <AntDesign name="edit" size={30} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => delContato(item.id)}>
            <AntDesign name="delete" size={30} color="red" />
        </TouchableOpacity>
      </View> 
    </View>
  );

  const CardContatos = () => {

    //pesquisar o contato
    const contact = contacts.find((c) => c.id === idEdit);

    const [nome, setNome] = useState(contact.name);
    const [contato, setContato] = useState(contact.contact);
    const [email, setEmail] = useState(contact.email);
    const [foto, setFoto] = useState(contact.photo);
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

    const atualizar = () => {
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
        //atualizar
        handleAtualizarContato(nome, contato, email, foto);
    };

    return(
        <View style={styles.viewEdit}>
            
            <AntDesign name="closecircle" size={50} color="black" style={styles.closeIcon} onPress={() => setShowEdit(false)} />
            <Text style={styles.editText}>Editar</Text>
            {foto && (
                <Image source={{ uri: foto.uri }} style={{ width: 100, height: 100 }} />
            )}
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
                <Text style={styles.btTxt}>Atualizar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={atualizar} style={[styles.btAdicionar, {marginTop: 30}]}>
                <Text style={styles.btTxt}>Atualizar</Text>
            </TouchableOpacity>
        </View>
    )};
  

  return (
    <View style={styles.container}>
      <StatusBar />
      {contacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.name} // Usamos o nome como chave única
          renderItem={renderContatos}
        />
      ) : (
        <Text>Sem contatos disponíveis</Text>
      )}

    <Modal animationType="slide"
            animationInTiming={500}
            animationOutTiming={500}
            visible={showEdit}
            transparent={true}>
                <CardContatos />
        </Modal>

        <Modal animationType="slide"
            animationInTiming={500}
            animationOutTiming={500}
            visible={showDel}
            transparent={true}>
                <View style={styles.viewComfirmacao}>
                    <View style={styles.boxComfirmacao}>
                        <Text style={styles.boxTitleComfirmacao}>Tem a certeza que pretende eliminar?</Text>
                        <View style={styles.boxViewComfirmacao}>
                            <TouchableOpacity style={styles.boxBtSim} onPress={() => handleEliminarContato()}>
                                <Text style={styles.boxBtTxt}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boxBtNao} onPress={() => setShowDel(false)}>
                                <Text style={styles.boxBtTxt}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 50,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Alinha as Views lado a lado com espaçamento entre elas
    paddingVertical: 10,
    width: '70%'
    
  },
  viewItem:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  item:{
    margin: 10
  },

  contactName: {
    flex: 1,
    fontSize: 16,
  },
  contactPhoto: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
    viewComfirmacao:{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    boxComfirmacao:{
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        elevation: 20
    },
    boxTitleComfirmacao:{
        color: '#2488FF',
        textAlign: 'center',
        fontSize: 18
    },
    boxViewComfirmacao:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    boxBtSim:{
        backgroundColor: '#d00000',
        width: '45%',
        padding: 5,
        margin: 5,
        borderRadius: 10,
    
    },
    boxBtNao:{
        backgroundColor: '#2488FF',
        width: '45%',
        padding: 5,
        margin: 5,
        borderRadius: 10,

    },
    boxBtTxt:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    },
    txtNgm:{
        textAlign: 'center',
        color: '#A0A0A0',
        margin: 10,
        fontSize: 16

    },
    viewEdit:{
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: '#fff'
    },
    editText:{  
        fontSize: 30,
        textAlign: 'center',
        color: '#2488FF',
        fontWeight: 'bold',
        marginBottom: 10
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
      }
});
