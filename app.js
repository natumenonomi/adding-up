'use strict';//strict(厳格モード）
/*ファイルを1行ずつ読み込む*/

//fs（File System）モジュールを組み込んで使えるようにする
const fs =require('fs');
//readline モジュールを読み込んで使えるようにする。
const readline =require('readline');
//popu-pref.csvをファイルとして読み込める状態に準備する
const rs =fs.createReadStream('./popu-pref.csv');
//readlineモジュールにrsを設定する
const rl = readline.createInterface({ input: rs, output: {}});
//popu-pref.csv のデータを1行ずつ読み込んで、設定した関数を実行する。

const prefectureDataMap = new Map();
//key:都道府県　value: 集計データのオブジェクト

rl.on('line',lineString => {
  const columns =lineString.split(',');
  //lineは1行の関数。　colums=列   引数lineString（自分で決めた)
  //["2010","北海道","12345"...]みたいな配列にする
  const year = parseInt(columns[0]);
  //文字列を整数値に変換するparseInt使用 　年
  const prefecture =columns[1];
  //都道府県名
  const popu =parseInt(columns[3]);
  //15～19歳の人口　perseInt使用


  if (year === 2010 || year ===2015){
    //都道府県ごとのデータを作る。データがなかったらデータを初期化。

    let value =prefectureDataMap.get(prefecture);
    /*ここをlet def ={popu10: 0,popu15: 0,change:null};にしてもいい。*/
    //データがとれていない場合は空のデータを入れる　初期化しないとundefindになる
     if(!value){
       value ={
         popu10: 0,
         popu15: 0,
         change:null
       };
     }
     if(year ===2010){
       value.popu10 =popu;
       //2010年のデータ
     }
     if(year ===2015){
       /*else ifにしても良い*/
       value.popu15 =popu;
       // 2015年のデータ 
     }
     prefectureDataMap.set(prefecture,value);
     //47都道府県のデータが蓄積される
  }
});

//終了した時の処理
rl.on('close',() => {
  //全データを比較して変化率を計算
  //rlはreadlineモジュールの略
  for(let[key,value]of prefectureDataMap){
    /*for-of構文。MAPやArrayの中身をoｆの前に与えられた変数に代入して
    forループと同じことをできる。key= prefecture　value=date　連想配列をぐるぐる～♪
    の時はこれつかう。*/
    value.change =value.popu15 /value.popu10;
  }

  //並べ替えを行う　（難しい）
  //ソート関数　pair1はpopu15 　pair2は popu10？
  const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
  //引き算の結果、マイナスなら降順？、プラスなら昇順？反対かも？に入れ替え
    return pair2[1].change - pair1[1].change;
  });
  const rankingStrings = rankingArray.map(([key, value]) => {
    return (
      key +': ' +value.popu10 +'=>' +value.popu15 +' 変化率:' + value.change
    );
  });
  console.log(rankingStrings);
});