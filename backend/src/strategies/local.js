const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/models/user')
const { hashPassword, comparePassword } = require('../utils/helper')



passport.serializeUser((user, done) => {
    console.log('Serializing User....', user.id)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing User....')
    try{
        const user = await User.findById(id)
        if(!user) throw new Error('User not found')
        done(null, user)
    }catch(err){
        console.log(err)
        done(err, null)
    }
})


passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done)=> {
            try{
                if(!email || !password) console.log('Missing Credentials')

                const searchUser = await User.findOne({ email })
                if(!searchUser) console.log('User not found')

                const isValid = comparePassword(password, searchUser.password)
                if(isValid) {
                    console.log('Authenticated Sucessfully')
                    done(null, searchUser)
                }else{
                    console.log('Authentication Failure')
                    done(null, null)
                }
            }catch(err){
                console.log(err)
                done(err, null)
            }
        }
    )
)


