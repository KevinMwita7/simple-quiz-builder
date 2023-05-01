const express = require('express');
const router = express.Router();
const { DataTypes } = require('sequelize');
const debug = require('debug')('quizzer:quizzes');
const { v4: uuidv4 } = require('uuid');
const requireAuth = require('../utils/require-auth');
const Quizzes = require('../models/quiz');
const Questions = require('../models/question');
const Answers = require('../models/answer');
const { validateRequest, addQuizValidationSchema } = require('../utils/validation-schemas');
const sequelize = require('../utils/sequalize-connection');
// nanoid does not support commonjs imports. Use dynamic import instead
let nanoid;
import('nanoid').then(m => {
  nanoid = m.nanoid;
}).catch(err => debug(err));

/* GET quizzes listing. */
router.get('/', requireAuth, async function(req, res, next) {
  try {
    let response = await Quizzes.findAll({ where: { userId : req.session.user }, attributes: ['title', 'permalink', 'publishedAt'] });
    return res.json(response);
  } catch(e) {
    debug(e);
    return res.status(500).send('Internal Server Error');
  }
});

/**
 * POST quiz
 */
router.post('/add', requireAuth, validateRequest(addQuizValidationSchema), async function(req, res, next) {
  try {
    const quiz = { 
      id: uuidv4(),
      userId: req.session.user,
      title: req.body.title, 
      permalink: nanoid(6), 
      publishedAt: new Date() 
    };
    
    const questions = req.body.questions.map((question, index) => {
      return {
        id: uuidv4(),
        quizId: quiz.id,
        title: question.title,
        order: index,
        correctAnswers: question.answers.map((answer, index) => {
          if(answer.status === '1') {
            return index
          };
        }).filter(idx => idx != undefined).join(',')
      }
    });
    
    const answers = req.body.questions.map((question, questionIndex) => {
      return question.answers.map((answer, answerIndex) => {
          return {
            id: uuidv4(),
            questionId: questions[questionIndex].id,
            order: answerIndex,
            value: answer.value.trim(),
            correct: answer.status
          }
      })
    }).reduce((final, ans) => final.concat(...ans), []);

    await sequelize.transaction(async t => {
      await Quizzes.create(quiz, { transaction: t }) ;
      await Questions.bulkCreate(questions, { transaction: t });
      await Answers.bulkCreate(answers, { transaction: t });
    })

    return res.send(`http://localhost:3000/quizzes/${quiz.permalink}`);
  } catch(e) {
    console.log(e);
    return res.status(500).send('Internal server error');
  }
})

/**
 * GET single quiz
 */

router.get('/:quizId', async function(req, res, next) {
  try {
    const result = await Quizzes.findOne({ 
      where: { permalink: req.params.quizId },
      attributes: ['title'],
      include: {
        model: Questions,
        attributes: ['title', 'correctAnswers'],
        include: {
          model: Answers,
          attributes: ['value', 'correct']
        }
      }
    });
    return res.json(result || {});
  } catch(e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
})

router.delete('/:quizId', async function(req, res, next) {
  try {
    await Quizzes.destroy({ 
      where: {
        permalink: req.params.quizId,
        userId: req.session.user,
      }
    })
    return res.send('OK');    
  } catch(e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
