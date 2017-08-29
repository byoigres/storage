<?php
if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
    return false;
} else {
    $_GET['_url'] = $_SERVER["REQUEST_URI"];
    include __DIR__ . '/index.php';
}