

import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('contacts.db');

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, contact TEXT UNIQUE, email TEXT, photo TEXT NOT NULL)'
    );
  });
};

export const initDatabase = () => {
  createTable();
};
