<?php
function generateFarmerId() {
    $timestamp = time();
    $rand = rand(100, 999);
    return "FMR-" . substr($timestamp, -6) . "-" . $rand;
}
?>
