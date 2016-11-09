// Adapted from source: http://www.w3schools.com/howto/howto_css_modals.asp
// Modeled after Andrew Madden's ToDo List App
// let modal1 = {
//     heading:'How To Play',
//     description:'Match 4 Birds in A Row',
//     image: '',
//     prevPage: 'skip',
//     nextPage: 'modal2'
// };
// let modal2 = {
//     heading:'How To Play',
//     description:'Match 4 or More Birds in a Column',
//     image: '',
//     caption: '',
//     nextPage: 'modal3',
//     prevPage:'modal1'
// };
// let modal3 = {
//     heading:'How To Play',
//     description:'Match 8 Birds or More to Win Bonus Points',
//     image: '',
//     caption: '',
//     nextPage: 'close'
//     prevPage:'modal2'
// };
// class Modal {
//   constructor(description) {
//     this.description = description;
//   }
// }
// class ModalView {
//   constructor(modal) {
//     this.modal = modal;
//     this.el = document.createElement('div');
//     this.el.className = 'modal-content';
//   }
//   setCloseClickHandler {
//     this.el.querySelector('span.close').addEventListener('click', (e) => {
//       const closeModal = new CustomeEvent('close-clicked', {
//         bubbles: true;,
//         detail: { modal: this.modal }
//       })
//     });
//     this.el.dispatchEvent(closeModal);
//   }
//   render() {
//     this.el.innerHTML = `
//     <div class="modal-content">
//       <span class="close">x</span>
//       <p>${this.modal.description}</p>
//       <span class="previous">${this.modal.prevPage}</span>
//       <span class="next">${this.modal.nextPage}</span
//     </div>
//     `;
//     this.setCloseClickHandler();
//   }
// }
