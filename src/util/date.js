import moment from 'moment';

export const formatDate = (date, format = 'DD/MM/YYYY') => moment(date || moment()).format(format);

export const isWeekend = date => moment(date || moment()).day() === 0 || moment(date).day() === 6;
