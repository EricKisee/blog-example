const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/', (req, res) => {
	const data = req.context

	const postsCtr = new controllers.post()
	postsCtr.get() // fetch the blog posts
	.then(posts => {
		data['posts'] = posts
		res.render('home', data) // render home.mustache
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/posts', (req, res) => {
	const data = req.context

	const postsCtr = new controllers.post()
	postsCtr.get(req.query)
	.then(posts => {
		data['posts'] = posts
		res.render('home', data) // render home.mustache
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/post/:slug', (req, res) => {
	const data = req.context

	const ctr = new controllers.post()
	ctr.get({slug:req.params.slug})
	.then(posts => {
		if (posts.length == 0){
			throw new Error('Post '+req.params.slug+' not found.')
			return
		}

		const post = posts[0]
		data['post'] = post
		res.render('post', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/fashion', (req,res)=>{
	// const data = req.config
	const data = req.context
	const postCtr = new controllers.post()
	//fetching 
	postCtr.get({category:'fashion'}).then(posts=>{
		data['posts'] = posts
		res.render('home', data) // render home.mustache
	}).catch(error =>{
		res.send('Oops! Something went wrong: '+error.message)
	})

})

router.get('/android',(req,res)=>{
	const data = req.context
	const postCtr = new controllers.post()
	postCtr.get({category:'android'}).then(posts=>{
		data['posts'] = posts
		res.render('home',data)
	}).catch(error=>{
		res.send('Oops! Something when wrong: '+error.message)
	})
})

router.get('/web',(req,res)=>{
	const data = req.context
	const postCtr = new controllers.post()
	postCtr.get({category:'web'}).then(posts=>{
		data['posts'] = posts
		res.render('home',data)
	}).catch(error=>{
		res.send('Oops! Something when wrong: '+error.message)
	})
})

router.get('/about', (req, res) => {
	const data = req.context
	res.render('about', data)
})

router.post('/message',(req,res)=>{
	const formData = req.body
	const messageCtr = new controllers.message()
	messageCtr.post({name:formData['visitor-name'], email:formData['visitor-email'], text:formData['visitor-message']})
	.then(message => {
		//success callback
		res.json({
			confirmation:'success',
			data:message
		})
	}).catch(error =>{
		res.json({
			confirmation:'fail',
			message: error.message
		})
	})
})

module.exports = router
