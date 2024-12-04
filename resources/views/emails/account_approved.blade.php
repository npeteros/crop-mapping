<!DOCTYPE html>
<html>
<head>
    <title>Account Approved</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h1 style="color: #4CAF50;">Your Account Has Been Approved!</h1>
    <p>
        Dear {{ $user['first_name'] }},
    </p>
    <p>
        Congratulations! Your account has been approved. You can now log in to our platform using the credentials below:
    </p>
    <table style="border-collapse: collapse; margin: 10px 0;">
        <tr>
            <td><strong>Email:</strong></td>
            <td>{{ $user['email'] }}</td>
        </tr>
        <tr>
            <td><strong>Password:</strong></td>
            <td>{{ $user['unhashed_password'] }}</td>
        </tr>
    </table>
    <p>
        Click the link below to log in:
    </p>
    <p>
        <a href="{{ $loginUrl }}" style="display: inline-block; padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Login to Your Account</a>
    </p>
    <p>Thank you for choosing our platform!</p>
    <p style="font-style: italic;">The {{ config('app.name') }} Team</p>
</body>
</html>
