//sAdapted from source: http://www.w3schools.com/howto/howto_css_modals.asp
var modal1 = {
    heading:'How To Play',
    description:'Match 4 Birds in A Row',
    image: '',
    prevPage: 'skip',
    nextPage: 'modal2'
};
var modal2 = {
    heading:'How To Play',
    description:'Match 4 or More Birds in a Column',
    image: '',
    caption: '',
    nextPage: 'modal3',
    prevPage:'modal1'
};
var modal3 = {
    heading:'How To Play',
    description:'Match 8 Birds or More to Win Bonus Points',
    image: '',
    caption: '',
    nextPage: 'close',
    prevPage:'modal2'
};
console.log('loading modal');

class Modal {
  constructor(modal) {
    this.modal = modal;
  }
}
class ModalView {
  constructor(modal) {
    this.modal = modal;
    this.el = document.createElement('div');
    this.el.className = 'modal-content';
  }
  setCloseClickHandler {
    this.el.querySelector('span.close').addEventListener('click', (e) => {
      const closeModal = new CustomEvent('close-clicked', {
        bubbles: true;,
        detail: { modal: this.modal }
      })
    });
    this.el.dispatchEvent(closeModal);
  }
  render() {
    this.el.innerHTML = `
    <div class="modal-content">
      <span class="close">x</span>
      <p>${this.modal.description}</p>
      <span class="previous">${this.modal.prevPage}</span>
      <span class="next">${this.modal.nextPage}</span
    </div>
    `;
    this.setCloseClickHandler();
  }
}
