const express = require('express');
const router = express.Router();
const { dbConnection } = require('../db_connection/dbConnection');

let pageSize = 3;
router.post('/pagination', (req, res) =>{
	try{
		console.log(req.body.pageSize);
		pageSize += req.body.pageSize;
		console.log(pageSize);
		res.status(200).json({data: req.body});
	}
	catch(err){
		console.log('Error: ', err);
	}
	
})

router.get('/home', (req, res)=>{
    const page = 1;
    let a = false;
    try{
		if(a == true){
			res.redirect('/login');
		}
		else{
			const db = dbConnection;
			const offSet = (page - 1) * pageSize;
			db.promise().query('SELECT * FROM announcements LIMIT ?, ?;', [offSet, pageSize])
			.then(([results, fields]) => {
				res.status(200).render('home', {data: results, pageSize: pageSize});
			})
			.catch(error => res.status(500).json({errorMsg: `Shit happens ${error}`}));
		}
	} 
	catch{
		return res.status(500).json({message: 'Something went wrong'}); 
	}
});
router.get('/profile', (req, res)=>{
    res.status(200).render('profile', {page: 'profile'});
});
module.exports = router;