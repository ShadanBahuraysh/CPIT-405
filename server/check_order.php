<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

$conn = new mysqli("localhost", "root", "", "second_chance");

$data = json_decode(file_get_contents("php://input"), true);
$orderCode = $data['orderCode'];

$sql = "SELECT * FROM orders WHERE order_code = '$orderCode'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo json_encode(["status" => "Your order is found and being processed!"]);
} else {
  echo json_encode(["status" => "Order not found. Please check your order code."]);
}
?>
