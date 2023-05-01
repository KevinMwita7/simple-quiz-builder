const Joi = require('joi');
const debug = require('debug')('quizzer:validation-schemas');

/**
 * Sign Up POST validator
 */
const signUpValidationSchema = Joi.object({
    password: Joi.string().trim().required().min(8),
    email: Joi.string().trim().required().email()
});


/**
 * Sign In POST validator
 */
 const signInValidationSchema = Joi.object({
    password: Joi.string().trim().required().min(8),
    email: Joi.string().trim().required().email()
});

/**
 * Add quiz POST validator
 */
const addQuizValidationSchema = Joi.object({
    title: Joi.string().trim().required(),
    questions: Joi.array().items(
        Joi.object({
            title: Joi.string().trim().required(),
            answers: Joi.array().items(
                Joi.object({
                    status: Joi.string().trim().required().valid('0', '1'),
                    value: Joi.string().trim().required()
                })
            )
            .required()
            .min(2)
            .custom((value, helpers) => {
                let correctAnswers = value.filter(answer => answer && answer.status === "1").length;
                // 1 or more correct answers have been provided
                if(!!correctAnswers) {
                    return true;
                }
                return helpers.message('Must have at least one correct answer');
            })
        })
    ).required().min(1)
})


// Validator middleware
function validateRequest(schema) {
    return async function(req, res, next) {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            return next();
        } catch(err) {
            debug(err);
            return res.status(400).json(err);
        }
    }
} 

module.exports = {
    signUpValidationSchema,
    signInValidationSchema,
    addQuizValidationSchema,
    validateRequest
}