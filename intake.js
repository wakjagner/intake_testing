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
	    console.log("Just started the page switcher, so our pageID is: " + page_id);
    const current_page = document.querySelector('.pages .page.is-active');
    current_page.classList.remove('is-active');
    const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
		console.log("And the new page ID is: " + page_id);
}
let parkingSelect;
let parkingchecked;
let trafficSelect;
let trafficchecked;
let locationtxt;
let spacecount;
let metered;
let todaysDate;
const daysOfWeek = [];

function parkingSelected(input){
	parkingSelect = input;
	if(parkingSelect == 'true'){
		parkingchecked = 'Spaces';
	}
	console.log("Parking Selected: " + parkingSelect)
		console.log("Traffic Control Selected: " + trafficSelect)
	
}
function trafficSelected(input){
	trafficSelect = input;
	if(trafficSelect == 'true'){
		trafficchecked = 'Traffic';
	}
	console.log("Traffic Control Selected: " + trafficSelect)
		console.log("Parking Selected: " + parkingSelect)
	
}
function addLocation(input){
	locationtxt=input.value;
	todaysDate= new Date();
	console.log("Location Entered as: " + locationtxt)
	
}

function MeteredChooser(){
		metered = 'true';
	if(trafficSelect == 'true'){
		SwitchPage(trafficchecked);
	}else{
		SwitchPage(parkingchecked);
	}
}

function NonMeteredChooser(){
		metered = 'false';
	if(trafficSelect == 'true'){
		SwitchPage(trafficchecked);
	}else{
		SwitchPage(parkingchecked);
	}

}
function addSpaces(input){
	spacecount=input.value;
	console.log(spacecount + " spaces requested")
	
}

function setColor(btn) {
        var property = document.getElementById(btn);
        if (property.classList.contains('selected')) {
					console.log("Removing Selection");
            property.classList.remove('selected');
			
        }
        else {
            property.classList.add('selected');
				console.log("adding selection");
				daysOfWeek.push(btn);
        }
    }