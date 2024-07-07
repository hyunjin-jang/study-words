export interface tWordList {
  kanji: string;
  onYomi: string[];
  kunYomi: string[];
  meanings: string[]
}

export interface tWordsContext {
  body: tWordList[];
  meta: {
    pageNo: number;
    pageSize: number;
    took: number;
  };
}