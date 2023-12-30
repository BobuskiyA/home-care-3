"use strict";


$(".header-menu__button").click(function() {
	$(".header-menu__mob").fadeIn(500);
	$(".body").addClass('overflow');
});
$(".header-menu__close").click(function() {
	$(".header-menu__mob").fadeOut(500);
	$(".body").removeClass('overflow');
});
$(".menu-item").click(function() {
	$(".header-menu__mob").fadeOut(500);
	$(".body").removeClass('overflow');
});

$(".client").click(function() {
	$(".client").addClass('input-active');
	$(".caregiver").removeClass('input-active');
});
$(".caregiver").click(function() {
	$(".caregiver").addClass('input-active');
	$(".client").removeClass('input-active');
});

// Variable for current Slide position
var currentSlide = 0;

// Arrays for change
var sliderLeftText = ["Senior Care<br>Beyond a Nursing<br>Home", "Support Beyond<br>Medical", "Holistic Health<br>Approach", "Engaging with<br>Communities"];
var sliderImages = ["/images/slider1.png", "/images/slider2.png", "/images/slider3.png", "/images/slider4.png"];
var sliderRightText = ["Traditional nursing homes have their place, but nothing compares to the warmth and familiarity of one's own home. Why uproot your loved ones from their cherished surroundings when they can receive exceptional care for your loved ones right where they are? With Impactful, they stay connected to their memories, their belongings, and their community.", "Our vision of care goes beyond the medical charts. While we take pride in our stellar medical care, our home health and personal care philosophies understand the deep emotional and social needs that accompany age or illness. Our dedicated caretakers, home health aides and social workers play a pivotal role in this, ensuring a 360-degree approach to well-being.", "We believe that health is a sum of physical, mental, and social well-being. Our services, therefore, are not just limited to medical interventions. From organizing group activities, personal hobby sessions, or just a simple walk in the park, we strive to enhance every aspect of our patients' lives.", "Our roots in Philadelphia go deep. Through various community engagement programs, workshops, and health talks, we aim to uplift the entire community's health and well-being. Our role isn't just that of a home health agency; we're an integral part of the Philadelphia family."];

// Variables for elements
var SLT = $(".slider-section .background .left-text h2");
var SI = $(".slider-section .background .image img");
var SRT = $(".slider-section .background .right-text p");
var prevButton = $('.slider-section .background .left-text .controls .button-prev');
var nextButton = $('.slider-section .background .left-text .controls .button-next');

// Buttons State: 0 - active, 1 - inactive
var nextButtonState = ['<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#2F3280"/><path d="M26 33L31 28L26 23" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#2F3280"/><path opacity="0.2" d="M26 33L31 28L26 23" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>'];
var prevButtonState = ['<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#2F3280"/><path d="M31 33L26 28L31 23" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#2F3280"/><path opacity="0.2" d="M31 33L26 28L31 23" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>'];

// Default settings
SLT.html(sliderLeftText[0]);
SI.attr('src', sliderImages[0]);
SRT.html(sliderRightText[0]);

// Functions
function setSlide(currentPos) {
	SLT.animate({
		opacity: 0
	}, 0)
	.html(sliderLeftText[currentPos])
	.animate({
		opacity: 1
	}, 700);	

	SI.animate({
		opacity: 0
	}, 0)
	.attr('src', sliderImages[currentPos])
	.animate({
		opacity: 1
	}, 700);

	SRT.animate({
		opacity: 0
	}, 0)
	.html(sliderRightText[currentPos])
	.animate({
		opacity: 1
	}, 700);								
}

// Events
prevButton.on('click', function(e){
	e.preventDefault();
	if(currentSlide != 0) 
	{
		if(currentSlide == 3)
		{
			nextButton.html(nextButtonState[0]);
		}
		currentSlide = currentSlide - 1;
		setSlide(currentSlide);
		if(currentSlide == 0)
		{
			prevButton.html(prevButtonState[1]);
		}
		else
		{
			prevButton.html(prevButtonState[0]);
		}	
	}
});

nextButton.on('click', function(e){
	e.preventDefault();
	if(currentSlide != 3) 
	{
		if(currentSlide == 0)
		{
			prevButton.html(prevButtonState[0]);
		}
		currentSlide = currentSlide + 1;
		setSlide(currentSlide);
		if(currentSlide == 3)
		{
			nextButton.html(nextButtonState[1]);
		}
		else
		{
			nextButton.html(nextButtonState[0]);
		}	
	}
});

document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('form');
	const formClass = document.querySelector('.feedback-form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let textIner = document.querySelector('.valid');

		let error = onInput();

		let formData = new FormData(form);

		if (error === 0) {
			formClass.classList.add('sending');
			let response = await fetch('sendmail.php', {
				method: 'post',
				body: formData
			});
			if (response.ok) {
				formClass.classList.remove('sending');
				alert('Send massage');	
				console.log('send');
				form.reset();
				textIner.classList.add('ok');
				textIner.innerHTML = 'send massage';
			} else {
				alert('ERROR');
				formClass.classList.remove('sending');
				form.reset();
				textIner.classList.add('not');
				textIner.innerHTML = 'not send massage';
			}
		} else {
			alert('Fill in required fields');
		}
	}

	// const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	const input = document.querySelector('input');
	
	function isEmailValid() {
		let none = 0;
		$('.submit').click(function() {
			if($('.last-name').val().length === 0 ) {
				none = 0;
			} else {
				none++;
			}
		})
		return none;
	}
	
	function onInput() {
		let error = 0;
		if (isEmailValid() === 0) {
			input.classList.remove('invalid');
			input.classList.add('valid');
			error = 0;
		} else {
			input.classList.remove('valid');
			input.classList.add('invalid');
			error++;
		}
		console.log(error);
		return error;
	}
	
	input.addEventListener('input', onInput);
});




