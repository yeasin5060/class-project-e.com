

export function varification (link){
    
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Email Verification - Tech Nest</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        a {
            text-decoration: none;
            color: #181818;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #fff;
            max-width: 600px;
            margin: 20px auto;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #555;
            line-height: 1.6;
            font-size: 16px;
        }
        .btn-container {
            text-align: center;
            margin-top: 30px;
        }
        .btn {
            background-color: #007bff;
            color: #181818;
            padding: 10px 20px;
            text-decoration: none;
            font-size: 18px;
            border-radius: 5px;
            display: inline-block;
        }
        .btn:hover {
            background-color: #0056b3;
            color: #fff;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #888;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>Plase verifify your mail</h1>
        <p>
            Thank you for registering at Furniro, your ultimate tech shopping
            destination! We're excited to have you on board. To complete your
            registration, please verify your email address by clicking the button
            below:
        </p>
        <div class="btn-container">
            <a href="${process.env.API_URL}/user/${link}" class="btn">Verify Email</a>
        </div>
        <p>
            If the button above doesn't work, copy and paste the following link into
            your browser:
        </p>
        <p><a href="${process.env.API_URL}/user/${link}">${process.env.API_URL}/user/${link}</a></p>
        <p>
            Once your email is verified, you'll be able to enjoy full access to our
            platform and all the latest tech products and deals.
        </p>
        <p>Thank you for choosing Tech Nest!</p>
        <p>Best Regards,</p>
        <p>The Tech Nest Team</p>
        <div class="footer">
            <p>
            If you have any questions, feel free to<a
                href="mailto:support@technest.com"
                >contact our support team</a
            >.
            </p>
            <p>&copy; 2024 Tech Nest. All rights reserved.</p>
        </div>
        </div>
    </body>
    </html>
`
}