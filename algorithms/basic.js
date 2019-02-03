// ----  Reverse a String ---- 
function reverseString(str) {
  return str.split('').reverse().join('');
}

reverseString("hello");

// ----  Factorialize a Number ---- 
function factorialize(num) {
  var fact = 1;
  while(num >= 1){
    fact*=num;
    num--;
  }
  return fact;
}

factorialize(5);

// ----  Check for Palindromes ---- 
function palindrome(str) {
  var strL = str.toLowerCase().replace(/[^0-9a-z]/gi, '');
  for (i=0; i < strL.length/2; i++){
    if(strL[i]!=strL[strL.length-1-i]) return false;
  }
  return true;
}

palindrome("eye");

// ----  Find the Longest Word in a String ---- 
function getMaxLen(a, b) {
    return ( a.length > b.length ? a : b);
}
function findLongestWord(str) {
  var words = str.split(' ');
  var big= words.reduce(getMaxLen,words[0]);
  return big.length;
}

findLongestWord("The quick brown fox jumped over the lazy dog");

// ----  Title Case a Sentence ---- 
function titleCase(str) {
  var words = str.toLowerCase().split(' ');
  for (i = 0; i < words.length; i++){
    words[i]=(words[i].charAt(0).toUpperCase() + words[i].substring(1));
  }
  return words.join(' ');
}

titleCase("I'm a little tea pot");

// ----  Slice and Splice ----  
function frankenSplice(arr1, arr2, n) {
  let appo = arr2.slice()
  appo.splice(n,0,...arr1)
  return appo
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);

// ----  Return Largest Numbers in Arrays ---- 
function bigNum(x,y){
  return (x>y?x:y);
}
function bigArray(arr){
  return arr.reduce(bigNum,arr[0]);
}
function largestOfFour(arr) {
  return arr.map(bigArray);
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

// ----  Confirm the Ending ---- 
function confirmEnding(str, target) {
  return str.substr(-target.length) === target;
}

confirmEnding("Bastian", "n");

// ----  Repeat a string repeat a string ---- 
function repeatStringNumTimes(str, num) {
  if (num < 0) return "";
  return str.repeat(num);
}

repeatStringNumTimes("abc", 3);

// ----  Truncate a string ---- 
function truncateString(str, num) {
  if (str.length <= num) return str;
  if(num<=3) return str.slice(0,num)+"...";
  return str.slice(0,num-3)+"...";
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);

// ----  Chunky Monkey ---- 
function chunkArrayInGroups(arr, size) {
  var newArr = [];
  var index = 0;
  while (index < arr.length) {
    newArr.push(arr.slice(index, index+size));
    index += size;
  }
  return newArr;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);

// ----  Slasher Flick ---- 
function slasher(arr, howMany) {
  return arr.slice(howMany);
}

slasher([1, 2, 3], 2);

// ----  Mutations ---- 
function mutation(arr) {
  var w1 = arr[0].toLowerCase();
  var w2 = arr[1].toLowerCase();
  for (var i = 0; i < w2.length; i++) {
    if (w1.indexOf(w2.charAt(i)) == -1) return false;  
  }
  return true;
}

mutation(["hello", "hey"]);

// ----  Falsy Bouncer ---- 
function bouncer(arr) {
  return arr.filter(function(a){
    return a;
  });
}

bouncer([7, "ate", "", false, 9]);

// ----  Seek and Destroy ---- 
function destroyer(arr) {
  var args = Array.from(arguments).slice(1);
  return arr.filter(function(val) {
    return !args.includes(val);
  });
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);

// ----  Where do I belong ---- 
function getIndexToIns(arr, num) {
  arr.push(num);
  arr.sort(function(a, b){return a-b;});
  return arr.indexOf(num);
}

getIndexToIns([40, 60], 50);

// ----  Caesars Cipher ---- 
function rot13(str) { 
  var codes = [];
  var appo = 0;
  for (i=0; i<str.length; i++){
    appo=str[i].charCodeAt();
    if((appo>64) && (appo<91)) appo = (appo-65+13) %26 + 65;
    codes.push(appo);
  }
  return String.fromCharCode.apply(String, codes);
}

rot13("SERR PBQR PNZC");

