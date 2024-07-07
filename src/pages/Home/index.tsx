import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { pageState } from "../../models/Home/atoms";

const Home = () => {
  const [wordLists, setWordLists] = useState<number[]>([]);

  const [page, setPage] = useRecoilState(pageState)
  const navigate = useNavigate()

  const handleMove = (index: number) => {
    setPage(index)
    navigate(`learning`)
  }

  useEffect(() => {
    (async () => {
      setWordLists([50, 50, 50, 50, 50, 50, 50])
    })()
  }, [])

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack spacing={4} sx={{ alignItems: 'center', p: '5rem', }}>
        <Typography variant="h3">일본어 한자</Typography>
        <Stack spacing={2} sx={{
          borderRadius: '8px',
          overflow: 'auto',
          height: '70vh',
          boxShadow: 5,
          p: '1rem'
        }}>
          {wordLists.map((wordList, index) => {
            return (
              <Stack
                key={String(index)}
                onClick={()=>handleMove(index)}
                sx={{
                  bgcolor: 'lightgrey',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  width: '80vw',
                  p: '1rem',
                }}>
                <Typography sx={{ textAlign: 'center' }}>
                  {`${wordList * index + 1} ~ ${wordList * (index + 1)}`}
                </Typography>
                <Typography sx={{ textAlign: 'center', color: 'darkblue' }}>
                  공부시작하기
                </Typography>
              </Stack>
            )
          })}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Home;