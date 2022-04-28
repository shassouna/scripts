<?php
  function urlValid($file){
    $file_headers = @get_headers($file);
    if(!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found') {
        $exists = "false";
    }
    else {
        $exists = "true";
    }
    return $exists;
  }


  $open = fopen("./files/EXPOSANT.csv", "r");
  $fp = fopen('./results/urls_existence_php.csv', 'w');
  $data = fgetcsv($open, 1000, ",");
  
  while (($data = fgetcsv($open, 1000, ",")) !== FALSE) 
  {
    if(!empty($data[1])) {
        //echo($data[1]);
        $data[2] = urlValid($data[1]);
    }else {
        $data[2] = "false";       
    } 
    foreach (array($data) as $fields) {
        fputcsv($fp, $fields);
    }
  }
  
  fclose($open);
  fclose($fp);

?>
