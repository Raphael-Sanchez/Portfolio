$(document).ready(function() {
	// OPEN AND CLOSE MENU HAMBURGER TO CLICK
    $(".grid-button").on("click", function() {
    	$(".grid").toggleClass("open close");
    	$("#nav").toggleClass("open"); 
    });

   $('#nav a').on("click", function() {
		$(this).closest('#nav').find('a').each(function() {
			if ($(this).hasClass("nav-selected")) {
				$(this).removeClass("nav-selected");
			}
		})
		$(this).addClass('nav-selected');
	});

   if (matchMedia('only screen and (max-width: 959px)').matches) {
	   	$('.hoverable-container1, .hoverable-container2, .hoverable-container3, .hoverable-container4, .hoverable-container5, .hoverable-container6').on("click", function() {

		  	var myClass = this.className;
   			var myClassName = myClass.split(" ");
   			delete myClassName[1];
			classNameFinal = "."+myClassName;

   			var myClassNumber = myClass.split("r");
			delete myClassNumber[0];
			delete myClassNumber[1];
			var myClassNumber = myClassNumber[2].split(" ");
			delete myClassNumber[1];

			var hoverableContainer1 = $('.hoverable-container1 > .content1');
			var hoverableContainer2 = $('.hoverable-container2 > .content2');
			var hoverableContainer3 = $('.hoverable-container3 > .content3');
			var hoverableContainer4 = $('.hoverable-container4 > .content4');
			var hoverableContainer5 = $('.hoverable-container5 > .content5');
			var hoverableContainer6 = $('.hoverable-container6 > .content6');

			if (myClassNumber[0] == 1) {
				if (hoverableContainer1.hasClass("open")) {
					hoverableContainer1.removeClass("open");
	   				hoverableContainer1.addClass("close").css("transform", "translateY(100%)");
   				} else {
   					hoverableContainer1.removeClass("close");
   					hoverableContainer1.addClass("open").css("transform", "translateY(0%)");
   				}
			}
			if (myClassNumber[0] == 2) {
				if (hoverableContainer2.hasClass("open")) {
					hoverableContainer2.removeClass("open");
	   				hoverableContainer2.addClass("close").css("transform", "translateY(100%)");
   				} else {
   					hoverableContainer2.removeClass("close");
   					hoverableContainer2.addClass("open").css("transform", "translateY(0%)");
   				}
			}
			if (myClassNumber[0] == 3) {
				if (hoverableContainer3.hasClass("open")) {
					hoverableContainer3.removeClass("open");
	   				hoverableContainer3.addClass("close").css("transform", "translateY(100%)");
   				} else {
   					hoverableContainer3.removeClass("close");
   					hoverableContainer3.addClass("open").css("transform", "translateY(0%)");
   				}
			}
			if (myClassNumber[0] == 4) {
				if (hoverableContainer4.hasClass("open")) {
					hoverableContainer4.removeClass("open");
	   				hoverableContainer4.addClass("close").css("transform", "translateY(100%)");
   				} else {
   					hoverableContainer4.removeClass("close");
   					hoverableContainer4.addClass("open").css("transform", "translateY(0%)");
   				}
			}
			if (myClassNumber[0] == 5) {
				if (hoverableContainer5.hasClass("open")) {
					hoverableContainer5.removeClass("open");
	   				hoverableContainer5.addClass("close").css("transform", "translateY(100%)");
   				} else {
   					hoverableContainer5.removeClass("close");
   					hoverableContainer5.addClass("open").css("transform", "translateY(0%)");
   				}
			}
			if (myClassNumber[0] == 6) {
				if (hoverableContainer6.hasClass("open")) {
					hoverableContainer6.removeClass("open");
	   				hoverableContainer6.addClass("close").css("transform", "translateY(100%)");
   				} else {
   					hoverableContainer6.removeClass("close");
   					hoverableContainer6.addClass("open").css("transform", "translateY(0%)");
   				}
			}
		});
   }

   // SMOOTHSCROLL EFFECT
   $('.scrollTo').on('click', function() {
			var page = $(this).attr('href'); 
			var speed = 750;
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
			return false;
		});

   // FUNCTION POISTION NAVIGATION BAR
   function positionNavigationBar(){
    	    var hauteur = $('.wallpaper').height();
			$(window).scroll(function () {
				if ($(this).scrollTop() > hauteur) {
					$('#navigationBar').css({
						'position': 'fixed',
						'top': '0px'
					});
	      		         } else {
		  			$('#navigationBar').css({
			  			'position': 'absolute',
			  			'top': '100%'
		  			});
	      		          }
	   		});
    }

    positionNavigationBar();

    // En cas de redimensionnement de la fenetre recalcul de la postion de la navigationBar
    $(window).resize(function(){ 
        positionNavigationBar();
    });

    // En cas de redimensionnement de la fenetre recalcul du dimensionnement du Wallpaper
	function resizeForContent() {
		var hauteur = $('.wallpaper').height();
	    var total = hauteur;
		$('#content').css("padding-top", total + 'px');
   	}

   	resizeForContent();

   	// En cas de redimensionnement de la fenêtre
   	$(window).resize(function(){ 
        resizeForContent();
    });

   	// ScrollReveal
    $(document).ready(function() {
		window.sr = new scrollReveal({
			reset: true,
			mobile: false,
		});
	});

   	// VALIDATION FORM CONTACT, CONTROLE DES FONCTIONS RETURN TRUE OU FALSE 
    $('#btn').on('click', function(){
	
	var nameVar = name();
	var mailVar = mail();
	var messageVar = message();

	var errorMessage = $('#message-contact');

	// CHECK SI LE FORM NE CONTIENT PAS D'ERREUR 
	if (nameVar && mailVar && messageVar) {

		$('#submitValidation').on('submit', function(e) {
        e.preventDefault();
 
        var $this = $(this);
 
		        $.ajax({
		            type: 'POST',
		            url: 'check.php',
		            data: $this.serialize(),
		            dataType: 'json',
		            success: function (response) {
		                console.log(response);
		                $('#submitValidation').each(function(){this.reset();});
		                document.getElementById('logo-success').style.display = 'inline-block';document.getElementById('success-mail').style.display = 'inline-block';setTimeout(function(){document.getElementById('logo-success').style.opacity = '0';document.getElementById('success-mail').style.opacity = '0';},5000)
		            },
		            error: function (d) {
		                console.log(d);
		            }
		        });
	    	});

		} else {
			return false;
		}
	});

	// FUNCTIONS FORM 
	function name(){
		var errorName = $('#name-contact');
		var name = $('#name-contact').val();

		if(name.length < 4 || $.isNumeric(name)){
	        errorName.css("border-color", "red");
	        errorName.css("opacity", "0.7");
	        return false;
	    } else {
	      	errorName.css("border-color", "green");
	        errorName.css("opacity", "0.7");
	      	return true;
	    }
	}

	function mail(){
		var regMail = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		var errorMail = $('#mail-contact');
		var mail = $('#mail-contact').val();

		if(!regMail.test(mail) === true){
	            errorMail.css("border-color", "red");
	            errorMail.css("opacity", "0.7");
	            return false;
	    } else {
	    	errorMail.css("border-color", "green");
	    	errorMail.css("opacity", "0.7");
	  		return true;
	    }
	}

	function message(){
		var errorMessage = $('#message-contact');
		var message = $('#message-contact').val();

		if(message == ''){
	        errorMessage.css("border-color", "red");
	        errorMessage.css("opacity", "0.7");
	        return false;
	    } else {
	      	errorMessage.css("border-color", "green");
	        errorMessage.css("opacity", "0.7");
	      	return true;
	    }
	}

	// APPEL DES FONCTIONS DU FORM AU CHANGEMENT 
	$('#name-contact').change(function(){
		name();
	});

	$('#mail-contact').change(function(){
		mail();
	});

	$('#message-contact').change(function(){
		message();
	});
}); 