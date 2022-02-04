

const getDate = (completedDate)=>{
    let [ usDate, other ] =  completedDate.split("T");
    let [ year, month, day ] = usDate.split("-");
    let date = `${day}-${month}-${year}`;

    return date;
}


export default getDate;