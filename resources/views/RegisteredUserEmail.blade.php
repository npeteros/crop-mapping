<!DOCTYPE html>
<html>

<head>
    <title>Welcome Email</title>
</head>

<body>
    <h1>Welcome, {{ $user->first_name }}!</h1>
    <p>Thank you for joining our platform. We're excited to have you!</p>
    {{-- <p>{{ json_decode($user) }}</p> --}}
</body>

</html>