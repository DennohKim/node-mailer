import nodemailer from 'nodemailer';
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  import.meta.env.VITE_CLIENT_ID,
  import.meta.env.VITE_CLIENT_SECRET,
  import.meta.env.VITE_REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: import.meta.env.VITE_REFRESH_TOKEN,
});


const Email = async (options) => {
     const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: import.meta.env.VITE_USER,
        clientId: import.meta.env.VITE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
        refreshToken: import.meta.env.VITE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    transporter.sendMail(options,  (err, info) => {
        if(err) {
            console.log(err);
            return;
        }
    })
}

// send email
const EmailSender = ({ fullName, email, message }) => {
  const options = {
    from: `LumenPay.Finance <${import.meta.env.VITE_USER}>`,
    to: "kimathidennis38@gmail.com",
    subject: "Message From LumenPay",
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #00efbc; padding: 20px 0">
          <a href="https://www.lumenpay.finance/" ><img
              src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1679082435/bg/Group_20897_njzyhn.svg"
              style="width: 100%; height: 70px; object-fit: contain"
            /></a> 
          
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              LumenPay.Finance
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>FullName: <b>${fullName}</b></p>
              <p>Email: <b>${email}</b></p>
              <p>Message: <i>${message}</i></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };

  Email(options)
};

export default EmailSender