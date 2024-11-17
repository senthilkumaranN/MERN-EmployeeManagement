const express = require('express')
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware')
const Employee = require("../Model/Employee")
const multer = require('multer');


//image upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    },
})
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png','image.jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Invalid file type, only JPEG, PNG are allowed'), false);
        }
    },
})

//Middleware
router.use(authMiddleware)


//createemployee
router.post('/employee', upload.single('image'), async (req, res) => {
    try {
        const { name, email, MobileNo, designation, Gender, course } = req.body
        const image = req.file ? req.file.path : null;
        const newEmployee = new Employee({
            name,
            email,
            MobileNo,
            designation,
            Gender,
            course,
            image
        })
        await newEmployee.save();

       

        res.status(201).json({
            success: true,
            message: 'Employee added successfully',
            data: newEmployee,
        })
    } catch (error) {
        console.log("error occur", error)
        res.status(500).json({
            success: false,
            message: "server side error"
        })
    }

})

//get all the employee
router.get("/employee", async (req, res) => {
    try {
        const employee = await Employee.find()
        res.json(employee)
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            message: "error fetching"
        })
    }
})
//get employee by id
router.get('/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//update the employee
router.put("/employee/:id", upload.single('image'), async (req, res) => {
    try {
        const { name,
            email,
            MobileNo,
            designation,
            Gender,
            course } = req.body;
        const image = req.file ? req.file.path : null

        const updateData = { name, email, MobileNo, designation, Gender, course }
        if (image) updateData.image = image

        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
      
         
        res.json(updatedEmployee);

    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            message: "update failed"
        })
    }
})

//delete the employee
router.delete("/employee/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id)
        res.json("employee deleted successfully")
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            message: "deleted failed"
        })
    }
})

module.exports = router





