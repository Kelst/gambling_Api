function getDate(){
    let res="";
    const date=new Date();
    const year=date.getFullYear();
    let dat=date.getMonth()+1;
    const month=date.getMonth()<10?"0"+dat:date.getMonth()+1;
    const day=date.getDate();
    return `${day}.${month}.${year} ${date.getHours()}:${date.getMinutes()}`


}
module.exports=getDate;