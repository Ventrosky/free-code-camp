// * Palindrome Checker
// Return true if the given string is a palindrome. Otherwise, return false
// A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.
function palindrome(str) {
    var strL = str.toLowerCase().replace(/[^0-9a-z]/gi, '');
    for (i=0; i < strL.length/2; i++){
      if(strL[i]!=strL[strL.length-1-i]) return false;
    }
    return true;
}
  
palindrome("eye");

// * Roman Numeral Converter
// Convert the given number into a roman numeral.
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

// * Caesars Cipher ---- 
// Write a function which takes a ROT13 encoded string as input and returns a decoded string.
function rot13(str) { 
  var codes = [];
  var appo = 0;
  for (var i=0; i<str.length; i++){
    appo=str[i].charCodeAt();
    if((appo>64) && (appo<91)) appo = (appo-65+13) %26 + 65;
    codes.push(appo);
  }
  return String.fromCharCode.apply(String, codes);
}

rot13("SERR PBQR PNZC");

// * Telephone Number Validator
// Return true if the passed string looks like a valid US phone number.
function telephoneCheck(str) {
  let reRegex =/^(1\s*){0,1}([0-9]{3}|\([0-9]{3}\))[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/;
  return reRegex.test(str);
}

telephoneCheck("555-555-5555");

// * Cash Register
// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

const values = [
  ['ONE HUNDRED', 100.00],
  ['TWENTY', 20.00],
  ['TEN', 10.00],
  ['FIVE', 5.00],
  ['ONE', 1.00],
  ['QUARTER', 0.25],
  ['DIME', 0.10],
  ['NICKEL', 0.05],
  ['PENNY', 0.01]
];

const fixNums = x => parseFloat(x.toFixed(2));

function checkCashRegister(price, cash, cid) {
  let change = fixNums(cash - price);
  let usefulCid = cid.reduce((dicto, curr) => {
    dicto[curr[0]] = curr[1] ;
    return dicto;
  }, {});
  let totmoney  =  fixNums(Object.keys(usefulCid).reduce((sum,key)=>sum+usefulCid[key],0));

  if (change > totmoney) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (change == totmoney){
    return {status: "CLOSED", change: cid};
  }
  
  let obj = {current: 0, change: []};
  for (var i = 0; i < values.length; i++){
    let [name, value] = values[i];
    let ammount = 0.0;
    while (usefulCid[name] > 0 && ((fixNums(change - obj.current)>=value))){
      ammount += value;
      usefulCid[name] -= value;
      obj.current += value;
    }
    if (ammount > 0.0){
      obj.change.push([name, ammount]);
    }
  }
  if (change == fixNums(obj.current)) {
    return {status: "OPEN", change: obj.change};
  } 
  return {status: "INSUFFICIENT_FUNDS", change: []};
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);