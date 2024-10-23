require('dotenv').config();
const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const multer=require('multer')
const userRoutes=require('./routes/user')
const blogRoutes=require('./routes/blog')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const Blog=require('./models/blog')


const app=express();
const PORT=process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URL).then((e)=> console.log('mongoDB Connected'))


app.set('view engine','ejs')
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))



app.get('/', async(req,res)=>{

    const allBlogs=await Blog.find({})
    res.render('home',{user:req.user,blogs:allBlogs})
})

app.use('/user',userRoutes)
app.use('/blog',blogRoutes)









app.listen(PORT,()=> console.log('Server started'))