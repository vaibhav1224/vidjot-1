if(process.env.NODE_ENV === 'production'){

module.exports = {mongoURI : 'mongodb://vaibhav1224:123456@ds141657.mlab.com:41657/vidjot-prod'}

}
else{

    module.exports = {mongoURI : 'mongodb://localhost/vidjot-dev'}
}