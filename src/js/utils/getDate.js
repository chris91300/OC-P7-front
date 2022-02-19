
/** 
 * @param {string} completedDate a date
 * @returns {object} an array with the date and the hour of the event
 */
const getDate = (completedDate)=>{

    let date = new Date(completedDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    month = month < 10 ? "0"+parseInt(month) : month;
    day = day < 10 ? "0"+parseInt(day) : day;
    min = min < 10 ? "0"+parseInt(min) : min;
    
    let eventDate = `${day}-${month}-${year}`;
    let eventHour = `${hour}h${min}`;

    return [ eventDate, eventHour ];
}


export default getDate;