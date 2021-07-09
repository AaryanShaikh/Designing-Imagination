<!DOCTYPE html>
<html>
<head>
	<!-- Icon -->
	<link rel="apple-touch-icon" sizes="180x180" href="http://localhost:3000/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="http://localhost:3000/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="http://localhost:3000/favicon-16x16.png">
	<link rel="manifest" href="http://localhost:3000/site.webmanifest">
	<!-- Icon Closed -->
	<title>Designing Imagination</title>
	<link rel="stylesheet" type="text/css" href="index.css">
	<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
</head>
<body>
	<!-- Progress Bar -->
	<div id="progbar"></div>
	<div id="scrollpath"></div>
	<div id="percent"></div>
	<!-- Progress Bar Closed -->

	<!-- Loading -->
	<div id="three-container"></div>
	<div id="instructions">
		You can Click and drag to play with the animation while the page loads.
	</div>
	<!-- Loading closed -->
	
	<!-- navigation -->
	<section id="nav" style="background:url('navbg.png')">
		<div id="ncont">
			<h2 id="navE">Designing&nbsp;&nbsp;&nbsp;Imagination</h2>
		</div>
		<div id="mcont"></div>
		<div id="mbtn" onclick="mbtn()">+</div>
		<div class="mcontent">
				<svg class="distort" width="350" height="450" viewBox="0 0 350 450">
					<filter id="distortionFilter">
						<feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise"/>
						<feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse"/>
					</filter>
					<g filter="url(#distortionFilter)">
						<image class="distort__img" x="50" y="50" xlink:href="images/m.png" height="350" width="250"/>
						<image class="distort__img" x="50" y="50" xlink:href="images/m2.png" height="350" width="250"/>
						<image class="distort__img" x="50" y="50" xlink:href="images/m3.png" height="350" width="250"/>
						<image class="distort__img" x="50" y="50" xlink:href="images/m4.png" height="350" width="250"/>
					</g>
				</svg>
				<nav class="menu">
					<a href="login.php" class="menu__link">Login</a>
					<a href="register.php" class="menu__link">Register</a>
					<a href="gallery.php" class="menu__link">Gallery</a>
					<a href="teams.html" class="menu__link">Team</a>
				</nav>
			</div>
	</section>
	<!-- navigation Closed -->

	<!-- Main Slider -->
	<section id="mainSlider">
		<iframe id="mscont" src="main.html" scrolling="no"></iframe>
	</section>
	<!-- Main Slider Closed-->

	<!-- Scroll Down -->
	<div id="scrolldown" class="scrolldown" onclick="scrollDown()">
			<span></span>
			<span></span>
			<span></span>
		</div>
	<!-- Scroll Down Closed -->
	
	<!-- Top Picks -->
	<section id="topPicks">
		<iframe id="tpscont" src="slider.html" scrolling="no"></iframe>
	</section>
	<!-- Top Picks Closed-->

<!-- Scripts -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script src="particles.js"></script>
<script src="anime.min.js"></script>
<script src="charming.min.js"></script>
<script src="TweenMax.min.js"></script>
<script src="demo2.js"></script>	
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js"></script>
<script type="text/javascript" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas.js"></script>
<script type="text/javascript" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/TextGeometry.js"></script>
<script type="text/javascript" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/FontUtils.js"></script>
<script type="text/javascript" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/pnltri.min.js"></script>
<script type="text/javascript" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/droid_sans_bold.typeface.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
<script type="text/javascript" src="index.js"></script>
<script>
	/* Loader */
	THREE.ShapeUtils.triangulateShape = (function () {
	        var pnlTriangulator = new PNLTRI.Triangulator();
	        return function triangulateShape(contour, holes) {
	            return pnlTriangulator.triangulate_polygon([contour].concat(holes));
	        };
	    })();

</script>
<!-- scripts end -->

<!-- Modules -->
<script type="module">
import Letterize from "https://cdn.skypack.dev/letterizejs@2.0.0";
const test = new Letterize({
      targets: "#navE"
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
<!-- Module end -->
</body>
</html>