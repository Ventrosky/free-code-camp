let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex.test(myString);

let petString = "James has a pet cat.";
let petRegex = /dog|cat|bird|fish/; 
result = petRegex.test(petString);

// Ignore Case
let myString2 = "freeCodeCamp";
let fccRegex = /freeCodeCamp/i; // Change this line
result = fccRegex.test(myString2);

//Extract Matches
let extractStr = "Extract the word 'coding' from this string.";
let codingRegex = /coding/; 
result = extractStr.match(codingRegex);

//Find More Match
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /Twinkle/gi; 
result = twinkleStar.match(starRegex);

//Wildcard Period
let exampleStr = "Let's have fun with regular expressions!";
let unRegex = /.un/;
result = unRegex.test(exampleStr);

//Character classes
let quoteSample = "Beware of bugs in the above code; I have only proved it correct, not tried it.";
let vowelRegex = /[aeiou]/gi;
result = quoteSample.match(vowelRegex);

//Alphabet
quoteSample = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/gi; 
result = quoteSample.match(alphabetRegex);

//Numbers and Letters
quoteSample = "Blueberry 3.141592653s are delicious.";
myRegex = /[h-s2-6]/gi; 
result = quoteSample.match(myRegex);

//Negated character sets
quoteSample = "3 blind mice.";
myRegex = /[^aeiou0-9]/gi; 
result = quoteSample.match(myRegex); 

//One or More
let difficultSpelling = "Mississippi";
myRegex = /s+/gi;
result = difficultSpelling.match(myRegex);

//Zero or More
let chewieQuote = "Aaaaaaaaaaaaaaaarrrgh!";
let chewieRegex = /Aa*/; 
result = chewieQuote.match(chewieRegex);

//Lazy Matching
let text = "<h1>Winter is coming</h1>";
myRegex = /<.*?>/; 
result = text.match(myRegex);

//Beginning 
let rickyAndCal = "Cal and Ricky both like racing.";
let calRegex = /^Cal/;
result = calRegex.test(rickyAndCal);

//Ending 
let caboose = "The last car on a train is the caboose";
let lastRegex = /caboose$/; 
result = lastRegex.test(caboose);

//Shorthand Character classes
quoteSample = "The five boxing wizards jump quickly.";
alphabetRegexV2 = /\w/g; 
result = quoteSample.match(alphabetRegexV2).length;

//Everything But Letters and Numbers
quoteSample = "The five boxing wizards jump quickly.";
let nonAlphabetRegex = /\W/g; 
result = quoteSample.match(nonAlphabetRegex).length;

//All Numbers
let numString = "Your sandwich will be $5.00";
let numRegex = /\d/g;
result = numString.match(numRegex).length;

//Non-Numbers
numString = "Your sandwich will be $5.00";
let noNumRegex = /\D/g;
result = numString.match(noNumRegex).length;

//Restrict Possible Usernames
let username = "JackOfAllTrades";
let userCheck = /[a-z][a-z]+\d*$/i;
result = userCheck.test(username);

//Whitespace
let sample = "Whitespace is important in separating words";
let countWhiteSpace = /\s/g;
result = sample.match(countWhiteSpace);

//Non-Whitespace
sample = "Whitespace is important in separating words";
let countNonWhiteSpace = /\S/g; 
result = sample.match(countNonWhiteSpace);

//Upper and Lower Number of Matches
let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6}\sno/; 
result = ohRegex.test(ohStr);

//Lower Number of Matches
let haStr = "Hazzzzah";
let haRegex = /Haz{4,}ah/; 
result = haRegex.test(haStr);

//Exact Number of Matches
let timStr = "Timmmmber";
let timRegex = /Tim{4}ber/; 
result = timRegex.test(timStr);

//All or None
let favWord = "favorite";
let favRegex = /favou?rite/; 
result = favRegex.test(favWord);

//Positive and Negative Lookahead
let sampleWord = "astronaut";
let pwRegex = /(?=\w{6,})(?=\D*\d{2,})/;
result = pwRegex.test(sampleWord);

//Capture Groups
let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\1\s\1$/; 
result = reRegex.test(repeatNum);

//Search and Replace
let huhText = "This sandwich is good.";
let fixRegex = /good/;
let replaceText = "okey-dokey"; 
result = huhText.replace(fixRegex, replaceText);

//Remove Whitespace from Start and End
let hello = "   Hello, World!  ";
let wsRegex = /^\s+|\s+$/g; 
result = hello.replace(wsRegex,''); 