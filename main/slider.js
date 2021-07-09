class Slider {

    /*** CONSTRUCTOR ***/

    constructor(options = {}) {
        // our options
        this.options = {
            // slider state and values
            // the div we are going to translate
            element: options.element || document.getElementById("planes"),
            // easing value, the lower the smoother
            easing: options.easing || 0.1,
            // translation speed
            // 1: will follow the mouse
            // 2: will go twice as fast as the mouse, etc
            dragSpeed: options.dragSpeed || 1,
            // duration of the in animation
            duration: options.duration || 750,
        };

        // if we are currently dragging
        this.isMouseDown = false;
        // if the slider is currently translating
        this.isTranslating = false;

        // current position
        this.currentPosition = 0;
        // drag start position
        this.startPosition = 0;
        // drag end position
        this.endPosition = 0;

        // slider translation
        this.translation = 0;

        this.animationFrame = null;

        // set up the slider
        this.setupSlider();
    }

    /*** HELPERS ***/

    // lerp function used for easing
    lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return (1 - amount) * value1 + amount * value2;
    }

    // return our mouse or touch position
    getMousePosition(e) {
        var mousePosition;
        if(e.targetTouches) {
            if(e.targetTouches[0]) {
                mousePosition = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
            }
            else if(e.changedTouches[0]) {
                // handling touch end event
                mousePosition = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
            }
            else {
                // fallback
                mousePosition = [e.clientX, e.clientY];
            }
        }
        else {
            mousePosition = [e.clientX, e.clientY];
        }

        return mousePosition;
    }

    // set the slider boundaries
    // we will translate it horizontally in landscape mode
    // vertically in portrait mode
    setBoundaries() {
        if(window.innerWidth >= window.innerHeight) {
            // landscape
            this.boundaries = {
                max: -1 * this.options.element.clientWidth + window.innerWidth,
                min: 0,
                sliderSize: this.options.element.clientWidth,
                referentSize: window.innerWidth,
            };

            // set our slider direction
            this.direction = 0;
        }
        else {
            // portrait
            this.boundaries = {
                max: -1 * this.options.element.clientHeight + window.innerHeight,
                min: 0,
                sliderSize: this.options.element.clientHeight,
                referentSize: window.innerHeight,
            };

            // set our slider direction
            this.direction = 1;
        }
    }

    /*** HOOKS ***/

    // this is called once our mousedown / touchstart event occurs and the drag started
    onDragStarted(mousePosition) {
    }

    // this is called while we are currently dragging the slider
    onDrag(mousePosition) {
    }

    // this is called once our mouseup / touchend event occurs and the drag started
    onDragEnded(mousePosition) {
    }

    // this is called continuously while the slider is translating
    onTranslation() {
    }

    // this is called once the translation has ended
    onTranslationEnded() {
    }

    // this is called before our slider has been resized
    onBeforeResize() {
    }

    // this is called after our slider has been resized
    onSliderResized() {
    }

    /*** ANIMATIONS ***/

    // this will translate our slider HTML element and set up our hooks
    translateSlider(translation) {
        translation = Math.floor(translation * 100) / 100;

        // should we translate it horizontally or vertically?
        var direction = this.direction === 0 ? "translateX" : "translateY";
        // apply translation
        this.options.element.style.transform = direction + "(" + translation + "px)";

        // if the slider translation is different than the translation to apply
        // that means the slider is still translating
        if(this.translation !== translation) {
            // hook function to execute while we are translating
            this.onTranslation();
        }
        else if(this.isTranslating && !this.isMouseDown) {
            // if those conditions are met, that means the slider is no longer translating
            this.isTranslating = false;

            // hook function to execute after translation has ended
            this.onTranslationEnded();
        }

        // finally set our translation
        this.translation = translation;
    }

    // this is our request animation frame loop where we will translate our slider
    animate() {
        // interpolate values
        var translation = this.lerp(this.translation, this.currentPosition, this.options.easing);

        // apply our translation
        this.translateSlider(translation);

        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }

    /*** EVENTS ***/

    // on mouse down or touch start
    onMouseDown(e) {
        // start dragging
        this.isMouseDown = true;

        // apply specific styles
        this.options.element.classList.add("dragged");

        // get our touch/mouse start position
        var mousePosition = this.getMousePosition(e);
        // use our slider direction to determine if we need X or Y value
        this.startPosition = mousePosition[this.direction];

        // drag start hook
        this.onDragStarted(mousePosition);
    }

    // on mouse or touch move
    onMouseMove(e) {
        // if we are not dragging, we don't do nothing
        if(!this.isMouseDown) return;

        // get our touch/mouse position
        var mousePosition = this.getMousePosition(e);

        // get our current position
        this.currentPosition = this.endPosition + ((mousePosition[this.direction] - this.startPosition) * this.options.dragSpeed);

        // if we're not hitting the boundaries
        if(this.currentPosition > this.boundaries.min && this.currentPosition < this.boundaries.max) {
            // if we moved that means we have started translating the slider
            this.isTranslating = true;
        }
        else {
            // clamp our current position with boundaries
            this.currentPosition = Math.min(this.currentPosition, this.boundaries.min);
            this.currentPosition = Math.max(this.currentPosition, this.boundaries.max);
        }

        // drag hook
        this.onDrag(mousePosition);
    }

    // on mouse up or touchend
    onMouseUp(e) {
        // we have finished dragging
        this.isMouseDown = false;

        // remove specific styles
        this.options.element.classList.remove("dragged");

        // update our end position
        this.endPosition = this.currentPosition;

        // send our mouse/touch position to our hook
        var mousePosition = this.getMousePosition(e);

        // drag ended hook
        this.onDragEnded(mousePosition);
    }

    // on resize we will need to apply old translation value to new sizes
    onResize(e) {
        this.onBeforeResize();

        // get our old translation ratio
        var ratio = this.translation / this.boundaries.sliderSize;

        // reset boundaries and properties bound to window size
        this.setBoundaries();

        // reset all translations
        this.options.element.style.transform = "tanslate3d(0, 0, 0)";

        // calculate our new translation based on the old translation ratio
        var newTranslation = ratio * this.boundaries.sliderSize;
        // clamp translation to the new boundaries
        newTranslation = Math.min(newTranslation, this.boundaries.min);
        newTranslation = Math.max(newTranslation, this.boundaries.max);

        // apply our new translation
        this.translateSlider(newTranslation);

        // reset current and end positions
        this.currentPosition = newTranslation;
        this.endPosition = newTranslation;

        // call our resize hook
        this.onSliderResized();
    }

    /*** SET UP AND DESTROY ***/

    // set up our slider
    // init its boundaries, add event listeners and start raf loop
    setupSlider() {
        this.setBoundaries();

        // event listeners

        // mouse events
        window.addEventListener("mousemove", this.onMouseMove.bind(this), {
            passive: true,
        });
        window.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));

        // touch events
        window.addEventListener("touchmove", this.onMouseMove.bind(this), {
            passive: true,
        });
        window.addEventListener("touchstart", this.onMouseDown.bind(this), {
            passive: true,
        });
        window.addEventListener("touchend", this.onMouseUp.bind(this));

        // resize event
        window.addEventListener("resize", this.onResize.bind(this));

        // launch our request animation frame loop
        this.animate();
    }

    // will be called silently to cleanly remove the slider
    destroySlider() {
        // remove event listeners

        // mouse events
        window.removeEventListener("mousemove", this.onMouseMove, {
            passive: true,
        });
        window.removeEventListener("mousedown", this.onMouseDown);
        window.removeEventListener("mouseup", this.onMouseUp);

        // touch events
        window.removeEventListener("touchmove", this.onMouseMove, {
            passive: true,
        });
        window.removeEventListener("touchstart", this.onMouseDown, {
            passive: true,
        });
        window.removeEventListener("touchend", this.onMouseUp);

        // resize event
        window.removeEventListener("resize", this.onResize);

        // cancel request animation frame
        cancelAnimationFrame(this.animationFrame);
    }

    // call this method publicly to destroy our slider
    destroy() {
        // destroy everything related to the slider
        this.destroySlider();
    }

};

