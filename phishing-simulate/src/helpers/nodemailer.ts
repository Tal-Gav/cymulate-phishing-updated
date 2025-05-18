import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'talgav23@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD, // set this in your .env
  },
});
