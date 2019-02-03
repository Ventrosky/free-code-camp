// ----- Sum All Numbers in a Range -----
function sumAll(arr) {
  var range = [];
  var i = Math.min(arr[0], arr[1]);
  var j = Math.max(arr[0], arr[1]);
  while(i <= j){
    range.push(i);
    i++;
  }
  return range.reduce(function(a, b) {return a + b;}, 0);
}

sumAll([1, 4]);

// ----- Diff Two Arrays -----
function diffArray(arr1, arr2) {
  var newArr = arr1.concat(arr2).filter(item => !arr1.includes(item) || !arr2.includes(item));
  return newArr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

// ----- Roman Numeral Converter -----
function convertToRoman(num) {
  var table = {"I":1, "IV":4, "V":5, "IX":9, "X":10, "XL":40, "L":50, "XC":90, "C":100, "CD":400, "D":500, "CM":900, "M":1000};
  var roman = "";
  var next = "";
  while(num>0){
    next = findRoman(num, table);
    num -= table[next];
    roman+=next;
  }
  return roman;
}
function findRoman(num, table){
  var max = "I";
  for (var key in table){
    if ((num>=table[key])&&(table[key]>table[max])){
      max = key;
    }
  }
  return max;
}

convertToRoman(36);

// ----- Wherefore art thou -----
function whatIsInAName(collection, source) {
  var arr = [];
  var keys = Object.keys(source);
  var goodPick = true;
  for (var i in collection){
    for (var j in keys){
      if (!(collection[i].hasOwnProperty(keys[j]) && (collection[i][keys[j]] == source[keys[j]] ))){
        goodPick = false;
      }
    }
    if (goodPick) {
      arr.push(collection[i]);
    } else {
      goodPick = true;  
    }
  }
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

// ----- Search and Replace -----
function myReplace(str, before, after) {
  var i = str.indexOf(before);
  if (str[i] === str[i].toUpperCase()) {
    after = after.charAt(0).toUpperCase() + after.slice(1);
  }
  return str.replace(before, after);
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

// ----- Pig Latin -----
function translatePigLatin(str) {
  return str
    .replace(/^([aeiouy])(.*)/, '$1$2way')
    .replace(/^([^aeiouy]+)(.*)/, '$2$1ay');
}

translatePigLatin("onsonant");

// ----- DNA Pairing ----- 
function pairElement(str) {
  var pairing = { "T": ["T", "A"], "A": ["A", "T"], "C": ["C", "G"], "G": ["G", "C"]};
  return str.split('').map(function(k){return pairing[k];});
}

pairElement("GCG");

// ----- Missing letters -----
function fearNotLetter(str) {
  var code = str.charCodeAt(0);
  for (i=0; i<str.length;i++){
    if (str.charCodeAt(i)!=code) {
      return String.fromCharCode(code);
    }
    code++;
  }
  return;
}

fearNotLetter("abce");

// ----- Boo who -----
function booWho(bool) {
  return typeof bool === 'boolean';
}

booWho(null);

// ----- Sorted Union -----
function uniteUnique(arr) {
  var flatArgs = [].concat.apply([], Array.from(arguments));
  var uniques = Array.from(new Set(flatArgs));
  return uniques;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);

// ----- Convert HTML Entities -----
function convertHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,"&apos;");
}

convertHTML("Dolce & Gabbana");

// ----- Spinal Tap Case -----
function spinalCase(str) {
  var re = /\s|_|(?=[A-Z])/;
  return str.split(re).join('-').toLowerCase();
}

spinalCase('This Is Spinal Tap');

// ----- Sum All Odd Fibonacci Numbers -----
function sumFibs(num) {
  var fiboA = 1;
  var fiboB = 1;
  var fiboC = fiboA + fiboB;
  var summ = fiboC;
  for ( ;fiboC <=num;) {
    if (fiboC%2 !== 0) summ+=fiboC;
    fiboC = fiboA + fiboB;
    fiboA = fiboB;
    fiboB = fiboC;
  }
  return summ;
}

sumFibs(4);

// ----- Sum All Primes -----
function testPrime(num){
  if (num ==1) return false;
  for(var i=2; i <= num; i++){
    if((num % i == 0) && (num!= i)) return false;
  }
  return true;
}
function sumPrimes(num) {
  if (num < 2) return 0;
  var summ = 0;
  for (var i = 0; i <= num; i++) {
    if (testPrime(i) == true) {
      summ += i;
    }
  }
  return summ;
}

sumPrimes(10);

// ----- Smallest Common Multiple -----
function greatestCD(a, b){
  if (a == 0 || b == 0)
    return 0;
  if (a == b)
    return a;
  if (a > b)
    return greatestCD(a-b, b);
  return greatestCD(a, b-a);
}

function smallestCommons(arr) {
  var max = Math.max.apply(null, arr);
  var min = Math.min.apply(null, arr);
  var range=[];
  for (var i = min; i <= max; i++) { range.push(i); }
  return range.reduce(function (a, b) {
    return (a*b)/greatestCD(a, b);
  });
}

smallestCommons([1,5]);

// ----- Finders Keepers -----
function findElement(arr, func) {
  return arr.filter(func)[0]; 
}

findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; });

// ----- Drop it -----
function dropElements(arr, func) {
  while(arr.length > 0 && !func(arr[0])) {
    arr.shift();
  }
  return arr;
}

dropElements([1, 2, 3], function(n) {return n < 3; });

// ----- Steamroller -----
function steamrollArray(arr) {
  return arr.reduce(function(a, b) {
    if (Array.isArray(b)) {
      return a.concat(steamrollArray(b));
    }
    return a.concat(b);
  }, []);
}

steamrollArray([1, [2], [3, [[4]]]]);

// ----- Binary Agents -----
function binaryAgent(str) {
  return str.split(' ').map(function(x) {
    return String.fromCharCode(parseInt(x, 2)); 
  }).join('');
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");

// ----- Everything Be True -----
function truthCheck(collection, pre) {
  return collection.every(function (x) {
    return x[pre];
  });
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");

// ----- Arguments Optional -----
function addTogether() {
  var args = Array.from(arguments);
  if(args.filter(function(n){return typeof n == "number";}).length != args.length) return undefined;
  if(args.length>1) return args.reduce(function(a, b) {return a + b;}, 0);
  return function(n) {
    if (typeof n === "number")
    return args[0] + n;
  };
}

addTogether(2,3);
