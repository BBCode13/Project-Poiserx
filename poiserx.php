<?php

$input = $_POST['access-code'] ?? '';

if($input === 'areyouready') {
    echo htmlspecialchars('Access granted');
} else {
    echo htmlspecialchars('Access denied');
}

?>