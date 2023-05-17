const Job = require('../database/models/job')
const {Router} = require('express')
const router = Router()


router.get('/', async (req, res) => {
    try {
        const result = await Job.find().sort({createdAt: -1})
        if (req.user) {
            res.send({paylod: result, display: true})
        } else {
            res.send({message: "Successfully retrieved all jobs", payload: result, display: false, status_code: 200})
        }
    } catch (err) {
        res.send({message: err, status_code: 400})
    }
})


// ADD
router.post('/add', async (req, res) => {
    const newJobPost = new Job(req.body)
    try {
        const result = await newJobPost.save()
        /*res.redirect('/jobs')*/
        res.send({message: 'Job saved successfully', payload: result, status_code: 201})
    } catch (err) {
        res.send({message: err, status_code: 400})
    }
})


// DETAIL
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await Job.findById(id)
    try {
        if (req.user) {
            res.send({message: "Successfully retrieved", payload: result, status_code: 201, display: true})
        } else {
            res.send({message: "Successfully retrieved", payload: result, status_code: 201, display: false})
        }
    } catch (err) {
        res.send({message: err, status_code: 400})
    }
})

// DELETE
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    Job.findByIdAndDelete(id).then((result) => {
        res.send({
            message: 'Job deleted successfully',
            status_code : 201,
        })
    }).catch(err => {
        res.send({
            message : err,
            status_code : 400
        }
        )
    })
})

// EDIT
router.get('/:id/edit', async (req, res) => {
    const id = req.params.id
    const result = await Job.findById(id)
    try {
        res.send({
            message : 'Retrieved successfully',
            payload : result,
            status_code : 200
        })
    } catch (err) {
        res.send({
            message : 'Failed to retrieve',
            payload : err,
        })
    }
})

router.put('/:id/edit', async (req, res) => {
    const id = req.params.id
    const updateJob = {
        ...req.body
    };
    delete updateJob._id;

    try {
        await Job.findByIdAndUpdate(id, updateJob)
        res.send({
            message: 'Job updated successfully',
            status_code : 201,
        })
    } catch (err) {
        console.log(err)
    }
})



module.exports = router
