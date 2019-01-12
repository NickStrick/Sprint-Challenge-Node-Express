module.exports = (req, res, next) => {
    let wordArr = req.body.name.split(' ');
    let result = '';
    for (let i = 0; i<wordArr.length; i++){
        let curr = wordArr[i];
        let arr = curr.split('');
        arr[0] = arr[0].toUpperCase();
        result += arr.join('');
        if(i< wordArr.length-1){
            result += ' ';
        }
    }
    req.body.name = result;
    next();
}