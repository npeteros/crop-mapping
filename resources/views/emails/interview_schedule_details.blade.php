<!DOCTYPE html>
<html>

<head>
    <title>Interview Schedule Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }

        .header {
            text-align: center;
            background-color: #f4f4f4;
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
        }

        .header h1 {
            margin: 0;
            color: #007bff;
        }

        .content {
            margin: 20px 0;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Farmer's Crop Insurance Application</h1>
        </div>
        <div class="content">
            <p>Dear {{ $farmerName }},</p>
            <p>We are pleased to inform you that your crop insurance application is progressing to the next stage. Below
                are the details for your interview:</p>
            <ul>
                <li><strong>Date:</strong> {{ $scheduleDate }}</li>
                <li><strong>Time:</strong> {{ $scheduleTime }}</li>
            </ul>
            <p>Please ensure that you arrive on time and bring all necessary documents as instructed during your
                application process.</p>
            <p>If you have any questions or need to reschedule, feel free to contact us at admin@bmao.com.</p>
            <p>Thank you and we look forward to seeing you.</p>
            <p>Best regards,</p>
            <p><strong>The Crop Insurance Team</strong></p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>

</html>
