if(process.env.NODE_ENV === 'prodution'){

module.exports = {mongoURI : 'mongodb://vaibhav1224:Sad1234$@ds141657.mlab.com:41657/vidjot-prod'}

}
else{

    module.exports = {mongoURI : 'mongodb://localhost/vidjot-dev'}
}