<?php
session_start(); // Start session

// Check if the user is logged in
if (!isset($_SESSION['level'])) {
    // If not logged in, redirect to login.php
    header("Location: login.php");
    exit(); // Stop code execution
}
?>


<?php
// config.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_db_name";

// fungsi untuk melakukan perintah kode SQL
$conn = mysqli_connect("localhost", "root", "", "your_db_name");

function get_data(string $sql) {
  global $conn;

  $query_result = mysqli_query($conn, $sql);
  
  $data = [];

  for($i=0; $i < mysqli_num_rows($query_result); $i++) {
    $data[] = mysqli_fetch_object($query_result);
  }

  return $data;
}

function insert_data(string $table, array $data) {
  global $conn;

  $sql = "INSERT INTO $table (".implode(",", array_keys($data)).") VALUES (\"".implode("\",\"", array_values($data))."\")";
  
  $query_result = mysqli_query($conn, $sql);
  return $query_result;
}

function delete_data(string $table, string | int $id) {
  global $conn;

  $sql = "UPDATE $table SET is_deleted=1 WHERE id=$id";

  $query_result = mysqli_query($conn, $sql);
  print_r($query_result);
  return $query_result;
}

function edit_data(string $table, array $data) {
  global $conn;

  $update_sql = [];

  $data_keys = array_keys($data);
  $data_values = array_values($data);

  for($i=0; $i<count($data); $i++) {
    $update_sql[] = $data_keys[$i] . " = \"" . $data_values[$i] . "\"";
  }
  
  $sql = "UPDATE $table SET ". implode(", ", $update_sql) ." WHERE id=".$data["id"];

  $query_result = mysqli_query($conn, $sql);
  print_r($query_result);
}
