const fileInput = document.getElementById('fileInput');
        const profilePhoto = document.getElementById('profilePhoto');
        const savePhoto = document.getElementById('savePhoto');

        let uploadedPhoto = null;

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePhoto.src = e.target.result;
                    uploadedPhoto = e.target.result; // Save the uploaded photo data
                };
                reader.readAsDataURL(file);
            }
        });

        savePhoto.addEventListener('click', () => {
            if (uploadedPhoto) {
                // Simulate saving the photo (e.g., send it to a server)
                alert('Photo saved successfully!');
                console.log('Saved photo data:', uploadedPhoto);
            } else {
                alert('Please upload a photo before saving.');
            }
        });