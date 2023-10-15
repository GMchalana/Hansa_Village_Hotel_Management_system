const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express()
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());



const db =mysql.createConnection({
    host: "localhost",
    user:'root',
    password:'',
    database:'hansavillagehotel'
})

app.get('/',(re,res)=>{
    return res.json("this is Back");
})

app.get('/signup',(req,res)=>{
    const sql = "SELECT * FROM signup";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/inventoty_details',(req,res)=>{
    const sql = "SELECT * FROM inventoty_details";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/meal_order',(req,res)=>{
    const sql = "SELECT * FROM meal_order";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


//For post method
app.post('/hansavillagehotel/signup',(req,res)=>{
    const sql = "INSERT INTO signup (Full_Name, User_Name, Mobile_Number, Address, Password) VALUES (?)";
    const Values=[
        req.body.full_name,
        req.body.user_name,
        req.body.mobile_number,
        req.body.address,
        req.body.password,
    ];

    
    db.query(sql,[Values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})



app.post('/hansavillagehotel/add_meals',(req,res)=>{
    const sql1 = "INSERT INTO add_meals (Meal_Id, Name, Size, Price, Image) VALUES (?)";
    const Values=[
        req.body.meal_id,
        req.body.meal_name,
        req.body.size,
        req.body.price,
        req.body.add_image,
    ];

    
    db.query(sql1,[Values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})



app.post('/hansavillagehotel/inventoty_details',(req,res)=>{
    const sql2 = "INSERT INTO inventoty_details (Supplier_Name, Supplier_Id, Product_ID , Product_Name, Product_Category, Available_Quentity, Date_of_Purchase, Purchase_Price, Lead_Time, Supplier_Contact_Number) VALUES (?)";
    const Values=[
        req.body.supplier_name,
        req.body.supplier_id,
        req.body.product_id,
        req.body.product_name,
        req.body.product_category,
        req.body.available_quantity,
        req.body.date_of_purchase,
        req.body.purchase_price,
        req.body.lead_time,
        req.body.sup_con_number,
    ];

    
    db.query(sql2,[Values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})




app.post('/hansavillagehotel/add_room',(req,res)=>{
    const sql2 = "INSERT INTO add_room (Room_Id, Charge_per_Day, Type , Image) VALUES (?)";
    const Values=[
        req.body.room_id,
        req.body.charge,
        req.body.type,
        req.body.add_image,
    ];
    db.query(sql2,[Values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})



app.post('/hansavillagehotel/meal_order',(req,res)=>{
    const sql2 = "INSERT INTO meal_order (Selected_Item, Order_Type, Requiered_Time , Table_Number) VALUES (?)";
    const Values=[
        req.body.selected_item,
        req.body.order_type,
        req.body.required_time,
        req.body.table_number,
    ];
    db.query(sql2,[Values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.post('/hansavillagehotel/room_booking',(req,res)=>{
    const sql2 = "INSERT INTO room_booking (Num_of_Guests, Room_Number, Arrival_Date_Time, Duration ) VALUES (?)";
    const Values=[
        req.body.number_of_guest,
        req.body.room_number,
        req.body.date_and_time,
        req.body.duration,
    ];
    db.query(sql2,[Values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})





app.post('/hansavillagehotel', (req,res)=>{
    const sql1="SELECT * FROM signup WHERE User_Name=? AND Password=?";
    

    db.query(sql1,[req.body.User_Name, req.body.password],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            const user_type = data[0].user_type;
            if(user_type==='owner'){
                return res.json("owner");
            }else if(user_type==='kitchen manager'){
                return res.json("kitchen_manager");
            }else if(user_type==='inventory manager'){
                return res.json("inventory_manager")
            }else if(user_type==='reservation manager'){
                return res.json("reservation_manager")
            }else{
                return res.json("customer")
            }
            //return res.json("Success");
        }else{
            return res.json("Fail");
        }
    })
})






/*app.post('/inventoty_details', (req, res) => {
    const { itemId, quantityToReduce } = req.body;
  
    // Assuming you have a table named `inventory_details`.
    const sql = `UPDATE inventoty_details SET Available_Quentity = Available_Quentity - ? WHERE Product_ID = ?`;
  
    db.query(sql, [quantityToReduce, itemId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating inventory' });
      } else {
        res.json({ message: 'Inventory updated successfully' });
      }
    });
  });*/



  app.post('/inventoty_details/get', (req, res) => {
    const { product_id, reducing_inventory, /* other fields */ } = req.body;
  
    // Perform the database update operation here
    // Example with MySQL:
    const sql = 'UPDATE  inventoty_details SET Available_Quentity =(Available_Quentity-?) WHERE Product_ID  = ?';
    const values = [reducing_inventory, product_id, /* other values */, /* id */];
  
    db.query(sql, values, (error, result) => {
      if (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Database update error' });
      } else {
        res.json({ message: 'Data updated successfully' });
      }
    });
  });






  



app.listen(8080,()=>{
    console.log("listening");
})