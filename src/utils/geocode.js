const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGhhcmFzb2ppdHJhIiwiYSI6ImNqejg4aTk1cjAxOG8zYnA3bGV3OWlqbDAifQ.9IK4p_IT-xQocI9KoKWNuQ'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services!',undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find location. Try another search.',undefined)
        }
        else{
           callback(undefined,{
               latitude: body.features[0].center[1],
               longitude:body.features[0].center[0],
               location: body.features[0].place_name
            })   
        }
    })
}

module.exports = geocode