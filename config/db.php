<?php
  /**
   * На сервере с АТС стоит версия mysql 5.0
   */

  $link = new mysqli("localhost", "cdr_user", "password", "asteriskcdrdb");
  
  if ($link->connect_error) {
    die("Ошибка: не удается подключиться: " . $link->connect_error);
  } 
  $link->set_charset('utf-8');
?>