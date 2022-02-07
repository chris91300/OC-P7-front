

const getDate = (completedDate)=>{
    let [ usDate, time ] =  completedDate.split("T");
    let [ year, month, day ] = usDate.split("-");
    let date = `${day}-${month}-${year}`;
    let [hours, millisecond] = time.split(".");


    return [ date, hours ];
}


export default getDate;