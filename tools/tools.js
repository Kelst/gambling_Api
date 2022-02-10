function getDate(){
    let res="";
    const date=new Date();
    const year=date.getFullYear();
    const month=date.getMonth();
    const day=date.getDate();
    return `${day}:${month}:${year}`


}
module.exports=getDate;