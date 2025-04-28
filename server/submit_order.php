<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

// اتصال بقاعدة البيانات
$conn = new mysqli("localhost", "root", "", "second_chance");

if ($conn->connect_error) {
  echo json_encode(["message" => "Connection failed"]);
  exit();
}

// استقبال البيانات
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["message" => "No data received"]);
  exit();
}

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$city = $data['city'] ?? '';
$order_code = "SC-" . rand(100000, 999999);

// إضافة الطلب
$stmt = $conn->prepare("INSERT INTO orders (product_id, name, email, address, phone, order_code) VALUES (?, ?, ?, ?, ?, ?)");

// هنا لانك ما ترسلين productId حاليًا، بنرسله 0 مؤقتًا (تقدري تعدلي)
$productId = 0;

$stmt->bind_param("isssss", $productId, $name, $email, $city, $phone, $order_code);

if ($stmt->execute()) {
  echo json_encode(["message" => "Request submitted successfully"]);
} else {
  echo json_encode(["message" => "Error saving your request"]);
}
?>
