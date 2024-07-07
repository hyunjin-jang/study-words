import axios, { AxiosResponse } from "axios"
import { tWordsContext } from "./types"

export const getWordContents = async (page: number): Promise<tWordsContext> => {
  try {
    const response: AxiosResponse<tWordsContext> = await axios.get(
      `http://localhost:8080/v1/jp/kanji/load?pageNo=${page}&pageSize=50`
    );
    return response.data;
  } catch (e) {
    console.log('Error fetching words: ', e);
    throw e;
  }
}