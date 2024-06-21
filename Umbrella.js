document.addEventListener('DOMContentLoaded', function() {
    const umbrellaImage = document.getElementById('umbrella');
    const logoDisplay = document.getElementById('logo-display');
    const colorOptions = document.querySelectorAll('.color');
    const logoInput = document.getElementById('logo-input');
    const uploadButton = document.getElementById('upload-button');
    const uploadLoader = document.getElementById('upload-loader');
    const buttonLogo = document.getElementById('button-logo');
    const buttonLabel = document.getElementById('button-label');
    const fileNameSpan = document.getElementById('file-name');
    const crossIcon = document.getElementById('cross-icon');
    const body = document.body; // Select the body element
    const loader = document.getElementById('loader');

    let currentLogoSrc = ''; // Store current logo src to display after color change

    // Function to change the umbrella image, background color, and button color based on the selected color
    function changeUmbrellaColor(event) {
        const colorFileName = event.target.getAttribute('data-color');
        const bgColor = event.target.getAttribute('data-bg-color');
        const btnColor = event.target.getAttribute('data-btn-color');
        
        // Hide umbrella image and uploaded logo
        umbrellaImage.classList.add('hidden');
        logoDisplay.classList.add('hidden');

        // Update background and button colors first
        body.style.backgroundColor = bgColor;
        uploadButton.style.backgroundColor = btnColor;

        // Show loader with the new background color and fill
        loader.style.backgroundColor = bgColor;
        loader.classList.remove('hidden');

        //show loader on upload button
        buttonLogo.classList.add('hidden');
        uploadLoader.classList.remove('hidden')    

        // Simulate delay for 2 seconds (2000 milliseconds)
        setTimeout(() => {
            // Update umbrella image source
            umbrellaImage.src = `./icons/${colorFileName}`;
            
            // Display uploaded logo if it exists
            if (currentLogoSrc) {
                logoDisplay.src = currentLogoSrc;
                logoDisplay.classList.remove('hidden'); // Display the logo
                fileNameSpan.textContent = logoDisplay.alt; // Use alt text as file name
                fileNameSpan.classList.remove('hidden'); // Display the file name
                crossIcon.classList.remove('hidden'); // Show the cross icon
                buttonLogo.classList.add('hidden'); // Hide the upload icon
                buttonLabel.classList.add('hidden'); // Hide the upload label
            }
            
            //show upload icon after loading
            uploadLoader.classList.add('hidden')
            buttonLogo.classList.remove('hidden');
            
            // Show umbrella image after changing color
            umbrellaImage.classList.remove('hidden');

            // Hide loader after changing color and displaying the image
            loader.classList.add('hidden');
        }, 2000);
    }

    // Attach event listeners to color options
    colorOptions.forEach(color => {
        color.addEventListener('click', changeUmbrellaColor);
    });

    // Function to handle logo upload
    function handleLogoUpload(event) {
        const file = event.target.files[0];

        if (file && (file.type === 'image/png' || file.type === 'image/jpeg') && file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Store the uploaded logo src
                currentLogoSrc = e.target.result;

                // Hide umbrella image
                umbrellaImage.classList.add('hidden');

                // Show loader
                loader.style.backgroundColor = body.style.backgroundColor;
                loader.classList.remove('hidden');

                // Simulate delay for 2 seconds (2000 milliseconds) after uploading logo
                setTimeout(() => {
                    logoDisplay.src = currentLogoSrc;
                    logoDisplay.alt = file.name; // Set alt text as file name
                    logoDisplay.classList.remove('hidden'); // Display the logo
                    fileNameSpan.textContent = file.name;
                    fileNameSpan.classList.remove('hidden'); // Display the file name
                    crossIcon.classList.remove('hidden'); // Show the cross icon
                    buttonLogo.classList.add('hidden'); // Hide the upload icon
                    buttonLabel.classList.add('hidden'); // Hide the upload label
                    loader.classList.add('hidden'); // Hide loader after showing logo

                    // Show umbrella image with logo displayed over it
                    umbrellaImage.classList.remove('hidden');
                }, 2000);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Invalid file. Please upload a .png or .jpg image with a size less than 5MB.');
        }
    }

    // Function to trigger the logo input click event
    function triggerLogoInput() {
        logoInput.click();
    }

    // Function to remove the uploaded logo and file name
    function removeLogo() {
        currentLogoSrc = ''; // Clear current logo src
        logoDisplay.src = '';
        logoDisplay.alt = '';
        logoDisplay.classList.add('hidden');
        logoInput.value = '';
        fileNameSpan.textContent = '';
        fileNameSpan.classList.add('hidden'); // Hide the file name
        crossIcon.classList.add('hidden'); // Hide the cross icon
        buttonLogo.classList.remove('hidden'); // Show the upload icon
        buttonLabel.classList.remove('hidden'); // Show the upload label
    }

    // Attach event listeners to upload button and cross icon
    uploadButton.addEventListener('click', triggerLogoInput);
    logoInput.addEventListener('change', handleLogoUpload);
    crossIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent triggering the upload button click event
        removeLogo();
    });

    // Set initial background and button colors to match the blue umbrella
    body.style.backgroundColor = "#e4f8fe";
    uploadButton.style.backgroundColor = "#3498DB";

    // Function to hide uploaded file info (file name, cross icon) initially
    function hideUploadedInfo() {
        fileNameSpan.textContent = '';
        fileNameSpan.classList.add('hidden');
        crossIcon.classList.add('hidden');
        buttonLogo.classList.remove('hidden');
        buttonLabel.classList.remove('hidden');
    }

    // Initially hide uploaded file info and loader
    hideUploadedInfo();
    loader.classList.add('hidden'); // Initially hide loader
});