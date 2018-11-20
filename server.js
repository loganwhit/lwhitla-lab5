//Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/items', { useNewUrlParser: true });
var Bear = require('./models/item');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('./public'));

var port = process.env.Port || 8080;

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

//Start server
app.listen(port);