class WebGLSlider extends Slider {

    /*** CONSTRUCTOR ***/

    constructor(options) {
        super(options);

        // tweening
        this.animation = null;
        // value from 0 to 1 to pass as uniform to the WebGL
        // will be tweened on mousedown / touchstart and mouseup / touchend events
        this.effect = 0;

        // our WebGL variables
        this.curtains = null;
        this.planes = [];
        // we will keep track of the previous translation values on resize
        this.previousTranslation = {
            x: 0,
            y: 0,
        };
        this.shaderPass = null;

        // set up the WebGL part
        this.setupWebGL();
    }

    /*** WEBGL INIT ***/

    // set up WebGL context and scene
    setupWebGL() {
        // set up our WebGL context, append the canvas to our wrapper and create a requestAnimationFrame loop
        // the canvas will be our scene containing all our planes
        // this is the scene we will post process
        this.curtains = new Curtains({
          container: "canvas"
        });

        this.curtains.onError(function() {
            // onError handles all errors during WebGL context initialization or plane creation
            // we will add a class to the document body to display original images (see CSS)
            document.body.classList.add("no-curtains");
        });

        // planes and shader pass
        this.setupPlanes();
        this.setupShaderPass();
    }

    /*** PLANES CREATION ***/

    setupPlanes() {
        // Planes

        // each plane is bound to a HTML element to copy its size and position
        // in this case this will be the slider inner items
        // it will automatically create a WebGL texture for each image, canvas and video child of that element
        var planeElements = document.getElementsByClassName("plane");

        // our planes params
        // we just pass our shaders tag ID and a uniform to animate opacity on load
        var params = {
            vertexShaderID: "slider-planes-vs",
            fragmentShaderID: "slider-planes-fs",
            uniforms: {
                opacity: {
                    name: "uOpacity", // variable name inside our shaders
                    type: "1f", // this means our uniform is a float
                    value: 0,
                },
            },
        };

        // add all our planes and handle them
        for(var i = 0; i < planeElements.length; i++) {
            // addPlane method adds a plane to our WebGL scene
            // takes 2 params: our HTML referent element and the params set above
            // it returns a Plane class object if creation is successful, false otherwise
            var plane = this.curtains.addPlane(planeElements[i], params);

            // if our plane has been successfully created
            if(plane) {
                // push it into our planes array
                this.planes.push(plane);

                // onReady is called once our plane is ready and all its texture have been created
                plane.onReady(function() {
                    // inside our onReady function scope, this represents our plane
                    var currentPlane = this;

                    // add a "loaded" class to display the title
                    currentPlane.htmlElement.closest(".plane-wrapper").classList.add("loaded");

                    // animate plane opacity once they are loaded
                    var opacity = {
                        value: 0,
                    };

                    anime({
                        targets: opacity,
                        value: 1,
                        easing: "linear",
                        duration: 750,
                        update: function() {
                            // continualy increase opacity from 0 to 1
                            currentPlane.uniforms.opacity.value = opacity.value;
                        },
                    });
                });
            }
        }
    }

