<!DOCTYPE html>
<html>
<head>
	<title>Gallery</title>
	<link rel="stylesheet" type="text/css" href="gallery.css">
</head>
<body>
	<a href="index.php" class="back">< Back</a>
	<h2 style="color:white;margin-top: 30px;margin-bottom: 20px" id="gname"><center>Gallery</center></h2>
	<div class="flex-container">
		<?php 
		include_once 'includes/dbh.inc.php';
		$sql = "SELECT * from gallery order by orderGallery desc";
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
	<section>
		<div class="hoverBtn" onclick="openF()"><h2>upload!</h2></div>
		<div class="searchBtn" onclick="openS()"><h2>search!</h2></div>
		<div class="deleteBtn" onclick="openD()"><h2>delete!</h2></div>
		<div class="dform" id="dform">
			<form action="gdelete.php" method="post" enctype="multipart/form-data">
				<center>Which post you wanna delete?
				<div class="closeBtnD" id="closeBtn" onclick="closeD()">X</div>
				<input type="text" name="filetitle" placeholder="Image Title">
				<button type="submit" name="submit">Delete!</button></center>
			</form>
		</div>
		<div class="sform" id="sform">
			<form action="gsearch.php" method="post" enctype="multipart/form-data">
				<center>What you wanna search?
				<div class="closeBtnS" id="closeBtn" onclick="closeS()">X</div>
				<input type="text" name="filetitle" placeholder="Image Title">
				<button type="submit" name="submit">Search!</button></center>
			</form>
		</div>
		<div class="fcontainer" id="fform">
			<form action="includes/gallery-upload.inc.php" method="post" enctype="multipart/form-data">
				<center><h2>Please Enter the details</h2>
					<div class="closeBtn" id="closeBtnS" onclick="closeS()">X</div>
				<input type="text" name="filename" placeholder="File name here" required>
				<input type="text" name="filetitle" placeholder="Image Title" required>
				<input type="text" name="filedesc" placeholder="Description" required>
				<input type="file" name="file"><br>
				<button type="submit" name="submit">Upload!</button></center>
			</form>
		</div>
	</section>
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