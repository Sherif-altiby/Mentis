<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
</head>
<body>
    <h1>Login</h1>

    <!-- Form to POST to /login route -->
    <form method="POST" action="/api/login">
        @csrf <!-- CSRF token field -->

        <!-- Username or Email field -->
        <label for="username">Username or Email:</label>
        <input type="text" id="username" name="username" required>
        
        <!-- Password field -->
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <!-- Submit button -->
        <button type="submit">Login</button>
    </form>
</body>
</html>