    /*** SHADER PASS CREATION ***/

    setupShaderPass() {
        // Shader pass
        // we will post process our scene
        // that means we will apply shaders to our whole scene

        // like for regular planes we will need params
        // they will contain vertex and fragment shaders ID and our uniforms
        var shaderPassParams = {
            vertexShaderID: "distortion-vs",
            fragmentShaderID: "distortion-fs",
            uniforms: {
                // apply the whole effect
                // 0: no effect
                // 1: full effect
                dragEffect: {
                    name: "uDragEffect", // variable name inside our shaders
                    type: "1f", // this means our uniform is a float
                    value: 0,
                },
                // our mouse position (in WebGL clip space coordinates)
                mousePos: {
                    name: "uMousePos",
                    type: "2f", // this means our uniform is a length 2 array of floats
                    value: [0, 0],
                },
                // direction of our slider
                // 0: horizontal drag
                // 1: vertical drag
                direction: {
                    name: "uDirection",
                    type: "1f",
                    value: this.direction,
                },
                // the background color when effect is applied
                bgColor: {
                    name: "uBgColor",
                    type: "3f", // this means our uniform is a length 3 array of floats
                    value: [13, 13, 13], // rgb values
                },
                // our displacement texture offset
                offset: {
                    name: "uOffset",
                    type: "2f",
                    value: [0, 0],
                },
            },
        };

        // addShaderPass adds a shader pass (Frame Buffer Object) to our WebGL scene
        // returns a ShaderPass class object if successful, false otherwise
        this.shaderPass = this.curtains.addShaderPass(shaderPassParams);

        // if our shader pass has been successfully created
        if(this.shaderPass) {
            // we will add our displacement map texture

            // first we load a new image
            var image = new Image();
            image.src = "https://www.martin-laxenaire.fr/medium/medias/skylines-displacement.jpg";
            // then we set its data-sampler attribute to use in fragment shader
            image.setAttribute("data-sampler", "displacementTexture");
            // finally we load it into our shader pass via the loadImage method
            this.shaderPass.loadImage(image);

            var self = this;

            // onRender is called at each requestAnimationFrame call
            this.shaderPass.onRender(function() {
                // we will continuously offset our displacement texture on secondary axis
                var secondaryDirection = self.direction === 0 ? 1 : 0;
                self.shaderPass.uniforms.offset.value[secondaryDirection] = self.shaderPass.uniforms.offset.value[secondaryDirection] + 1;
            });
        }
    }


    /*** HELPER ***/

    // this will update our shader pass mouse position uniform
    updateMousePosUniform(mousePosition) {
        // if our shader pass exists, update the mouse position uniform
        if(this.shaderPass) {
            // mouseToPlaneCoords converts window coordinates to WebGL clip space
            var relativeMousePos = this.shaderPass.mouseToPlaneCoords(mousePosition[0], mousePosition[1]);
            this.shaderPass.uniforms.mousePos.value = [relativeMousePos.x, relativeMousePos.y];
        }
    }

