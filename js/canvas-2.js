class Canvas {

    constructor() {
      this.canvas = document.querySelector('#canvas');
      //this.trash = document.querySelector('#trash-icon');
      //this.bookBtn = document.querySelector('#reserver');
      this.context = this.canvas.getContext('2d');
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 2;
      this.isDrawing = false;
      this.clear();
      this.bindEvents();
    }
  
    bindEvents() {
      this.canvas.addEventListener('mousedown', (e) => this.startDrawing(this.getMousePosition(e)));
      this.canvas.addEventListener('mouseup', (e) => this.stopDrawing());
      this.canvas.addEventListener('mousemove', (e) => this.draw(this.getMousePosition(e)));
      this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Eviter le scroll
        this.startDrawing(this.getTouchPosition(e));
      });
      this.canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        this.draw(this.getTouchPosition(e))
      });
      this.canvas.addEventListener('touchstop', (e) => this.stopDrawing());
      //this.trash.addEventListener('click', () => this.clear())
    }
  
  
    getPosition(pos) {
      const rect = this.canvas.getBoundingClientRect(); //va chercher la position relative et la taille de l'élément par rapport à sa zone d'affichage
      const x = (pos.x - rect.left) / (rect.right - rect.left) * this.canvas.width; //récupère la position exacte de la souris en X
      const y = (pos.y - rect.top) / (rect.bottom - rect.top) * this.canvas.height; //idem en Y
      return {x, y};
    }
  
    getMousePosition(e) {
      return this.getPosition({
        x: e.clientX,
        y: e.clientY
      }); //récupère la position du clic dans le navigateur
    }
  
    getTouchPosition(e) {
      return this.getPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }); //récupère la position du premier toucher dans le navigateur
    }
  
    startDrawing(position) {
      const {x, y} = position;
      this.context.moveTo(x, y); //Positionne le curseur
      this.context.beginPath(); // Commencer un nouveau dessin
      this.isDrawing = true;
    }
  
    stopDrawing() {
      this.isDrawing = false;
      //this.bookBtn.style.display = 'block';
    }
  
    draw(position) {
      if (this.isDrawing) {
        const {x, y} = position;
        this.context.lineTo(x, y); // On ajoute un nouveau point
        this.context.stroke(); // On dessine
      }
    }
  
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //this.bookBtn.style.display = 'none';
    }
  
  }