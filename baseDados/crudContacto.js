
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('contacts.db');

// Função para verificar se um contato com o mesmo número de contato ou e-mail já existe na tabela "contacts"
const verificarContatoExistente = (contact, email, onSuccess, onError) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM contacts WHERE contact = ? OR email = ?',
        [contact, email],
        (txObj, resultSet) => {
          // Verifica se algum registro foi encontrado
          if (resultSet.rows.length > 0) {
            // Já existe um contato com o mesmo número de contato ou e-mail
            onError('Já existe um contato com o mesmo número de contato ou e-mail.');
          } else {
            // Nenhum registro encontrado, é seguro inserir o novo contato
            onSuccess();
          }
        },
        (txObj, error) => {
          // Ocorreu um erro durante a consulta
          onError('Erro ao verificar o contato existente: ' + error.message);
        }
      );
    });
};

// Método para inserir um novo contato na tabela "contacts"
export const inserirContato = (name, contact, email, photo, onSuccess, onError) => {
  verificarContatoExistente(
    contact,
    email,
    () => {
      // Nenhum registro encontrado, é seguro inserir o novo contato
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO contacts (name, contact, email, photo) VALUES (?, ?, ?, ?)',
          [name, contact, email, photo],
          (txObj, resultSet) => {
            // A inserção foi bem-sucedida, chama o callback de sucesso
            onSuccess(resultSet.insertId);
          },
          (txObj, error) => {
            // Ocorreu um erro durante a inserção, chama o callback de erro
            onError('Erro ao inserir contato: ' + error.message);
          }
        );
      });
    },
    (errorMessage) => {
      // Já existe um contato com o mesmo número de contato ou e-mail, chama o callback de erro
      onError(errorMessage);
    }
  );
};

  

// Método para obter todos os contatos com os campos de nome e foto
export const getContatos = (onSuccess, onError) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM contacts',
        [],
        (txObj, resultSet) => {
          // Obteve os contatos com sucesso, retorna o resultado
          const contatos = [];
  
          for (let i = 0; i < resultSet.rows.length; i++) {
            const row = resultSet.rows.item(i);
            contatos.push({
              id: row.id,
              name: row.name,
              email: row.email,
              contact: row.contact,
              photo: row.photo,
            });
          }
  
          onSuccess(contatos);
        },
        (txObj, error) => {
          // Ocorreu um erro durante a consulta
          onError('Erro ao obter os contatos: ' + error.message);
        }
      );
    });
  };

export const atualizarContato = (id, name, contact, email, photo, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE contacts SET name=?, contact=?, email=?, photo=? WHERE id=?',
      [name, contact, email, photo, id],
      () => {
        onSuccess();
      },
      (txObj, error) => {
        onError('Erro ao atualizar o contato: ' + error.message);
      }
    );
  });
};

export const eliminarContato = (id, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM contacts WHERE id=?',
      [id],
      () => {
        onSuccess();
      },
      (txObj, error) => {
        onError('Erro ao eliminar o contato: ' + error.message);
      }
    );
  });
};

  
  