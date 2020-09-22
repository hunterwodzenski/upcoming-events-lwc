
//import lightning dependencies
import { LightningElement, track, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

//import apex dependencies
import getAllEvents from '@salesforce/apex/EventController.getAllEvents';

//import required fields
import EVENT_NAME from '@salesforce/schema/Event__c.Name';
import EVENT_DESCRIPTION from '@salesforce/schema/Event__c.Event_Description__c';
import EVENT_LOCATION from '@salesforce/schema/Event__c.Event_Location__c';
import EVENT_START from '@salesforce/schema/Event__c.Event_Start__c';
import EVENT_END from '@salesforce/schema/Event__c.Event_End__c';
import EVENT_TYPE from '@salesforce/schema/Event__c.Event_Type__c';

//initialize record fields
const FIELDS = [
	EVENT_NAME,
	EVENT_DESCRIPTION,
	EVENT_LOCATION,
	EVENT_START,
	EVENT_END,
	EVENT_TYPE
];

export default class EventList extends LightningElement {

	//provision event datas stream
	@wire(getAllEvents) events;
	@wire(getRecord, { recordId: '$recordId', fields: FIELDS})
	event;

	//responsive record id
	@api recordId;

	//track updates
	@track getAllEvents;
	@track error;

    addToCalendar(id) {

		//format whitespace for url
		function formatSpace(string) {
			return string.replace(/\s/g,'+');
		}

		//salesforce date to yyyymmddthhmm
		function formatDateGoogle(time) {
			return time.replace(/[-.:]/g,'').slice(0, -4);
		}
		
		//fetch record uid from button 'name' attribute
		this.recordId = id.target.value;

		//initialize url parameter values
		var name = getFieldValue(this.event.data, EVENT_NAME);
		var description = getFieldValue(this.event.data, EVENT_DESCRIPTION);
		var location = getFieldValue(this.event.data, EVENT_LOCATION);
		var start_time = getFieldValue(this.event.data, EVENT_START);
		var end_time = getFieldValue(this.event.data, EVENT_END);
		var type = getFieldValue(this.event.data, EVENT_TYPE);

		//eslint-disable-next-line no-console\
		console.log(start_time);

		//format url parameters values
		name = formatSpace(name);
		description = formatSpace(description);
		start_time = formatDateGoogle(start_time);
		end_time = formatDateGoogle(end_time);

		// eslint-disable-next-line no-console
		console.log(start_time);

		//build calendar link
		var googleRender = "https://www.google.com/calendar/render?action=TEMPLATE";
		var googleLink = googleRender + "&text=" + name + "&dates=" + start_time + '/' + end_time;

		// eslint-disable-next-line no-console
		console.log(googleLink);

		//open google calendar in another window
		window.open(googleLink, "_blank");
	}

	//Track Modals
	@track isRsvpModalOpen = false;
	@track isSubscribeModalOpen = false;

	//Rsvp Modal
	openRsvpModal() {
		//open
		this.isRsvpModalOpen = true;
	}
	closeRsvpModal() {
		//close
		this.isRsvpModalOpen = false;
	}
	submitRsvpDetails() {
		/*Apex*/
		//submit
		this.isRsvpModalOpen = false;
	}

	//Subscribe Modal
	openSubscribeModal() {
		//open
		this.isSubscribeModalOpen = true;
	}
	closeSubscribeModal() {
		//close
		this.isSubscribeModalOpen = false;
	}
	submitSubscribeDetails() {
		/*Apex*/
		//submit
		this.isSubscribeModalOpen = false;
	}
}