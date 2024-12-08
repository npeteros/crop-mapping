<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Crop Approval Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Crop Approved</h2>
        <p>Dear {{ $resource['farmer'] }},</p>
        <p>We are pleased to inform you that your <strong>resource request</strong>  has been approved. Below are the details:</p>
        <table style="border-collapse: collapse; margin: 20px 0;">
            <tr>
                <th style="text-align: left; padding-left: 0.5rem; padding-right: 6rem; background-color: #4CAF50; color: white;">Requested Resource: </th>
                <td style="padding: 8px;">{{ $resource['name'] }}</td>
            </tr>
            <tr>
                <th style="text-align: left; padding-left: 0.5rem; padding-right: 6rem; background-color: #4CAF50; color: white;">Delivery Date</th>
                <td style="padding: 8px;">{{ \Carbon\Carbon::parse($resource['delivery_date'])->format('F d, Y') }}</td>
            </tr>
        </table>
        <p>If you have any questions or need further assistance, feel free to contact us.</p>
        <p>Best regards,</p>
        <p><strong>Balamban Municipal Agriculture Office</strong></p>
    </div>
</body>
</html>
