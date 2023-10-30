
<?php
// sendfile.php
// Check if the 'uploads' directory exists; if not, create it.
$storageDir = 'uploads';
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0755, true);
}

// Handle file upload
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $targetDir = $storageDir . '/';
    $targetFile = $targetDir . basename($_FILES['file']['name']);

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        echo 'File uploaded successfully.';
    } else {
        echo 'Error uploading file.';
    }
} else {
    echo 'Invalid request.';
}
?>



<?php
// sendfile.php
// Check if the 'uploads' directory exists; if not, create it.
$storageDir = 'uploads';
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0755, true);
}

// Handle file uploads
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['files'])) {
        $files = $_FILES['files'];
        $fileCount = count($files['name']);

        for ($i = 0; $i < $fileCount; $i++) {
            $targetDir = $storageDir . '/';
            $targetFile = $targetDir . basename($files['name'][$i]);

            if (move_uploaded_file($files['tmp_name'][$i], $targetFile)) {
                echo 'File ' . $files['name'][$i] . ' uploaded successfully.<br>';
            } else {
                echo 'Error uploading file ' . $files['name'][$i] . '.<br>';
            }
        }
    } else {
        echo 'No files were uploaded.';
    }
} else {
    echo 'Invalid request.';
}
?>
