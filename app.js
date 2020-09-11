'use strict';//strict(厳格モード）
/*ファイルを1行ずつ読み込む*/

/*Node.jsからモジュール呼び出し*/
const fs =require('fs');//fs=FileSystem　の宣言
const readline =require('readline');//ファイルを1行ずつ読み込むモジュール　の宣言

const rs =fs.createReadStream('./popu-pref.csv');//popu-pref.csvファイルからファイル読み込みを行うStream生成
const rl = readline.createInterface({ input: rs, output: {}});
//readlineオブジェクトのinputとして設定しrlオブジェクトを作成

rl.on('line',lineString => {
  const columns =lineString.split(',');
  //引数lineStringから与えられた文字列を,で分割して、それをcolumnsという名前の配列にしている
  const year = parseInt(columns[0]);
  //集計年を変数に保存　文字列を整数値に変換するparseInt使用
  const prefecture =columns[1];
  //都道府県名を変数に保存
  const popu =parseInt(columns[3]);
  //15～19歳の人口を変数に保存　文字列を整数値にするperseInt使用
  if (year === 2010 || year ===2015){
    console.log(year);
    console.log(prefecture);
    console.log(popu);
  }
});
