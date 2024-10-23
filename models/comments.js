const{Schema,model}=require('mongoose')


const CommentSchema=new Schema({
    content:{
        type:String,
        require:true,
    },

    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
},{timestamps:true})


const Comments=model('comments',CommentSchema)

module.exports=Comments;