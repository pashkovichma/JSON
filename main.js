function myJSONParse(jsonString) {

  //Tokenization with regular expressions
  const tokens = [];
  const tokenRegExp = /({|}|\[|\]|:|,|true|false|null|\-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|"([^"\\]*(?:\\.[^"\\]*)*)")/g;
  let match;

  //find and extract all JSON elements from jsonString for further parsing
  while ((match = tokenRegExp.exec(jsonString)) !== null) {
    tokens.push(match[0]);
  }

  let currentIndex = 0;

  //Parse tokens into corresponding JavaScript objects
  function parseValue() {
    const token = tokens[currentIndex];
    //find type and call necessary function
    if (token === '{') {
      return parseObject();
    } else if (token === '[') {
      return parseArray();
    } else if (token === 'true') {
      currentIndex++;
      return true;
    } else if (token === 'false') {
      currentIndex++;
      return false;
    } else if (token === 'null') {
      currentIndex++;
      return null;
    } else if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(token)) {
      currentIndex++;
      return parseFloat(token);
    } else if (token.startsWith('"')) {
      return parseString();
    } else {
      throw new SyntaxError('Unexpected token: ' + token);
    }
  }

  // Object parse
  function parseObject() {
    const obj = {};
    currentIndex++; // skip '{'
      
    while (tokens[currentIndex] !== '}') {
      if (tokens[currentIndex] === ',') {
        currentIndex++; // skip ','
      }
      const key = parseString();
      currentIndex++; // skip ':'
      const value = parseValue();
      obj[key] = value;
    }

    currentIndex++; // skip '}'
    return obj;
  }

  // Array parse
  function parseArray() {
    const arr = [];
    currentIndex++; // skip '['
    
    while (tokens[currentIndex] !== ']') {
      if (tokens[currentIndex] === ',') {
        currentIndex++; // skip ','
      }
      arr.push(parseValue());
    }
    currentIndex++; // skip ']'
    return arr;
  }

  // String parse
  function parseString() {
    const stringToken = tokens[currentIndex];
    //cut quotes and handle escape sequences
    const unquotedString = stringToken.slice(1, -1).replace(/\\(.)/g, (match, p1) => {
      switch (p1) {
        case '"':
        case '\\':
        case '/':
            return p1;
        case 'b':
            return '\b';
        case 'f':
            return '\f';
        case 'n':
            return '\n';
        case 'r':
            return '\r';
        case 't':
            return '\t';
        default:
          throw new SyntaxError('Invalid escape sequence: \\' + p1);
      }
    });
    currentIndex++;
    return unquotedString;
  }

  //parsing 
  const result = parseValue();

  //check after parsing
  if (currentIndex !== tokens.length) {
    throw new SyntaxError('Unexpected token at end of input');
  }

  return result;
}

const jsonString = '{"name": "John", "age": 30, "boolean": true, "array": [[1, 2], {"three": 3}, "four"], "nested": {"array": [true, false, null]}}';

console.log(myJSONParse(jsonString));