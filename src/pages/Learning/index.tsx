import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { getSpeech } from "../../components/utils/tts/utils";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { tWordList } from "../../models/Learning/types";
import { getWordContents } from "../../models/Learning/repositories";
import { useRecoilState } from "recoil";
import { pageState } from "../../models/Home/atoms";
import loading from "../../components/images/loading.gif"

const Learning = () => {
  const [page] = useRecoilState(pageState)

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [words, setWords] = useState<tWordList[] | null>(null)
  const [pageSize, setPageSize] = useState(0)
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const navigate = useNavigate()

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // 공부시작하기 클릭으로 페이지 이동했을 때 일치하는 페이지의 단어 가져오기
  useEffect(() => {
    (async () => {
      try {
        const result = await getWordContents(page)
        setWords(result.body)
        setPageSize(result.meta.pageSize)
      } catch (e) {
        console.log('Error : ', e)
      }
    })()
  }, [page])

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoices(voices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [words, index]);

  useEffect(() => {
    (async () => {
      if (voices.length > 0 && words) {
        for(let i=0; words[index].kunYomi.length > i; i++){
          let kunYomiWithoutDot = words[index].kunYomi.map(item => item.replace(/\./g, ''));
          await getSpeech(voices, kunYomiWithoutDot[i], 'jp')
        }
        for(let i=0; words[index].onYomi.length > i; i++){
          await getSpeech(voices, words[index].onYomi[i], 'jp')
        }
        for(let i=0; words[index].meanings.length > i; i++){
          console.log('i',i)
          console.log(words[index].meanings.length)
          if(words[index].meanings.length === i+1){
            await getSpeech(voices, words[index].meanings[i], 'en', handleNextWord)
            return
          }
          await getSpeech(voices, words[index].meanings[i], 'en')
        }
      }
      return () => {
        window.speechSynthesis.cancel(); // 현재 음성 합성 작업 취소
      };
    })()
  }, [voices])

  // 스피치 일시정지
  const pauseSpeech = () => {
    if (!isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true)
    }
  };

  // 스피치 재생
  const resumeSpeech = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false)
    }
  };

  // 메인 페이지로 이동
  const handleBack = async () => {
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel()
    setIsPaused(false)
    navigate(`/`)
  }

  // 다음 워드 출력
  const handleNextWord = () => {
    window.speechSynthesis.cancel();
    if (index < pageSize - 1) {
      setIsPaused(false)
      setIndex(pre => pre + 1)
    }
  }

  // 이전 워드 출력
  const handlePreWord = () => {
    window.speechSynthesis.cancel()
    if (index > 0) {
      setIsPaused(false)
      setIndex(pre => pre - 1)
    }
  }

  return (
    words ?
      <Stack direction='row' spacing={3}>
        <Stack flex={1} sx={{ height: '100vh', justifyContent: 'center', bgcolor: 'lightgrey' }}>
          <IconButton onClick={handleBack} sx={{ position: 'absolute', top: '1rem', left: '1rem' }}>
            <ArrowBackIosNewIcon sx={{ fontSize: '50px' }} />
          </IconButton>
          <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '600px' }}>
            {words[index].kanji}
          </Typography>
        </Stack>
        <Stack flex={0.7} spacing={1} sx={{ width: '100%' }}>
          <Stack flex={1} direction='row' spacing={5} sx={{
            borderBottom: '1px solid grey',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {words[index].kunYomi.map((kunYomi, index) => {
              return (
                <Typography key={kunYomi} sx={{ textAlign: 'center', fontSize: '60px' }}>
                  {kunYomi}
                </Typography>
              )
            })}
          </Stack>
          <Stack flex={1} direction='row' spacing={5} sx={{
            borderBottom: '1px solid grey',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {words[index].onYomi.map((onYomi) => {
              return (
                <Typography key={onYomi} sx={{ textAlign: 'center', fontSize: '60px' }}>
                  {onYomi}
                </Typography>
              )
            })}
          </Stack>
          <Stack flex={1} direction='row' spacing={5} sx={{
            borderBottom: '1px solid grey',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {words[index].meanings.map((meaning) => {
              return (
                <Typography key={meaning} sx={{ textAlign: 'center', fontSize: '60px' }}>{meaning}</Typography>
              )
            })}
          </Stack>
          <Stack direction='row' spacing={3} flex={0.3} sx={{ justifyContent: 'space-evenly' }}>
            <Button onClick={handlePreWord}>이전</Button>
            {
              isPaused ?
                <Button onClick={resumeSpeech}>재생</Button> :
                <Button onClick={pauseSpeech}>일시정지</Button>
            }
            <Button onClick={handleNextWord}>다음</Button>
          </Stack>
        </Stack>
      </Stack>
      :
      <Stack sx={{ height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton onClick={handleBack} sx={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <ArrowBackIosNewIcon sx={{ fontSize: '50px' }} />
        </IconButton>
        <img src={loading} alt="" style={{ height: '30%', width: '20%' }} />
      </Stack>
  )
}

export default Learning;