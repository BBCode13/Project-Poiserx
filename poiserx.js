 document.getElementById('access-form').addEventListener('submit', function(event) {
            // 1. Prevent the default behavior (stops the redirect to the PHP file)
            event.preventDefault();

            // 2. Automatically grab all the data from the form fields
            const formData = new FormData(this);

            // 3. Send the data to the PHP file in the background
            fetch('poiserx.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text()) // Convert the server response into plain text/HTML
            .then(data => {
                const message = data.trim();
                const responseElement = document.getElementById('response');
                const messageElement = document.createElement('p');
                messageElement.textContent = message;
                responseElement.replaceChildren(messageElement);

                if (message === 'Access granted' || message === 'Access denied') {
                    const sound = new Audio(
                        message === 'Access granted' ? 'granted.mp3' : 'denied.mp3'
                    );
                    sound.play().catch(error => {
                        console.error('Unable to play response sound:', error);
                    });
                }

                if (message === 'Access granted') {
                    const listFrame = document.createElement('iframe');
                    listFrame.src = 'list.html';
                    listFrame.title = 'Proxy list';
                    listFrame.className = 'proxy-list-frame';
                    responseElement.appendChild(listFrame);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('response').innerHTML = "An error occurred.";
            });
        });