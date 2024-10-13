import Component from 'flarum/Component';

export default class MatrixEffect extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.canvas = null;
    this.ctx = null;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.fontSize = 10;
    this.columns = 0;
    this.drops = [];
  }

  oncreate(vnode) {
    super.oncreate(vnode);
    this.canvas = this.element;
    this.ctx = this.canvas.getContext('2d');
    this.initializeMatrix();
    this.animate();

    // Add resize event listener
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  onremove() {
    super.onremove();
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }

  resizeCanvas() {
    this.initializeMatrix();
  }

  initializeMatrix() {
    this.canvas.width = this.element.offsetWidth;
    this.canvas.height = this.element.offsetHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = new Array(this.columns).fill(1);
  }

  animate() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#4D698E';
    this.ctx.font = this.fontSize + 'px monospace';

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)];
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
      
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    
    requestAnimationFrame(this.animate.bind(this));
  }

  view() {
    return <canvas></canvas>;
  }
}