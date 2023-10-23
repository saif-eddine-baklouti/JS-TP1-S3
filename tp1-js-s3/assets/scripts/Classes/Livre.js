import { livres } from "./livres.js";


export default class Livre {
    constructor(el, modal){
        this._el = el
        this._elModal = modal
        this._elIframe = this._elModal.querySelector('[data-js-iframe]');        
        this._description = this._elModal.querySelector('.modal__description');        
        
        this._index = this._el.dataset.jsLivre

        this._elHTML = document.documentElement;
        this._elBody = document.body;

        this._btn = this._el.querySelector('[data-js-btn]')

        

        this.afficheLivre();
        this.init();
    }

    init() {
        this._el.addEventListener('click', function (e) {
            if (e.target != this._btn) {
                    this.afficheLivre();
            }
        }.bind(this));
        
    }

    afficheLivre () {

        this._elModal.classList.replace('modal--ferme', 'modal--ouvert');

        this._elIframe.src = `${livres[this._index].image}`;
        this._description.innerHTML = 
        `
        <p>Titre :${livres[this._index].titre} </p>
        <p>Auteur :${livres[this._index].auteur}</p>
        <p>Editeur :${livres[this._index].editeur}</p>
        <p>Page :${livres[this._index].pages}</p>
        <p>Description :${livres[this._index].description}</p>
        `

        this._elHTML.classList.add('overflow-y-hidden');
        this._elBody.classList.add('overflow-y-hidden');

        this._elModal.addEventListener('click', this.fermeLivre.bind(this));
    
        
    }

    fermeLivre() {
        
        this._elModal.classList.replace('modal--ouvert', 'modal--ferme');

        this._elIframe.src = '';
        
        this._elHTML.classList.remove('overflow-y-hidden');
        this._elBody.classList.remove('overflow-y-hidden');
        

    }

}