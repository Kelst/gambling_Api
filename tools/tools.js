function getDate(){
    let res="";
    const date=new Date();
    const year=date.getFullYear();
    const month=date.getMonth()<10?"0"+date.getMonth()+1:date.getMonth()+1;
    const day=date.getDate();
    return `${day}:${month}:${year}`


}
module.exports=getDate;