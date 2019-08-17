
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

console.log(path.join(__dirname,'../public'))
const app = express()

//define paths foe express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlers engine
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name:'Dhara Sojitra'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name: 'Dhara Sojitra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help page',
        name: 'dhara sojitra'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'you must provide an address!'
        });
    }

    geocode(req.query.address,(error,{latitude,longitude, location}={})=>{
        if(error)
        {
            return res.send({error})
        }

        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forcast:'it is snowing',
    //     location:'rajkot',
    //     address:req.query.address
    // })
})

app.get('/products',()=>{
    
    res.send({
        products:[]
    })
} )

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'dhara sojitra',
        errorMessage:'Help artical not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'dhara sojitra',
        errorMessage: 'page not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000.')
})