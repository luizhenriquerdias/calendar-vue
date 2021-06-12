import moment from 'moment';

export const formatDate = (date, format = 'DD/MM/YYYY') => moment(date).format(format);

export const isWeekend = date => moment(date).day() === 0 || moment(date).day() === 6;
