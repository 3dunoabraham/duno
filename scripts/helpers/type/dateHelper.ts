export const zeroPad = (value, length)=>{
    return `${value}`.padStart(length, '0');
}
const THE_DATE_NOW = new Date()
export const tenYearsAgoDateString = (
    `${THE_DATE_NOW.getUTCFullYear()-10}`+
    `-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
)
export const tenYearsFutureDateString = (
    `${THE_DATE_NOW.getUTCFullYear()+10}`+
    `-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
)

export const parseUTCString = (_theDate)=>{
    let theDate = new Date(_theDate.toUTCString())
    return (
        `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-`+
        `${zeroPad(theDate.getUTCDate(),2)}`+
        `T`+
        `${zeroPad(theDate.getUTCHours(),2)}:${zeroPad(theDate.getUTCMinutes(),2)}`
    )
}
export const parseUTCDateString = (_theDate)=>{
    let theDate = new Date(_theDate.toUTCString())
    return (
        `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-`+
        `${zeroPad(theDate.getUTCDate(),2)}`
    )
}
export function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd;
    return time;
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
    return time;
}