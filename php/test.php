<?php
if(!@mysql_connect('localhost', 'root', ''))
{
    echo "mysql not connected ".mysql_error();
    exit;

}
echo 'great work';
?>