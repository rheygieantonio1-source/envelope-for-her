// Get all stage elements
const envelopeContainer = document.getElementById('envelope-container');
const padlockContainer = document.getElementById('padlock-container');
const paperContainer = document.getElementById('paper-container');
const contentContainer = document.getElementById('content-container');

// Get interactive elements
const envelope = document.getElementById('envelope');
const unlockBtn = document.getElementById('unlock-btn');
const errorMsg = document.getElementById('error-msg');
const paper = document.getElementById('paper');
const digit1 = document.getElementById('digit1');
const digit2 = document.getElementById('digit2');
const digit3 = document.getElementById('digit3');

// Correct combination
const correctCombination = {
    digit1: '10',
    digit2: '15',
    digit3: '25'
};

// Stage 1: Envelope Click Event
envelope.addEventListener('click', function() {
    envelope.classList.add('opening');
    
    setTimeout(() => {
        envelopeContainer.classList.remove('active');
        padlockContainer.classList.add('active');
    }, 800);
});

// Auto-focus next input when typing
digit1.addEventListener('input', function() {
    if (this.value.length === 2) {
        digit2.focus();
    }
});

digit2.addEventListener('input', function() {
    if (this.value.length === 2) {
        digit3.focus();
    }
});

// Allow backspace to go to previous input
digit2.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && this.value.length === 0) {
        digit1.focus();
    }
});

digit3.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && this.value.length === 0) {
        digit2.focus();
    }
});

// Stage 2: Unlock Button Click Event
unlockBtn.addEventListener('click', function() {
    const input1 = digit1.value;
    const input2 = digit2.value;
    const input3 = digit3.value;
    
    // Check if all fields are filled
    if (!input1 || !input2 || !input3) {
        errorMsg.textContent = 'Please enter all numbers!';
        shakeInputs();
        return;
    }
    
    // Check if combination is correct
    if (input1 === correctCombination.digit1 && 
        input2 === correctCombination.digit2 && 
        input3 === correctCombination.digit3) {
        
        errorMsg.textContent = '';
        unlockBtn.textContent = 'Unlocking...';
        unlockBtn.style.background = 'linear-gradient(135deg, #90EE90, #32CD32)';
        
        setTimeout(() => {
            padlockContainer.classList.remove('active');
            paperContainer.classList.add('active');
        }, 1000);
        
    } else {
        errorMsg.textContent = 'Wrong combination! Try again ❌';
        shakeInputs();
        clearInputs();
    }
});

// Allow Enter key to submit
digit3.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        unlockBtn.click();
    }
});

// Stage 3: Paper Click Event
paper.addEventListener('click', function() {
    paper.style.transform = 'translateX(-50%) scale(1.2)';
    paper.style.opacity = '0';
    
    setTimeout(() => {
        paperContainer.classList.remove('active');
        contentContainer.classList.add('active');
		
		document.body.style.backgroundImage = "url('final-background.jpg')";
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.backgroundRepeat = "no-repeat";
		document.body.style.backgroundAttachment = "fixed";
    }, 500);
});

// Helper Functions
function shakeInputs() {
    const inputs = [digit1, digit2, digit3];
    inputs.forEach(input => {
        input.style.animation = 'shake 0.5s';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    });
}

function clearInputs() {
    digit1.value = '';
    digit2.value = '';
    digit3.value = '';
    digit1.focus();
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Prevent scrolling on number inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('wheel', function(e) {
        e.preventDefault();
    });
});
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const progressFill = document.getElementById('progress-fill');
const currentTimeDisplay = document.getElementById('current-time');
const durationTimeDisplay = document.getElementById('duration-time');
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.querySelector('.progress-bar');

// Set initial volume
audioPlayer.volume = 0.7;

// Play/Pause button
playBtn.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        audioPlayer.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', function() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = progress + '%';
    
    // Update current time
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

// Load duration
audioPlayer.addEventListener('loadedmetadata', function() {
    durationTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

// Click on progress bar to seek
progressBar.addEventListener('click', function(e) {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    audioPlayer.currentTime = percentage * audioPlayer.duration;
});

// Volume control
volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = this.value / 100;
});

// Format time helper function
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// Auto play when content appears (update the existing code)
const originalPaperClick = paper.onclick;

// Ribbon Untying Animation
const ribbonBow = document.getElementById('ribbon-bow');
const sealedLetter = document.getElementById('sealed-letter');
const openedLetter = document.getElementById('opened-letter');

if (ribbonBow) {
    ribbonBow.addEventListener('click', function() {
        // Add untying animation
        sealedLetter.classList.add('ribbon-untying');
        
        // After animation, hide sealed letter and show opened letter
        setTimeout(() => {
            sealedLetter.style.display = 'none';
            openedLetter.style.display = 'block';
        }, 1000);
    });
}