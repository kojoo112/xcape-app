import ImageView from './components/views/ImageView';
import VideoView from './components/views/VideoView';
import AudioView from './components/views/AudioView';
import AnswerView from './components/views/AnswerView';
import CameraView from './components/views/CameraView';
import HintView from './components/views/HintView';
import KeypadLock from './components/views/lock/KeypadLock';
import NumberScrollLock from './components/views/lock/NumberScrollLock';
import AlphabetScrollLock from './components/views/lock/AlphabetScrollLock';
import ButtonPadlock from './components/views/lock/ButtonPadlock';

export const ViewType = {
  IMAGE: ImageView,
  VIDEO: VideoView,
  AUDIO: AudioView,
  ANSWER: AnswerView,
  CAMERA: CameraView,
  HINT: HintView,
  KEYPAD_LOCK: KeypadLock,
  NUMBER_SCROLL_LOCK: NumberScrollLock,
  ALPHABET_SCROLL_LOCK: AlphabetScrollLock,
  BUTTON_PADLOCK: ButtonPadlock,
};
