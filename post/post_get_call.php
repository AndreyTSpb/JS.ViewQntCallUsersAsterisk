<?php

if(isset($_POST['get']) AND !empty($_POST['dt'])){

    $dt = date("Y-m-d", $_POST['dt']);
    $dt_end =  date("Y-m-d", $_POST['dt'] + 60*60*24);

    require_once "../config/db.php";

    global $link;

    $time_str = time();
    $arr_num = array();

    $result = $link->query("SELECT count(uniqueid) as kol, src  FROM cdr 
                                WHERE src > 599 
                                    AND src < 699
                                    AND calldate > '".$dt."'
                                    AND calldate < '".$dt_end."'
                                    AND dst > 1000000
                                GROUP BY src     
                                ORDER BY calldate DESC;");

    while ($m = $result->fetch_assoc()) {
        $arr_num[$m['src']]['all'] = $m['kol']; 
    }
    $result1 = $link->query("SELECT count(uniqueid) as kol, src  FROM cdr 
    WHERE src > 599 
        AND src < 699
        AND calldate > '".$dt."'
        AND calldate < '".$dt_end."'
        AND dst > 1000000
        AND disposition = 'ANSWERED'
    GROUP BY src     
    ORDER BY calldate DESC;");
    while ($m1 = $result1->fetch_assoc()) {
        $arr_num[$m1['src']]['ANS'] = $m1['kol'];
    }

    echo json_encode(array('dt'=> $dt,'data' => $arr_num));
    exit;
}
echo json_encode(array("error"=>100, "get"=>$_POST['get'], "dt"=>$_POST['dt']));
exit;


 /**
  * Array(
  * [calldate] => 2020-01-21 16:23:23 // время
  *  [clid] => "619" <619> // от кого
  *  [src] => 619 // источник (от кого)
  *  [dst] => 989313004019 // куда
  *  [dcontext] => from-internal 
  *  [channel] => SIP/619-00012f73
  *  [dstchannel] => SIP/comf_out-00012f74
  *  [lastapp] => Dial
  *  [lastdata] => SIP/comf_out/89313004019,300,M(setmusic^none)
  *  [duration] => 1
  *  [billsec] => 0
  *  [disposition] => NO ANSWER // статус
  *  [amaflags] => 3
  *  [accountcode] => 
  *  [uniqueid] => 1579613003.87879
  *  [userfield] => 
  *  [recordingfile] => 
  *  [cnum] => 619
  *  [cnam] => 619
  *  [outbound_cnum] => 619
  *  [outbound_cnam] => 619
  *  [dst_cnam] => 
  *  [did] => 
  *)
  */