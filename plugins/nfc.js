import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

export const readTag = async () => {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    return JSON.parse(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
  } catch (ex) {
    // console.error('nfc >>> readTag >>> : ', ex);
  } finally {
    await NfcManager.cancelTechnologyRequest();
  }
};

export const writeTag = async tagId => {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const bytes = Ndef.encodeMessage([
      Ndef.textRecord(JSON.stringify(tagId)),
      Ndef.androidApplicationRecord('com.chadev.xcape'),
    ]);
    if (bytes) {
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
    }
  } catch (ex) {
  } finally {
    await NfcManager.cancelTechnologyRequest();
  }
};

export const shutdownNfc = async () => {
  await NfcManager.cancelTechnologyRequest();
};
