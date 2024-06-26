const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const http = require('http');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

const db =mysql.createConnection({
    host: "localhost",
    user:'root',
    password:'',
    database:'hansavillagehotel'
})




app.get('/',(re,res)=>{
    return res.json("this is Back");
})




// This is testing add_meal part
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  app.use('/hansavillagehotel/uploads', express.static('uploads'));
  
  // Assuming you have a 'forms' table in your database
  app.post('/submit_form', upload.single('image'), (req, res) => {
    try {
      const { meal_name, size, price } = req.body;
      const imagePath = req.file ? `uploads/${req.file.filename}` : null;
  
      const sql = 'INSERT INTO add_meals (Name, Size, Price, Image) VALUES (?, ?, ?, ?)';
      const values = [meal_name, size, price, imagePath];
  
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.status(200).json({ message: 'Form submitted successfully', imagePath });
      });
    } catch (error) {
      console.error('Error processing form submission:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



//show meal items for the customer
  app.get('/hansavillagehotel/add_meals', (req, res) => {
    const sql='SELECT * FROM add_meals';
    db.query(sql,(err, data)=>{
      if(err) return res.json(err);
      return res.json(data);
    })
  })

  


  //Backend part for uploadding ROOm item
  const storager = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadsr');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });


  const uploadr = multer({ storage: storager });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.use('/hansavillagehotel/uploadsr', express.static('uploadsr'));

  app.post('/submit_formr', uploadr.single('image'), (req, res) => {
    try {
      const { charge, type, category} = req.body;
      const imagePath = req.file ? `uploadsr/${req.file.filename}` : null;
  
      const sql = 'INSERT INTO add_room (Charge_per_Day, Type, Image, Category, Availability) VALUES (?, ?, ?, ?,  "Yes")';
      const values = [charge, type, imagePath, category];
  
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.status(200).json({ message: 'Form submitted successfully', imagePath });
      });
    } catch (error) {
      console.error('Error processing form submission:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




  //Getting Room Item
  app.get('/hansavillagehotel/add_room', (req, res) => {
    const sql='SELECT * FROM add_room';
    db.query(sql,(err, data)=>{
      if(err) return res.json(err);
      return res.json(data);
    })
  })




//customer details
app.get('/signup',(req,res)=>{
    const sql = "SELECT * FROM signup";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})




//inventory details
app.get('/inventoty_details',(req,res)=>{
    const sql = "SELECT * FROM inventoty_details";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})




//This is for the testing data fetch for the orders
app.get('/meals',(req,res)=>{
    
    const sql = "SELECT * FROM add_meals";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})




//hall booking details
app.get('/hall',(req,res)=>{
    
  const sql = "SELECT * FROM hall_booking";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})




//Room booking details
app.get('/room',(req,res)=>{
    
  const sql = "SELECT * FROM room_booking";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})




//meal order details
app.get('/meal_order',(req,res)=>{
    const sql = "SELECT * FROM meal_order";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/hansavillagehotel/hall_status',(req,res)=>{
  const sql = "SELECT * FROM hall_availability";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})





//Meal order invoice part
app.get('/meal_orderinvoice/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const sql = 'SELECT * FROM meal_order WHERE Order_Id = ?';

  db.query(sql, [orderId], (err, data) => {
    if (err) {
      console.error('Error fetching order details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Convert the data to an array of objects
      const orderDetails = [];
      for (const row of data) {
        orderDetails.push({
          Order_Id: row.Order_Id,
          Selected_Item: row.Selected_Item,
          Quantity: row.Quantity,
          Unit_Price: row.Unit_Price,
          Amount: row.Amount,
        });
      }

      res.status(200).json(orderDetails);
    }
  });
});




//Customer sign up
app.post('/hansavillagehotel/signu',(req,res)=>{
  const sql = "INSERT INTO signup (`Full_Name`, `User_Name`, `Mobile_Number`, `Address`, `Password`) VALUES (?)";
  const Values=[
      req.body.full_name,
      req.body.user_name,
      req.body.mobile_number,
      req.body.address,
      req.body.password,
  ];

  
  db.query(sql,[Values],(err,data)=>{
    if (err) {
      console.error("Error:", err); // Log the error for debugging
      return res.status(500).json({ error: "An error occurred" }); // Return an error response with a meaningful message
  }
  return res.status(200).json(data);
    });
});






//Purchase inventory part
  app.post('/update-inventory', (req, res) => {
    const { product_name, quantity, date_of_purchase } = req.body;

    const sql = 'UPDATE  inventoty_details SET Available_Quentity = (Available_Quentity +(?)), Date_of_Purchase=? WHERE Product_Name  = ?';
    const values = [quantity, date_of_purchase, product_name ,/* other values */, /* id */];
  
    db.query(sql, values, (error, result) => {
        if (error) {
          console.error('Error updating data:', error);
          res.status(500).json({ error: 'Database update error' });
        } else {
          res.json({ message: 'Data updated successfully' });
        }
      });
    // Respond with a success message or an error message
    
  });
  
  

  //used inventory part
app.post('/inventoty_details/get', (req, res) => {
     const { product_name, quantity, /* other fields */ } = req.body;
  
     // Perform the database update operation here
     // Example with MySQL:
     const sql = 'UPDATE  inventoty_details SET Available_Quentity =(Available_Quentity-?) WHERE Product_Name  = ?';
     const values = [quantity, product_name, /* other values */, /* id */];
  
     db.query(sql, values, (error, result) => {
       if (error) {
         console.error('Error updating data:', error);
         res.status(500).json({ error: 'Database update error' });
       } else {
         res.json({ message: 'Data updated successfully' });
       }
     });
   });






   app.post('/updateOrderStatus', (req, res) => {
    // Get the meal order ID and new status from the request
    const { orderId} = req.body;
  
    // Update the status in your database (you may need a database connection and SQL query here)
    // Example using a placeholder for the database update:
    db.query("UPDATE meal_order SET Status = 'Completed' WHERE Order_Id = ?", [ orderId], (err, result) => {
    if (err) {
        res.status(500).json({ error: 'Error updating order status' });
       } else {
         res.status(200).json({ message: 'Order status updated successfully' });
      }
     });
  });
  
  // Other middleware and configuration
  
  







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



app.post('/hansavillagehotel/meal_ordercus',async (req, res) => {
    
    const sql2 = "INSERT INTO meal_order (Selected_Item, Quantity, Unit_Price, Amount, Table_Number, Requiered_Time, Order_Type, Full_Name, Customer_Id, Mobile_Number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const amount = req.body.quantity * req.body.unit_price;

    const values = [
        req.body.item,
        req.body.quantity,
        req.body.unit_price,
        amount,
        req.body.table_number,
        req.body.required_time,
        req.body.order_type,
        req.body.customer_name,
        req.body.customer_id,
        req.body.mobile_number,
    ];
    db.query(sql2, values, (err, data) => {

        
        if (err) {
            console.error("Error:", err); // Log the error for debugging
            return res.status(500).json({ error: "An error occurred" }); // Return an error response with a meaningful message
        }
        return res.status(200).json(data); // Return a success response
    });
});



app.post('/hansavillagehotel/room_booking',async (req,res)=>{
    const sql2 = "INSERT INTO room_booking (Num_of_Guests, Room_Number, Arrival_Date_Time, Duration, Customer_Id, Room_Type, Status ) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const Values=[
        req.body.number_of_guest,
        req.body.room_number,
        req.body.date_and_time,
        req.body.duration,
        req.body.customer_id,
        req.body.room_type,
        "Booked",
    ];
    db.query(sql2,Values,(err,data)=>{
        if (err) {
            console.error("Error:", err); // Log the error for debugging
            return res.status(500).json({ error: "An error occurred" }); // Return an error response with a meaningful message
        }
        return res.status(200).json(data); // Return a success response
    });
});


app.post('/updateBookingStatus', (req, res) => {
  // Get the meal order ID and new status from the request

  // Update the status in your database (you may need a database connection and SQL query here)
  // Example using a placeholder for the database update:
  db.query("UPDATE hall_availability SET Availability = 'No' ", (err, result) => {
  if (err) {
      res.status(500).json({ error: 'Error updating order status' });
     } else {
       res.status(200).json({ message: 'book status updated successfully' });
    }
   });
});

app.post('/updateBookingStatusYes', (req, res) => {
  // Get the meal order ID and new status from the request

  // Update the status in your database (you may need a database connection and SQL query here)
  // Example using a placeholder for the database update:
  db.query("UPDATE hall_availability SET Availability = 'Yes' ", (err, result) => {
  if (err) {
      res.status(500).json({ error: 'Error updating order status' });
     } else {
       res.status(200).json({ message: 'book status updated successfully' });
    }
   });
});



app.post('/hansavillagehotel/hall_booking',async (req,res)=>{
    const sql2 = "INSERT INTO hall_booking (Event_Detail, Planning_Date, Num_of_Guests, Customer_Id, Decorations) VALUES (?, ?, ?, ?, ?)";
    
    const values=[
        req.body.details,
        req.body.date_and_time,
        req.body.number_of_guest,
        req.body.customer_id,
        req.body.requirements,
    ];
    db.query(sql2,values,(err,data)=>{
        if (err) {
            console.error("Error:", err); // Log the error for debugging
            return res.status(500).json({ error: "An error occurred" }); // Return an error response with a meaningful message
        }else{}
        return res.status(200).json(data); // Return a success response
    });
});






app.post('/hansavillagehotel', (req,res)=>{
    const sql1="SELECT * FROM signup WHERE User_Name=? AND Password=?";
    

    db.query(sql1,[req.body.User_Name, req.body.password],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            const user_type = data[0].user_type;
            if(user_type==='owner')
            {
              res.json({
                success:true,
                data:{
                  role:"owner",
                  otherDetails:data
                }
              });
                // return res.json("owner");
            }else if(user_type==='kitchen manager')
            {
              res.json({
                success:true,
                data:{
                  role:"kitchen_manager",
                  otherDetails:data
                }
              });
            }
            else if(user_type==='inventory manager')
            {
              res.json({
                success:true,
                data:{
                  role:"inventory_manager",
                  otherDetails:data
                }
              });
            }
            else if(user_type==='reservation manager')
            {
              res.json({
                success:true,
                data:{
                  role:"reservation_manager",
                  otherDetails:data
                }
              });
            }
            else{
              res.json({
                success:true,
                data:{
                  role:"customer",
                  otherDetails:data
                }
              });
                // return res.json("customer")
            }
            //return res.json("Success");
        }else{
            return res.json("Fail");
        }
    })
})






app.get('/generate-pdf', async (req, res) => {
    try {
      // Fetch data from the database
      const [rows] =  db.query('SELECT * FROM inventoty_details'); // Replace with your actual query
  
      // Create a PDF document
      const doc = new PDFDocument();
  
      // Stream the PDF directly to the response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
      doc.pipe(res);
  
      // PDF content
      doc.fontSize(16).text('Sample PDF Report', 100, 100);
      doc.text('This is a sample PDF report generated from Node.js.', 100, 150);
  
      // Include data from the database in the PDF
      rows.forEach((row) => {
        doc.text(`ID: ${row.id}, Name: ${row.name}`, 100, doc.y + 20);
      });
  
      // Finalize the PDF
      doc.end();
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });




app.get('/booking',(req,res)=>{
  const sql = "SELECT * FROM room_booking";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})


app.post('/updateRoomStatus', (req, res) => {
  // Get the meal order ID and new status from the request
  const { orderId} = req.body;

  // Update the status in your database (you may need a database connection and SQL query here)
  // Example using a placeholder for the database update:
  db.query("UPDATE add_room SET Availability = 'No' WHERE Room_Id = ?", [ orderId], (err, result) => {
  if (err) {
      res.status(500).json({ error: 'Error updating order status' });
     } else {
       res.status(200).json({ message: 'Order status updated successfully' });
    }
   });
});

app.post('/updateRoomStatusYes', (req, res) => {
  // Get the meal order ID and new status from the request
  const { orderId} = req.body;

  // Update the status in your database (you may need a database connection and SQL query here)
  // Example using a placeholder for the database update:
  db.query("UPDATE add_room SET Availability = 'Yes' WHERE Room_Id = ?", [ orderId], (err, result) => {
  if (err) {
      res.status(500).json({ error: 'Error updating order status' });
     } else {
       res.status(200).json({ message: 'Order status updated successfully' });
    }
   });
});


app.post('/updateRoomStatus2', (req, res) => {
  // Get the meal order ID and new status from the request
  const { orderId} = req.body;

  // Update the status in your database (you may need a database connection and SQL query here)
  // Example using a placeholder for the database update:
  db.query("UPDATE room_booking SET Status = 'Book Closed' WHERE Book_Id = ?", [ orderId], (err, result) => {
  if (err) {
      res.status(500).json({ error: 'Error updating order status' });
     } else {
       res.status(200).json({ message: 'Order status updated successfully' });
    }
   });
});







// In your backend route or controller
app.get('/get-product-names', async (req, res) => {
  try {
    // Fetch product names from the database
    const productNames = await ProductModel.find({}, 'Product_Name');
    const names = productNames.map(product => product.Product_Name);
    res.json({ success: true, data: names });
  } catch (error) {
    console.error('Error fetching product names:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});





app.post('/hansavillagehotel/addinventory',(req,res)=>{
  const sql = "INSERT INTO inventoty_details (Product_Name, Product_Category, Supplier_Name, Supplier_Id, Purchase_Price, Lead_Time, Supplier_Contact_Number) VALUES (?)";
  const Values=[
      req.body.product_name,
      req.body.product_category,
      req.body.supplier_name,
      req.body.supplier_id,
      req.body.purchase_price,
      req.body.lead_time,
      req.body.sup_con,
  ];

  
  db.query(sql,[Values],(err,data)=>{
    if (err) {
      console.error("Error:", err); // Log the error for debugging
      return res.status(500).json({ error: "An error occurred" }); // Return an error response with a meaningful message
  }
  return res.status(200).json(data);
    });
});





app.listen(8080,()=>{
    console.log("listening");
});