document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openMessageButton');
    const closeBtn = document.getElementById('closeMessageButton');
    const popup = document.getElementById('messagePopup');
    const audio = document.getElementById('bdayAudio');
    const container = document.getElementById('messagePopup');

    // Array of emojis to use for the floating effect
    const emojis = ['🎂', '🥳', '🎁', '🎉', '🎈', '🍾', '🎊', '🍰'];

    /**
     * Creates and animates a single floating emoji.
     */
    function createFloatingEmoji() {
        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.classList.add('floating-emoji');

        // Random starting position and animation delay/duration for variety
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDelay = `${Math.random() * 4}s`; // Start at different times
        emoji.style.animationDuration = `${6 + Math.random() * 4}s`; // Vary the speed

        container.appendChild(emoji);

        // Remove emoji after its animation finishes to prevent DOM clutter
        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    }

    /**
     * Starts the continuous stream of floating emojis.
     */
    function startEmojiStream() {
        // Create an emoji every 300 milliseconds
        setInterval(createFloatingEmoji, 300);
    }

    // --- Event Listeners ---

    // 1. Show the Popup and Start the Music/Emojis
    openBtn.addEventListener('click', () => {
        const initialContainer = document.querySelector('.initial-container');
        initialContainer.style.display = 'none'; // Hide the initial screen
        popup.style.display = 'flex'; // Show the message popup

        // Attempt to play the audio
        audio.loop = true; // Make the song loop
        const playPromise = audio.play();

        // Handle the potential Autoplay Policy restriction
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented:", error);
                // User may need to manually enable sound if it fails
            });
        }
        
        startEmojiStream();
    });

    // 2. Hide the Popup
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        audio.pause(); // Stop the music
        audio.currentTime = 0; // Rewind the song
        // You could also add a 'Thank you' screen here if desired
    });

    // Handle initial button state (Optional: could be styled with CSS)
    openBtn.style.display = 'block'; 
});
