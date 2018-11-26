//Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/items', { useNewUrlParser: true });
var Item = require('./models/item');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('./public'));

// var admin = require('firebase-admin');

// var serviceAccount = require('./firebase/se3316-lab5-auth-firebase-adminsdk-h9mgr-f7f01fbb2c.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://se3316-lab5-auth.firebaseio.com"
// });

// var defaultApp = admin.initializeApp(defaultAppConfig);

// console.log(defaultApp.name);

var port = process.env.Port || 8081;

var router = express.Router();
//Middleware can be used for authentication
router.use(function(req,res,next){
    
    next();
});

//Test
router.get('/', function(req, res){
res.json({message: 'Success'});
});

//More routes
app.use('/api', router);

router.route('/items')
    .post(function(req, res){
        var item = new Item();
        item.name = req.body.name;
      
        
        if(req.body.price != ''){
            item.price = req.body.price;
        }
        else{
            console.log("Price is mandatory");
            return;
        }
        if(req.body.tax != ''){
        item.tax = req.body.tax;
        }
        else{
            item.tax=0;
        }
        if(req.body.quantity != ''){
            item.quantity=req.body.quantity;
        }
        else{
            item.quantity=0;
        }
        if(req.body.itemsSold== ''){
            item.itemsSold=0;
        }
        else{
            item.itemsSold=req.body.itemsSold;
        }
        item.descript=req.body.descript
        
        item.save(function(err){
            if(err){
                res.send(err);
            }
            
            res.json({message: 'Item created'});
                
        });
    })
    .get(function(req,res){
        Item.find(function(err, items){
            if(err){
                res.send(err);
            }
            res.json(items);
            
        });
    });
    
router.route('/items/:item_id')
    .get(function(req,res){
        Item.findById(req.params.item_id, function(err,item){
            if(err){
                res.send(err);
            }
            res.json(item);
        });
    })
    .put(function(req,res){
        Item.findById(req.params.item_id, function(err,item){
            if(err){
                res.send(err);
            }
            if(req.body.quantity != undefined){
            item.quantity = req.body.quantity;
            }
            if(req.body.tax != undefined){
                item.tax = req.body.tax;
            }
            
            item.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message: 'Item updated'});
            });
        });
        
    })
    .delete(function(req,res){
        Item.deleteOne({
            _id: req.params.item_id
        }, function(err, item){
            if(err){
                res.send(err);
            }
            res.json({message: 'Sucessfully deleted'});
            
        
        });
    });
router.route('/items/comment/:item_id')
.put(function(req,res){
        Item.findById(req.params.item_id, function(err,item){
            if(err){
                res.send(err);
            }
            if(req.body.comment != undefined){
            item.comments.push(req.body.comment);
            item.hidden.push(false);
            }
            if(req.body.rating != undefined){
            item.ratings.push(req.body.rating);
            }
            if(req.body.user != undefined){
            item.users.push(req.body.user);
            }
            
            item.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message: 'Item updated'});
            });
        });
        
    })
    
    
    router.route('/items/comment/hide/:item_id')
    .put(function(req,res){
        Item.findById(req.params.item_id, function(err,item){
            if(err){
                res.send(err);
            }
            item.hidden.splice(req.body.index,1,true);
            
            item.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message: 'Item updated'});
            });
        });
    });
  
    
    router.route('/items/comment/unhide/:item_id')
        .put(function(req,res){
        Item.findById(req.params.item_id, function(err,item){
            if(err){
                res.send(err);
            }
            item.hidden.splice(req.body.index,1,false);
            
            item.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message: 'Item updated'});
            });
        });
        });
        router.route('/items/comment/delete/:item_id')
        
        .put(function(req,res){
        Item.findById(req.params.item_id, function(err,item){
            if(err){
                res.send(err);
            }
            item.comments.splice(req.body.index,1);
            item.users.splice(req.body.index,1);
            item.ratings.splice(req.body.index,1);
            item.hidden.splice(req.body.index,1);
            
            item.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message: 'Item updated'});
            });
        });
    });
    
    router.route('/items/cart/:item_id')
.put(function(req,res){
        Item.findById(req.params.item_id, function(err,item){
            if(err){
                res.send(err);
            }
            if(req.body.quantity != undefined){
            item.quantity = item.quantity+req.body.quantity;
            }
            item.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message: 'Item updated'});
            });
        });
        
    })
router.route('/items/cartBuy/buy')
.put((req,res)=>{
    
    for(var i =0; i<req.body.cart.length; i++){
        Item.findByIdAndUpdate(req.body.cart[i]._id, { itemsSold: req.body.cart[i].itemsSold }, function(err,item){
            if(err){
                res.send(err);
            }
            item.save(function(err){
                if(err){
                    res.send(err);
                }
                
            });
        });
        // Item.findById(req.body.cart[i]._id,(err,item)=>{
        //     if(err){
        //         res.send(err);
        //     }
        //     item.itemsSold+=req.body.cart[i].quantity;
            
        //     item.save(function(err){
        //         if(err){
        //             res.send(err);
        //         }
        //         res.json({message: 'Item updated'});
        //     });
        // });
        // var item=Item.findById(req.body[i]._id);
        // item.itemsSold+=req.body[i].quantity;
        // item.save(function(err){
        //         if(err){
        //             res.send(err);
        //         }
        //         res.json({message: 'Item updated'});
        //     });
    // }
    }
    res.json({message: 'Items updated'});
        
    })

//Start server
app.listen(port);



