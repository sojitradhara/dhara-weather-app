const request = require('request')

const forcast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/042c97b96f92b3395fdf16335064c4bf/'+latitude+','+longitude

    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect, network problem',undefined)
        }
        else if(body.error)
        {
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary+'It is currantly '+body.currently.temperature)
        }
    })

}

module.exports = forcast