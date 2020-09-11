'use strict';//strict(厳格モード）

/*Node.jsからモジュール呼び出し*/
const fs =require('fs');//fs=FileSystem　の宣言
const readline =require('readline');//ファイルを1行ずつ読み込むモジュール　の宣言

const rs =fs.createReadStream('./popu-pref.csv');//popu-pref.csvファイルからファイル読み込みを行うStream生成
const rl = readline.createInterface({ input: rs, output: {}});
//readlineオブジェクトのinputとして設定しrlオブジェクトを作成

rl.on('line',lineString => {
  console.log(lineString);
});
//rlオブジェクトでlineというイベントが発生したら　無名関数を呼ぶ。lineイベントが発生しら、コンソールに引数line Stringの内容（読み込んだ1行）が出力される。
