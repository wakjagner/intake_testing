window.onload = () => {
	const tab_switchers = document.querySelectorAll('[data-switcher]');
/*This is going to handle our initial setup of the weird tab/button switching thing I want. */
    for (let i = 0; i < tab_switchers.length; i++) {
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;

        tab_switcher.addEventListener('click', () => {
			if(page_id){
            SwitchPage(page_id);
			}
        });
    }

}
var last_page =["Home"];
var last_pageCnt = 0;

function SwitchPage (page_id) {
    const current_page = document.querySelector('.pages .page.is-active');
	if(page_id == 'back'){
		page_id = last_page[last_pageCnt];
		if(last_pageCnt > 0){
			last_page.splice(last_pageCnt,1);
			last_pageCnt = last_pageCnt -1;
		}
	}else{
		last_page.push(current_page.dataset.page);
		last_pageCnt++;
	}
    current_page.classList.remove('is-active');
    const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
}
/* below variables are used for the flow handling, some may be redundant */
let routeChoice;
let locationtxt;
let spacecount = 0;
let metered;
var daysOfWeek = [];
var daynames = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
let closureTime = 0;
let closureTimeReal;
let typingTimer;                
let noshowSwapperInterval = 700;  
let myInput;
let closureCat = [];


function routeSelected(input){
	routeChoice = input;
	console.log(routeChoice);
}
	

function addLocation(input){
	locationtxt=input.value;	
}

function MeteredChooser(input){
		metered = input;
}

function addSpaces(input, additional=0){
	if (input>0){
		spacecount=parseInt(input);
	};
	if(additional >0){
		spacecount= parseInt(spacecount) + parseInt(additional);
	};
	var estimate;
	if (metered == 'true'){
		estimate = spacecount *closureTime* 73.00;
	};
	if (metered == 'false'){
		estimate = spacecount *closureTime* 30.00;
	};
	document.getElementById('spacecostest').innerHTML = estimate;
}

function dateTime(offset){
	var someDate = new Date();
	var dd = String((someDate.getDate())+offset);
	var mm = String(someDate.getMonth() + 1); //January is 0!
	var yyyy = someDate.getFullYear();

	var result = mm + '/' + dd + '/' + yyyy;
	return result;
}

function slider(thing) {
	closureTime = thing;
	closureTimeReal = thing;
	
	document.getElementById("daystotal").innerHTML = closureTimeReal; /*this line wouldn't be needed in real. */
	if(metered=='false'){
		/*-- in nonmetered areas we bill per week. 
		 honestly this whole area could be redone to be generic, but for now this works */
		 if(routeChoice == 'traffic'){
			document.getElementById("startdateoffset").innerHTML = dateTime(10);
		 }else{
			 document.getElementById("startdateoffset").innerHTML = dateTime(4);
		 }
		closureTime = Math.ceil((closureTime/7));
		document.getElementById("slidervalue").innerHTML = closureTime;
		document.getElementById("weekOrDay").innerHTML = "week(s)";
	}else{
		/*this is a hack, since we're not actually looking at a calendar
		 in a real calendar days of the week should be properly calculated*/
		 if(routeChoice == 'traffic'){
			document.getElementById("startdateoffset").innerHTML = dateTime(10);
		 }else{document.getElementById("startdateoffset").innerHTML = dateTime(3);
		 }
		closureTime = Math.ceil((closureTime * (daysOfWeek.length/7)));
		document.getElementById("slidervalue").innerHTML = closureTime;
		document.getElementById("weekOrDay").innerHTML = "day(s)";
	}
}

function setColor(btn) {
        var property = document.getElementById(btn);
		if (daynames.includes(btn)){
			if (property.classList.contains('selected')) {
				property.classList.remove('selected');
				for (let i = 0; i < daysOfWeek.length; i++) {
					if(daysOfWeek[i]==btn){
						daysOfWeek.splice(i,1);
					}
				}
			}else {
				property.classList.add('selected');
					daysOfWeek.push(btn);
			}
		}else{
			if (property.classList.contains('selected')) {
				property.classList.remove('selected');
				for (let i = 0; i < closureCat.length; i++) {
					if(closureCat[i]==btn){
						closureCat.splice(i,1);
					}
				}
			}else {
            property.classList.add('selected');
				closureCat.push(btn);
				if(btn == 'street'|| (btn=='lane'&& metered == "true") || btn == 'sidewalk'){
					noshowSwapper('Complex10b');
				}
        }
		}
}		

function pathDispatcher(){
	console.log(routeChoice);
	if(routeChoice == 'parking'){
		if(spacecount == undefined || spacecount==0){
			SwitchPage('Spaces');
			return;	
		}
		if(closureTimeReal > 7 || metered=='true' || spacecount > 5 ){
			SwitchPage('SimpleParking');
			return;
		}else{
			SwitchPage('streetwidth');
			return;
		}
	}
	if(routeChoice == 'traffic'){
		SwitchPage('Traffic');
		return;
	}

}


function handlerFor7Day(ft){
	/* console.log("I've been called, passed " + ft + "ft" + metered + " metered" 
	+ closureTimeReal + "days and " + spacecount + " spaces"); */
	if(((((ft =='true')&&(metered=='false'))&& closureTimeReal <8 )&&spacecount <6)){
		SwitchPage('7dayParser');
	}else{
		SwitchPage('SimpleParking');
	}
}

function typingEffectTimer(typingField, nextn, verts){
	/* This whole thing is just for asthetic effect, could be removed or changed. */
	var testingtimer;
	if(verts=='tick'){
		testingtimer = setTimeout(noshowSwapper, noshowSwapperInterval, nextn);
		return;		
	}
	myInput = document.getElementById(typingField);
	myInput.addEventListener('keyup', () => {
    clearTimeout(testingtimer);
    if (myInput.value) {
        testingtimer = setTimeout(noshowSwapper, noshowSwapperInterval, nextn);
    }
});
}

function noshowSwapper(nextn, toggler = 'false'){
	var property = document.getElementById(nextn);
	if (property.classList.contains('noshow')) {
		property.classList.remove('noshow');
		property.classList.add('tab');
        }
	if (toggler !== 'false'){
		console.log("doing a swap of " + toggler);
		property = document.getElementById(toggler);
		if (property.classList.contains('tab')) {
			property.classList.remove('tab');
			property.classList.add('noshow');
		}		
	}
}

function choiceHandler(choice, test, nextn, alter){
	if(choice == test){
		noshowSwapper(nextn);
	}else{
		noshowSwapper(alter);
	}
}

function locationbuilder(){
	if(routeChoice !== 'traffic'){
		document.getElementById("spaceS").innerHTML = spacecount*20;
		document.getElementById("streetsideS").innerHTML = document.getElementById('streetside').value;
		document.getElementById("mainstreet").innerHTML = document.getElementById('streetnameSimp').value;
		document.getElementById("crstreet1").innerHTML = document.getElementById('crossstreet1').value;
		document.getElementById("crstreet2").innerHTML = document.getElementById('crossstreet2').value;
	}
	if(routeChoice == 'traffic'){
		document.getElementById("compstreetsideS").innerHTML = document.getElementById('compstreetside').value;
		document.getElementById("compmainstreet").innerHTML = document.getElementById('streetnameComp').value;
		document.getElementById("compcrstreet1").innerHTML = document.getElementById('compcrossstreet1').value;
		document.getElementById("compcrstreet2").innerHTML = document.getElementById('compcrossstreet2').value;
	}
}