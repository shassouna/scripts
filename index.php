<?php
  function urlValid($url){

    $array = get_headers($url);
    $string = $array[0];
    if(strpos($string,"200")) {
        $exist = 'true';
    } else {
        $exist = 'false';
    }
    
    return $exist;
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
