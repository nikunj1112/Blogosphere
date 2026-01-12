import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


export const sendOtpEmail = async (email, otp) => {

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            html:`
                <div style="background-color:#FFEDFA;  padding:20px; font-family:Arial, sans-serif;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center">

                                <!-- CARD -->
                                <table width="600" border="0" cellspacing="0" cellpadding="0"
                                    style="background:white; border-radius:10px; border:1px solid #FFB8E0;">

                                    <!-- HEADER -->
                                    <tr>
                                        <td style="background:#EC7FA9; padding:20px; text-align:center;">
                                            <h1 style="color:white; margin:0; font-size:24px; font-weight:600;">Blog OTP Verification</h1>
                                        </td>
                                    </tr>

                                    <!-- BODY -->
                                    <tr>
                                        <td style="padding:30px;">
                                            <h2 style="color:#BE5985; margin:0 0 10px 0;">Hello 👋</h2>
                                            <p style="color:#444; font-size:15px; line-height:22px; margin:0;">
                                                Thank you for using our Blog Platform.<br>
                                                    Below is your OTP verification code:
                                            </p>

                                            <!-- OTP BOX -->
                                            <div style="text-align:center; margin:30px 0;">
                                                <span
                                                    style="background:#FFB8E0; color:#BE5985; border:2px solid #EC7FA9; padding:15px 25px; display:inline-block; border-radius:8px; font-size:32px; font-weight:bold; letter-spacing:6px;">
                                                    ${otp}
                                                </span>
                                            </div>

                                            <p style="margin:0; font-size:14px; color:#666; line-height:22px;">
                                                ⏳ This OTP is valid for <b>3 minutes</b>.<br>
                                                    ❗ Do not share this code with anyone for security reasons.
                                            </p>

                                            <!-- BUTTON -->
                                            <div>
                                                <a href="#" style="display:inline-block; margin-top:28px; padding:13px 30px; 
                    background:linear-gradient(135deg,#EC7FA9,#BE5985);
                    color:white; text-decoration:none; font-size:15px; font-weight:600;
                    border-radius:8px; box-shadow:0 3px 10px rgba(190,89,133,0.3);">
                                                    Verify Account
                                                </a>
                                            </div>

                                            <p style="margin-top:28px; color:#555; font-size:15px;">
                                                Regards,<br>
                                                    <b style="color:#BE5985;">Blog Team</b>
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- FOOTER -->
                                    <tr>
                                        <td style="background:#FFB8E0; padding:12px; text-align:center; font-size:12px; color:#BE5985;">
                                            Need help? Contact <a href="#" style="color:#BE5985; text-decoration:none;">support@blog.com</a><br>
                                                &copy; ${new Date().getFullYear()} Blog App — All rights reserved.
                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>
                </div>
                `,
        });

    }
    catch (error) {
        console.error('Error sending OTP email:', error);
    }

}

