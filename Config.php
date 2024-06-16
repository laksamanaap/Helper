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

function get_user_info($user_id) {
    global $conn;
    $sql = "SELECT * FROM tb_users WHERE id = $user_id";

    $result = mysqli_query($conn, $sql);
 
    if ($result && mysqli_num_rows($result) > 0) {
        $user_info = mysqli_fetch_object($result);
        return $user_info;
    } else {
        return null;
    }
}

function get_produk_info($produk_id) {
    global $conn;

    if ($produk_id === NULL) {
        return NULL; 
    }

    $query = "SELECT * FROM tb_produk WHERE id = $produk_id";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die('Query Error: ' . mysqli_error($conn));
    }
    return mysqli_fetch_assoc($result);
}

function search_data(string $table, string $column_name, string $keyword) {
    global $conn;

    $sql = "SELECT * FROM $table WHERE $column_name LIKE '%$keyword%' AND is_deleted = 0";
    $query_result = mysqli_query($conn, $sql);

    $result_objects = [];
    if ($query_result && mysqli_num_rows($query_result) > 0) {
        while ($row = mysqli_fetch_object($query_result)) {
            $result_objects[] = $row;
        }
    }

    return $result_objects;
}
