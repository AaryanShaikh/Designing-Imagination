<!DOCTYPE html>
<html>
<head>
	<title>Gallery</title>
	<link rel="stylesheet" type="text/css" href="gallery.css">
</head>
<body>
	<a href="gallery.php" class="back">< Back</a>
	<h2 style="color:white;margin-top: 30px;margin-bottom: 20px" id="gname"><center>Gallery</center></h2>
	<div class="flex-container">
		<?php 
		include_once 'includes/dbh.inc.php';
		if (isset($_POST['submit'])) {
			$name = $_POST['filetitle'];
		}
		$sql = "SELECT * from gallery where titleGallery = '$name' order by orderGallery desc";
		$stmt = mysqli_stmt_init($conn);
		if (!mysqli_stmt_prepare($stmt, $sql)) {
			echo mysqli_error($conn);
		}else{
			mysqli_stmt_execute($stmt);
			$result = mysqli_stmt_get_result($stmt);
			while ($row = mysqli_fetch_assoc($result)) {
			    echo '<div class="container" data-tilt data-tilt-glare data-tilt-max-glare="0.2" data-tilt-scale="1.1">
		  			<img src="uploads/'.$row["imgFullNameGallery"].'">
		  			<center><h2>'.$row["titleGallery"].'</h2></center>
		  			<p>'.$row["descGallery"].'</p>
		  		</div>';
			}
		}
  		 ?>
	</div>
	<script type="text/javascript" src="gallery.js"></script>
	<script type="text/javascript" src="vanilla-tilt.js"></script>
	<script src="anime.min.js"></script>
	<script type="module">
import Letterize from "https://cdn.skypack.dev/letterizejs@2.0.0";
const test = new Letterize({
      targets: "#gname"
    });

    var animation = anime.timeline({
      targets: test.listAll,
      delay: anime.stagger(100),
      loop: true
    });

    animation
      .add({
        scale: 0,
        rotate: 360
      })
      .add({
        scale: 1,
        rotate: 0
      });
</script>
</body>
</html>