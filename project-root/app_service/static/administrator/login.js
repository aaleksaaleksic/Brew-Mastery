window.addEventListener('load', () => {
    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:8001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                document.cookie = `token=${data.token};SameSite=Lax`;
                window.location.href = '/administrator';
            } else {
                alert('Invalid credentials!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
