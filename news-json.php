<?php
header("Content-Type: application/json; charset=utf-8");

$is_file_ready = false;
$json_data = '[]';
$file_path = __DIR__.'/news.json';
$data = json_decode(file_get_contents('php://input'), true);

include_once('news-config.php');

// POSTデータがあれば情報を上書きする
if ($data) {

  // データを配列に格納していく
  $json_data = $data['data'];

} else {

  // POSTデータがない場合、ファイルが存在するか判別する
  if (file_exists($file_path)) {

    // jsonファイルを表示する
    if ($json = file_get_contents($file_path)) {
      $is_file_ready = true;
      echo $json;
    }
  }
}
  
// jsonファイルを表示していない場合は、json表示し、ファイルを作成する
if (!$is_file_ready) {
  echo json_encode($json_data);
  
  // 編集できるか判別する
  if (can_edit()) {
    file_put_contents($file_path, json_encode($json_data));
  }
}
  