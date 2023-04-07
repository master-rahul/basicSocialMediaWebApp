const queue = require('../config/kue');

const commentsMailer = require('../mailer/comment_mailer');

queue.process('comment_emails', function(job, done) {
    console.log('Emails Worker is Processing a Job', job.data);
    commentsMailer.newComment(job.data);
    done();
})