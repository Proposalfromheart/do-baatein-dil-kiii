class Draggable {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.style.position = 'absolute';
    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.element.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
  }

  onMouseDown(event) {
    event.preventDefault();
    this.startDrag(event.clientX, event.clientY);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    this.startDrag(touch.clientX, touch.clientY);
    document.addEventListener('touchmove', this.onTouchMove, { passive: false });
    document.addEventListener('touchend', this.onTouchEnd);
  }

  startDrag(clientX, clientY) {
    this.offsetX = clientX - this.element.getBoundingClientRect().left;
    this.offsetY = clientY - this.element.getBoundingClientRect().top;
  }

  onMouseMove = (event) => {
    this.moveElement(event.clientX, event.clientY);
  };

  onTouchMove = (event) => {
    const touch = event.touches[0];
    this.moveElement(touch.clientX, touch.clientY);
  };

  moveElement(clientX, clientY) {
    this.element.style.left = `${clientX - this.offsetX}px`;
    this.element.style.top = `${clientY - this.offsetY}px`;
  }

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  onTouchEnd = () => {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
  };
}

// Apply draggable functionality to all elements with the 'paper' class
const papers = document.querySelectorAll('.paper');
papers.forEach(paper => {
  new Draggable(paper);
});


document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio-player');

  const playAudio = () => {
    audio.play().then(() => {
      console.log("Audio is playing");
    }).catch(error => {
      console.error('Playback prevented:', error);
    });
  };

  // Attempt to play the audio immediately (for desktop)
  playAudio();

  // If playback fails due to user interaction requirements, wait for a click or touch event
  document.addEventListener('click', playAudio, { once: true });
  document.addEventListener('touchstart', playAudio, { once: true });
});


