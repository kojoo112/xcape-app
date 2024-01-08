import database from '@react-native-firebase/database';

export const db = ref => {
  return database()
    .ref(`/${ref}`)
    .on('value', snapshot => {
      console.log(snapshot.val());
      return snapshot.val();
    });
};
