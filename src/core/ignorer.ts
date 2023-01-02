export function map(
  str: string
): {
  word: string;
  db_map: { [key: string]: string };
  sb_map: { [key: string]: string };
} {
  // encode urls if exists in the str
  str = urlEncoder(str);

  let { map: db_map, word: initial_ignored_word } = mapByDoubleBracket(str);
  let { map: sb_map, word: ignored_word } = mapBySingleBracket(
    initial_ignored_word
  );

  return {
    word: ignored_word,
    db_map: db_map,
    sb_map: sb_map,
  };
}

export function unMap(str: string, db_map: object, sb_map: object): string {
  let word = unmapBySingleBracket(str, sb_map);
  word = unmapByDoubleBracket(word, db_map);

  // decode urls if exists in the str
  word = urlDecoder(word);

  return word;
}

function mapBySingleBracket(
  str: string
): { word: string; map: { [key: string]: string } } {
  return mapIgnoredValues(str, '{', '}', '{', '}');
}

function unmapBySingleBracket(str: string, map: object): string {
  return unmapIgnoredValues(str, map, '{', '}', '{', '}');
}

function mapByDoubleBracket(
  str: string
): { word: string; map: { [key: string]: string } } {
  return mapIgnoredValues(str, '{{', '}}', '{', '}');
}

function unmapByDoubleBracket(str: string, map: object): string {
  return unmapIgnoredValues(str, map, '{{', '}}', '{', '}');
}

function mapIgnoredValues(
  str: string,
  start: string,
  end: string,
  replaced_start: string,
  replaced_end: string
): { word: string; map: { [key: string]: string } } {
  let counter = 0;
  let map: { [key: string]: string } = {};

  let regex = new RegExp(`${start}(.*?)${end}`, 'g');

  let new_str = str.replace(regex, function(word) {
    word = word.substring(start.length, word.length - end.length);

    // const key = "*".repeat(counter)
    const key = counter;

    map[`${key}`] = word;

    let locked_ignored = replaced_start + key + replaced_end;

    counter++;
    return locked_ignored;
  });

  return { word: new_str, map: map };
}

function unmapIgnoredValues(
  str: string,
  map: object,
  start: string,
  end: string,
  replaced_start: string,
  replaced_end: string
): string {
  for (const [key, value] of Object.entries(map)) {
    let for_replace = replaced_start + key + replaced_end;

    str = str.replace(for_replace, start + value + end);
  }

  return str;
}

// URL detector & encode AND decoder
function urlEncoder(text: string): string {
  // url finder regex => url
  const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!;:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!;:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!;:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  let new_text = text.replace(regex, function(url) {
    url = `{` + url + `}`;
    return url;
  });

  return new_text;
}

function urlDecoder(text: string): string {
  // url finder regex => {url}
  const regex = /{(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!;:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!;:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!;:,.]*\)|[A-Z0-9+&@#\/%=~_|$])}/gim;

  let new_text = text.replace(regex, function(url) {
    url = url.substring(1, url.length - 1);
    return url;
  });

  return new_text;
}