    /*** HOOKS ***/

    // this is called once our mousedown / touchstart event occurs and the drag started
    onDragStarted(mousePosition) {
        // pause and remove previous animation
        if(this.animation) this.animation.pause();
        anime.remove(slider);

        // get a ref
        var self = this;

        // animate our mouse down effect
        this.animation = anime({
            targets: self,
            effect: 1,
            easing: 'easeOutCubic',
            duration: self.options.duration,
            update: function() {
                if(self.shaderPass) {
                    // update our shader pass uniforms
                    self.shaderPass.uniforms.dragEffect.value = self.effect;
                }
            }
        });

        // enableDrawing to re-enable drawing again if we disabled it earlier
        this.curtains.enableDrawing();

        // update our shader pass mouse position uniform
        this.updateMousePosUniform(mousePosition);
    }

    // this is called while we are currently dragging the slider
    onDrag(mousePosition) {
        // update our shader pass mouse position uniform
        this.updateMousePosUniform(mousePosition);
    }

    // this is called once our mouseup / touchend event occurs and the drag started
    onDragEnded(mousePosition) {
        // calculate duration based on easing
        var duration = 100 / this.options.easing;
        var easing = 'linear';

        // if there's no movement just tween the shader pass effect
        if(Math.abs(this.translation - this.currentPosition) < 5) {
            easing = 'easeOutCubic';
            duration = this.options.duration;
        }

        // pause remove previous animation
        if(this.animation) this.animation.pause();
        anime.remove(slider);

        // get a ref
        var self = this;

        this.animation = anime({
            targets: self,
            effect: 0,
            easing: easing,
            duration: duration,
            update: function() {
                if(self.shaderPass) {
                    // update drag effect
                    self.shaderPass.uniforms.dragEffect.value = self.effect;
                }
            }
        });

        // update our shader pass mouse position uniform
        this.updateMousePosUniform(mousePosition);
    }

    // this is called continuously while the slider is translating
    onTranslation() {
        // get our slider translation and take our previous translation into account
        var planeTranslation = {
            x: this.direction === 0 ? this.translation - this.previousTranslation.x : 0,
            y: this.direction === 1 ? this.translation - this.previousTranslation.y : 0,
        };

        // keep our WebGL planes position in sync with their HTML elements
        for(var i = 0; i < this.planes.length; i++) {
            // in the previous CodePen we were using updatePosition the method which handles positioning automatically
            // however this method internally calls getBoundingClientRect() which causes a reflow and therefore impacts performance
            // so we will position our planes manually with setRelativePosition instead, which does not trigger a layout repaint call
          this.planes[i].setRelativePosition(planeTranslation.x, planeTranslation.y);
        }

        // shader pass displacement texture offset
        if(this.shaderPass) {
            // we will offset our displacement effect on main axis so it follows the drag
            var offset = ((this.direction - 1) * 2 + 1) * this.translation / this.boundaries.referentSize;

            this.shaderPass.uniforms.offset.value[this.direction] = offset;
        }
    }

    // this is called once the translation has ended
    onTranslationEnded() {
        // we will stop rendering our WebGL until next drag occurs
        if(this.curtains) {
            this.curtains.disableDrawing();
        }
    }

    // this is called after our slider has been resized
    onSliderResized() {
        // we need to update our previous translation value
        this.previousTranslation = {
            x: this.direction === 0 ? this.translation : 0,
            y: this.direction === 1 ? this.translation : 0,
        };

        // reset our slides relative positions
        // because during the resize their positions has already been updated internally
        for(var i = 0; i < this.planes.length; i++) {
            this.planes[i].setRelativePosition(0, 0);
        }

        // update our direction uniform
        if(this.shaderPass) {
            // update direction
            this.shaderPass.uniforms.direction.value = this.direction;
        }
    }


    /*** DESTROY ***/

    // destroy all WebGL related things
    destroyWebGL() {
        // if you want to totally remove the WebGL context uncomment next line
        // and remove what's after
        //this.curtains.dispose();

        // if you want to only remove planes and shader pass and keep the context available
        // that way you could re init the WebGL later to display the slider again
        if(this.shaderPass) {
            this.curtains.removeShaderPass(this.shaderPass);
        }

        for(var i = 0; i < this.planes.length; i++) {
            this.curtains.removePlane(this.planes[i]);
        }
    }

    // call this method publicly to destroy our slider and the WebGL part
    // override the destroy method of the Slider class
    destroy() {
        // destroy everything related to WebGL and the slider
        this.destroyWebGL();
        this.destroySlider();
    }
}

// custom options
var options = {
    duration: 500,
    dragSpeed: 1.5,
}

// let's go!
var slider = new WebGLSlider(options);