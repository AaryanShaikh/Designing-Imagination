<?php 

if (isset($_POST['submit'])) {
	$newFileName = $_POST['filename'];
	if (empty($_POST['filename'])) {
		$newFileName = "gallery";
	}else{
		$newFileName = strtolower(str_replace(" ","-",$newFileName));
	}
	$imageTitle = $_POST['filetitle'];
	$imageDesc = $_POST['filedesc'];
	$file = $_FILES['file'];
	$fileName = $_FILES['file']['name'];
	$fileType = $_FILES['file']['type'];
	$fileTempName = $_FILES['file']['tmp_name'];
	$fileError = $_FILES['file']['error'];
	$fileSize = $_FILES['file']['size'];

	$fileExt = explode(".",$fileName);
	$fileActualExt = strtolower(end($fileExt));

	$allowed = array("jpg","jpeg","png");

	if (in_array($fileActualExt,$allowed)) {
		if ($fileError===0) {
			if ($fileSize < 2000000) {
				$imageFullName = $newFileName.".".uniqid("",true).".".$fileActualExt;
				$fileDestination = "../uploads/".$imageFullName;
				include_once 'dbh.inc.php';
				if (empty($imageTitle)||empty($imageDesc)) {
					header("location: ../gallery.php?upload=empty");
					exit();
				}else{
					$sql = "SELECT * from gallery;";
					$stmt = mysqli_stmt_init($conn);
					if (!mysqli_stmt_prepare($stmt, $sql)) {
						echo 'SQL statement failed!!';
					} else{
						mysqli_stmt_execute($stmt);
						$result = mysqli_stmt_get_result($stmt);
						$rowCount = mysqli_num_rows($result);
						$setImageOrder = $rowCount + 1;

						$sql = "INSERT into gallery (titleGallery, descGallery, imgFullNameGallery, orderGallery) values (?,?,?,?);";
						if (!mysqli_stmt_prepare($stmt, $sql)) {
							echo 'SQL statement failed!!';
						} else{
							mysqli_stmt_bind_param($stmt, "ssss", $imageTitle, $imageDesc, $imageFullName, $setImageOrder);
							mysqli_stmt_execute($stmt);

							move_uploaded_file($fileTempName,$fileDestination);

							header("Location: ../gallery.php?upload=success");
						}	
					}
				}
			}else{
				echo 'file size is too big!';
			}
		}else{
			echo 'Ooos! there was an error';
		}
	}else{
		echo 'You need to upload a proper file type;';
		exit();
	}
}