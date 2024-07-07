export const getSpeech = (
  text: string, 
  lang: string, 
  onEndCallback?: () => void
) => {
  const speech = (txt: string | undefined) => {
    // const lang = "ko-KR";
    // const lang = "ja-JP";
    // const lang = "en-US";
    window.speechSynthesis.cancel()

    const utterThis = new SpeechSynthesisUtterance(txt);

    utterThis.lang = lang;

    const voices = window.speechSynthesis.getVoices();
    if (lang === 'ja-JP') {
      voices.filter((e) =>{if(e.lang === 'ja-JP' && e.name === 'Google 日本語') utterThis.voice = e;})
    } else if(lang === 'en-US'){
      voices.filter((e) =>{if(e.lang === 'en-US' && e.name === 'Google US English') utterThis.voice = e;})
    }
    else {
      return;
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