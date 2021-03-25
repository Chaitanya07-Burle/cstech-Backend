Query-1 how to Sql server Database table migrate with MongoDB Database 
A. Click on the SQL Migration button in the toolbar, or right-click into a server, database or collection in the Connection Tree and select the SQL Migration option.
Then select SQL → MongoDB Migration. This will open a new tab where you can configure and execute the import.

Query-2 How to take a Backup and Restore of MongoDB Database
A. For Restore:
mongorestore --host=mongodb1.example.net --port=3017 --username=user  --authenticationDatabase=admin /opt/backup/mongodump-2013-10-24
For Backup:
mongodump --host=mongodb1.example.net --port=3017 --username=user --password="pass" --out=/opt/backup/mongodump-2013-10-24

Query-3 get below data by using join from three document
_id/First Name/Last Name/Phone/Email/Gender/Age/Designation/CreateDate
A.  db.Employee.aggregate([

    // Join with EmpInfo table
    {
        $lookup:{
            from: "EmpInfo",       // other table name
            localField: "_id",   // name of Employee table field
            foreignField: "user_id", // name of EmpInfo table field
            as: "emp_info"         // alias for EmpInfo table
        }
    },
    {   $unwind:"$emp_info" },     // $unwind used for getting data in object or for one record only

    // Join with EmpContact table
    {
        $lookup:{
            from: "EmpContact", 
            localField: "_id", 
            foreignField: "user_id",
            as: "Emp_Contact"
        }
    },
    {   $unwind:"$Emp_Contact" },

    // define which fields are you want to fetch
    {   
        $project:{
            _id : 1,
            "First Name" : 1,
            "Last Name" : 1,
            CreateDate : 1,
            Phone : "$Emp_Contact.Phone",
            Email : "$Emp_Contact.Email",
            Gender : "$emp_info.Gender",
            Age : "$emp_info.Age",
            Designation : "$emp_info.Designation"
        } 
    }
]);


Query-4 get below data by using join and Union  from 2 document(Employee +EmpContact )and other DailySales 
_id/First Name/Last Name/Phone/Email/CreateDate
A.  db.Employee.aggregate([
   { $project: { user_id: 1, _id: 0 } },
   { $unionWith: { coll: "EmpContact", pipeline: [ { $project: {_id: 1,"First Name":1, "Last Name" : 1, 
   Phone : 1, Email : 1,"CreateDate : 1  } } ]} }
])

Query-5 get below data by using search filter with First Name/Last Name/Email/Designation
_id/First Name/Last Name/Phone/Email/Gender/Age/Designation/CreateDate
A.  db.orders.aggregate([
  {
        $lookup:{
            from: "EmpInfo",  
            localField: "_id",  
            foreignField: "user_id", 
            as: "emp_info"       
        }
    },
    {   $unwind:"$emp_info" },  
    {
        $lookup:{
            from: "EmpContact", 
            localField: "_id", 
            foreignField: "user_id",
            as: "Emp_Contact"
        }
    },
    {   $unwind:"$Emp_Contact" },
    { $match: {"First Name":"Chaitanya","Last Name":"Burle","Emp_Contact.$.Email":"xyz@gmail.com",
  "emp_info.$.Designation":"Developer"} },
  {
    $project: {
      _id : 1,
      "First Name" : 1,
      "Last Name" : 1,
       CreateDate : 1,
       Phone : "$Emp_Contact.Phone",
       Email : "$Emp_Contact.Email",
        Gender : "$emp_info.Gender",
        Age : "$emp_info.Age",
        Designation : "$emp_info.Designation"
    }
  }
]);

Query-6 Write query for insert multiple record in single execution in  Employee /EmpContact /EmpInfo  document
A.   
db.Employee.insertMany([]);

Query-7 Write query for Delete multiple record in single execution with multiple ID from Employee /EmpContact /EmpInfo  document
A.  db.Employee.deleteMany([]);


Query-8 How to define indexing and sorting in document
A.  For Sorting::
    db.Employee.find().sort({"_id":-1})
    For Indexing::
    db.Employee.createIndex({"First Name":1,"Last Name":1})

Query-9 Write a query for total registration in week and display counts daily wise
A.    db.Employee.aggregate(
   [
     {$group: { _id : {
    week:{$week:"$CreateDate"}
    },
    count:{$sum: 1 }
  }
},
{
       $project:
         {
             "_id":0,
             "Count":"$count"
         }
}
   ]
)

Query-10 How to Use Cursor in MongoDB
A.  The Cursor is a MongoDB Collection of the document which is returned upon the find method execution.

By default, it is automatically executed as a loop. However, we can explicitly get specific index document from being returned cursor. It is just like a pointer which is pointing upon a specific index value.
Ex:  cursor.count()

Query-11 Find the First Document in a Collection and Count Documents in a Collection
A. 
Finding First Document::
db.Employee.findOne().sort({"_id":1}).limit(1)
For Count of documents in Collection::
db.Employee.count()

