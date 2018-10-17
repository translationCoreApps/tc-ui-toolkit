
export const isWord = word => {
  return (typeof word !== 'string') && (word.word || (word.type === 'word'));
};

export const isNestedMilestone = word => {
  let deepNestedChild = false;
  if (word[0] && word[0][0]) deepNestedChild = isDeepNestedChild(word);
  return Array.isArray(word) && word.length > 0 && word[0].type === 'word' || deepNestedChild;
};

export const isDeepNestedChild = words => {
  let deepNestedChild = false;

  for (let i = 0, len = words.length; i < len; i++) {
    const wordItem = words[i];

    if (wordItem.type === 'word') {
      deepNestedChild = true;
      return deepNestedChild;
    } else {
      deepNestedChild = isDeepNestedChild(wordItem);
    }
  }

  return deepNestedChild;
};

export function punctuationWordSpacing(word) {
  const lastChar = word.text.substr(word.text.length - 1);
  return ((lastChar === '"') || (lastChar === "'") || (lastChar === "-")) ? '' : ' ';
}

export function textIsEmptyInVerseObject(verseText) {
  const emptyVerse = !verseText.verseObjects.some((word) => {
    const condition1 = (word.type === "word" || word.type === "text") && word.text.length > 0;
    const condition2 = (word.text !== '↵↵' && word.text !== '↵' && word.text !== '↵↵↵') && (word.text !== '\n\n' && word.text !== '\n' && word.text !== '\n\n\n'); // exclude empty verses that inlcude the return character.
    const condition3 = word.type === "milestone" || condition1;

    return condition3 && condition2;
  });

  return typeof verseText === 'object' && emptyVerse;
}
