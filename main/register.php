<?php 
	session_start();
	$con = mysqli_connect("localhost","root","","proj");
	
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	if ($_SERVER["REQUEST_METHOD"]=="POST") {
		$name = $_POST['name'];
		$user = $_POST['user'];
		$pass = $_POST['pass'];
		$sql = "select * from login where user = '".$user."' and pass = '".$pass."' limit 1";
		$result = mysqli_query($con,$sql);
		if (mysqli_num_rows($result)==1) {
  			echo "<script>alert('The username already exists!')</script>";
		}else{
			$sql2 = "INSERT INTO login (uid, user, pass, name) VALUES (NULL,'".$user."','".$pass."','".$name."');";
				if (mysqli_query($con, $sql2)) {
				  echo "<script>alert('Registered successfully!!')</script>";
				  $_SESSION['uname'] = "user";
  				  echo "<script>location.href='index.php'</script>";
				} else {
				  echo mysqli_error($con);
				}
		}
	}
 ?>
<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
	<link rel="stylesheet" type="text/css" href="register.css">
</head>
<body>
	<div class="box">
		<div class="eye"></div>
		<div class="eye"></div>
	</div>
	<div class="container">
		<h2>Register</h2>
		<form method="post" action="register.php">
			<div class="inputBox">
			<input type="text" name="name" required>
			<span>Name</span>	
			</div>
			<div class="inputBox">
			<input type="text" name="user" required>
			<span>Username</span>	
			</div>
			<div class="inputBox">
			<input type="password" name="pass" required>
			<span>Password</span>
			</div>
			<div class="inputBox">
			<input type="submit" value="Register!" required>
			</div>
			<div class="inputBox">
			<a href="login.php" style="position: relative;top: -40px;left: 130px">Login!</a>			
			</div> 
		</form>		
	</div>
	<script type="text/javascript">
		document.querySelector('body').addEventListener('mousemove',eyeball);
		function eyeball(){
			const eye = document.querySelectorAll('.eye');
			eye.forEach(function(eye){
				let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
				let y = (eye.getBoundingClientRect().top) + (eye.clientWidth / 2);
				let radian = Math.atan2(event.pageX - x, event.pageY - y);
				let rotation = (radian * (180 / Math.PI) * -1) + 270;
				eye.style.transform = "rotate("+rotation+"deg)";
			});
		}
	</script>
</body>
</html>