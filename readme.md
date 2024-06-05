# JSON parser

## Contents
- [Owerview](#owerview)
- [Tokenization with regular expressions](#tokenization-with-regular-expressions)

## Owerview
The myJSONParse function takes a JSON-formatted string as input and returns the 
corresponding JavaScript object. This is a custom implementation of a JSON parser
in JavaScript. The function uses regular expressions to tokenize the input string
and parses these tokens to construct the final object.

## Tokenization with regular expressions

Line 5 const tokenRegExp 
Regular expression is used to identify and extract the different JSON elements 
from the input string.
This regular expression captures:
JSON delimiters ({, }, [, ], :, ,)
Boolean values (true, false)
Null value (null)
Numbers (including integers, floats, and scientific notation)
Strings (handling escape sequences)

## Parse tokens into corresponding JavaScript objects

### ParseValue
Line 16
The parseValue function determines the type of the current token and calls the appropriate parsing function.

### Object parse
Line 43
The parseObject function parses a JSON object.
It skips the opening {.
It iterates over the key-value pairs until it encounters the closing }.
For each key-value pair, it calls parseString for the key and parseValue for the value, then adds the pair to the object.
parseArray

### Array parse
Line 62
The parseArray function parses a JSON array.
It skips the opening [.
It iterates over the array elements until it encounters the closing ].
For each element, it calls parseValue and adds the result to the array.

### String parse
Line 77
The parseString function parses a JSON string.
It removes the surrounding quotes and processes escape sequences using a regular expression and a switch statement to handle different escape characters.

## Main Logic

Line 105
The myJSONParse function starts parsing by calling parseValue.
It checks if all tokens have been consumed; if not, it throws a syntax error.