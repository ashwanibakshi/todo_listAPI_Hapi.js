const hapi       = require("@hapi/hapi");
const mongoose   = require("mongoose");
const userModel  = require("./models/userModel");

mongoose.connect("mongodb://localhost:27017/hapidemo")
.then(()=>console.log('connected to db'))
.catch((err)=>console.log('db connection error',err))

let port = process.env.PORT || 3000;

const server = hapi.server({
    port : port,
    host : 'localhost'
});

server.route({
    method:'get',
    path:'/showallitem',
    handler:async (request,h)=>{
       try {
            var dataa = await userModel.findOne();
            return h.response(dataa);
       } catch (error) {
           return h.response(error.message).code(500);
       }
    }
});

server.route({
    method:'post',
    path:'/additem',
    handler: async (request,h)=>{
        try {
            let user  = new userModel({
                item   : request.payload.item,
              createdAt:Date.now()
          });
          var sdata = await user.save();
          return h.response(sdata);
        } catch (error) {
            return h.response(error.message).code(500);
        }
    }
});

server.route({
    method:"get",
    path  :"/edititem/{id}",
    handler: async (request,h)=>{
        try {
            var fdata = await userModel.findOne({"_id":request.params.id})
            return h.response(fdata);
        } catch (error) {
            return h.response(error.message).code(500);
        }
    }
})

server.route({
    method : "put",
    path   : "/updateitem",
    handler: async (request,h)=>{
        try {
            console.log(request.payload)
           var udata = {
               item : request.payload.item,
            updatedAt: Date.now()
           } 
           var dataa = await userModel.findOneAndUpdate({"_id":request.payload.id},{$set:udata},{new:true,select:{item:1}});
           return h.response(dataa);
        } catch (error) {
            return h.response(error.message);
        }
    }
})

server.route({
    method : "delete",
    path   : "/deleteitem/{id}",
    handler: async (request,h)=>{
        try {
            var rdata = await userModel.deleteOne({"_id":request.params.id})
            return h.response(rdata);
        } catch (error) {
            return h.response(error.message);
        }
    }
})

server.start(console.log('serverr run at port '+port));