const express = require("express")
const { register, login, editProfile } = require("../Controllers/userControls")
const upload = require("../middlewares/multermiddleware")
const { addProject, getHomeProjects, allProjects, getUserPojects, editProject, deleteProject } = require("../Controllers/projectControls")
const { jwtMiddleware } = require("../middlewares/jwtMiddleware")




const router = new express.Router()

// register
router.post("/user/register",register)

// login
router.post("/user/login",login)

// addproject                               key of file in bodyData

router.post('/user/add-project',jwtMiddleware,upload.single("coverImg"),addProject)


// get all projects 

router.get('/home-projects',getHomeProjects) 

// get projects for 3 projects

router.get('/all-projects',allProjects)

// user projects

router.get('/user-projects',jwtMiddleware,getUserPojects)


// edit project

router.put('/user/:_id/edit-project',jwtMiddleware,upload.single("coverImg"),editProject)

// delete project

router.delete('/user/delete-project/:_id',jwtMiddleware,deleteProject)


                                                                                   

// Edit profile

router.put('/user/:_id/edit-profile',jwtMiddleware,upload.single("profile"),editProfile)




module.exports=router