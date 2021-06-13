import moment from 'moment';

export default function () {
	return {
		selectedDate: null,
		selectedEventId: null,
		lastCity: null,
		currentMonth: moment().format('YYYY-MM-DD'),
		calendar: [],
		events: {
			'2021-06-13': [
				{
					date: '2021-06-13', reminder: 'aqweasdasd asdas asd asda sasd sqwe', color: 'blue', allDay: true, time: '00:00', city: { id: 4511219, name: 'Ewing' }, id: '6cd1a2cd-6a16-47af7-b054-5ac022a751f0'
				},
				{
					date: '2021-06-13', reminder: 'aqweqwe', color: 'orange', allDay: false, time: '00:00', city: { id: 4511219, name: 'Ewing' }, id: '6cd1a2cd-6a16-47f7-b054-5ac022a751f0'
				}
			]
		},
		weathers: {}
	};
}
