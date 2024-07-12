import { useState } from "react";

export const getSpeech = (
  voices: SpeechSynthesisVoice[],
  text: string,
  lang: string,
  onEndCallback?: () => void
) => {
  const speech = (txt: string | undefined) => {
    const utterThis = new SpeechSynthesisUtterance(txt);

    utterThis.lang = lang;

    const kr_voice = voices.find(
      (elem) => elem.name === '유나'
    );
    const jp_voice = voices.find(
      (elem) => elem.name === 'Google 日本語'
    );
    const en_voice = voices.find(
      (elem) => elem.name === 'Google US English'
    );

    switch (lang) {
      case 'kr':
        if (kr_voice)
          utterThis.voice = kr_voice;
        utterThis.lang = "ko-KR"
        break;
      case 'jp':
        if (jp_voice)
          utterThis.voice = jp_voice;
        utterThis.lang = "ja-JP"
        break;
      case 'en':
        if (en_voice)
          utterThis.voice = en_voice;
        utterThis.lang = "en-US"
        break;
    }

    // 음성 재생 완료 시 호출되는 콜백 함수
    utterThis.onend = () => {
      if (onEndCallback) {
        onEndCallback();
      }
    };

    //utterance를 재생(speak)한다.
    window.speechSynthesis.speak(utterThis);
  };

  speech(text);
};