window.onload = () => {
	const tab_switchers = document.querySelectorAll('[data-switcher]');

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

function SwitchPage (page_id) {
	console.log("i got ran to go to " + page_id);
    const current_page = document.querySelector('.pages .page.is-active');
    current_page.classList.remove('is-active');
    const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
}
/* below variables are used for the flow handling, some may be redundant */
let routeChoice;
let locationtxt;
let spacecount;
let metered;
var daysOfWeek = [];
let closureTime;
let closureTimeReal;
let typingTimer;                
let noshowSwapperInterval = 700;  
let myInput;


function routeSelected(input){
	routeChoice = input.value;
}
	

function addLocation(input){
	locationtxt=input.value;	
}

function MeteredChooser(input){
		metered = input;
}

function addSpaces(input){
	spacecount=input.value;
	var estimate;
	if (metered == 'true'){
		estimate = spacecount *closureTime* 73.00;
	}
	if (metered == 'false'){
		estimate = spacecount *closureTime* 30.00;
	}
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
		document.getElementById("startdateoffset").innerHTML = dateTime(4);
		closureTime = Math.ceil((closureTime/7));
		document.getElementById("slidervalue").innerHTML = closureTime;
		document.getElementById("weekOrDay").innerHTML = "week(s)";
	}else{
		/*this is a hack, since we're not actually looking at a calendar
		 in a real calendar days of the week should be properly calculated*/
		document.getElementById("startdateoffset").innerHTML = dateTime(3);
		closureTime = Math.ceil((closureTime * (daysOfWeek.length/7)));
		document.getElementById("slidervalue").innerHTML = closureTime;
		document.getElementById("weekOrDay").innerHTML = "day(s)";
	}
}

function setColor(btn) {
        var property = document.getElementById(btn);
        if (property.classList.contains('selected')) {
            property.classList.remove('selected');
			for (let i = 0; i < daysOfWeek.length; i++) {
				if(daysOfWeek[i]==btn){
					daysOfWeek.splice(i,1);
				}
			}
        }
        else {
            property.classList.add('selected');
				daysOfWeek.push(btn);
        }
    }

function pathDispatcher(thing){
	if(thing == 'parking'){
		if(closureTimeReal > 7 || spacecount >5 || metered=='true' ){
			SwitchPage('SimpleParking');
			return;
		}else{
			SwitchPage('streetwidth');
			return;
		}
	}
	if(routeChoice == 'traffic' && thing !== 'parking'){
		SwitchPage('Traffic');
		return;
	}else{
		SwitchPage('Spaces');
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

function noshowSwapper(nextn){
		console.log("Switching " + nextn);
	var property = document.getElementById(nextn);
	if (property.classList.contains('noshow')) {
		property.classList.remove('noshow');
		property.classList.add('tab');
        }
}

function choiceHandler(choice, test, nextn){
	if(choice == test){
		noshowSwapper(nextn);
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
}