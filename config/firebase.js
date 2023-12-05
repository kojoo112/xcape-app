import database from '@react-native-firebase/database';

export const db = database()
  .ref('/xcape')
  .on('value', snapshot => {
    console.log(snapshot.val());
    return snapshot.val();
  });
