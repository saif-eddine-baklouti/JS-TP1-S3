import { livres } from "./livres.js";
import Livre from "./Livre.js";
import Panier from "./Panier.js";


let panierStorage; 


export  default class Vitrine {
    constructor(el) {
        this._el = el;
        this._librerie = this._el.querySelector('[data-js-librerie]');
        this._filter = this._el.querySelector('[data-js-filter]');
        this._svg = this._el.querySelector('[data-js-svg]');
        this._panier = this._el.querySelector('[data-js-panier]');
        this._recu = this._el.querySelector('.recu');
        this._modal = this._el.querySelector('[data-js-modal]')

        this.premierAffiche();
        this.init();
    }

    init() {
        
        this._el.addEventListener('click', function (e){
            e.preventDefault();

            let target = e.target;
            
            let dom ='';
            for (let i = 0 ,l = livres.length; i < l; i++) {  
            if (target.value == 1) {
                
                    dom += 
                    `
                        <article data-js-livre="${[i]}">
                        <img src="${livres[i].image}">
                            <p>${livres[i].titre}</p>
                            <div class="achat">
                            <p>${livres[i].prix} $</p>
                            <button name="btn" data-js-btn="${[i]}">Ajouter</button>
                            <div>
                            </article>
                    `;
                } else if (target.value == 2) {
                    if (livres[i].nouveaute == true) {
                        dom += 
                        `
                            <article data-js-livre="${[i]}">
                            <img src="${livres[i].image}">
                                <p>${livres[i].titre}</p>
                                <div class="achat">
                                <p>${livres[i].prix} $</p>
                                <button name="btn" data-js-btn="${[i]}">Ajouter</button>
                                <div>
                                </article>
                        `;
                    }
                } else if(target.id == livres[i].categorie) {
                    dom += 
                    `
                        <article data-js-livre="${[i]}">
                        <img src="${livres[i].image}">
                            <p>${livres[i].titre}</p>
                            <div class="achat">
                            <p>${livres[i].prix} $</p>
                            <button name="btn" data-js-btn="${[i]}">Ajouter</button>
                            <div>
                        </article>
                        `;
                    } 
                }
                    if (target.name != 'btn') {
                        
                        let livre = target.closest('[data-js-livre]');
                        if (livre) {
                            
                            new Livre(livre, this._modal)
                            
                        }
                    } 
                    
        if (target.name == 'btn' ) {
                        let itemExist = false;
                        let index = target.dataset.jsBtn,
                        obj = {
                                titre : livres[index].titre,
                                prix : livres[index].prix
                                };

                                panierStorage = localStorage.getItem('panier')
                                panierStorage = JSON.parse(panierStorage)

                        if (!panierStorage) {
                            panierStorage = [];
                            
                            panierStorage.push(obj);
                            
                            
                            localStorage.setItem('panier', JSON.stringify(panierStorage))
                        } else {

                            for (let i = 0; i < panierStorage.length; i++) {
                                if (panierStorage[i].titre == obj.titre) {
                                    itemExist = true;
                                }
                            }
                        
                        if (!itemExist) {
                            panierStorage = localStorage.getItem('panier')
                            panierStorage = JSON.parse(panierStorage);
                            panierStorage.push(obj);
                            
                            localStorage.setItem('panier', JSON.stringify(panierStorage))
                            
                        }
                    }
                    
    }
        if (dom) {
                    
                    this._librerie.innerHTML = dom; 
                }
                if (target == this._svg) {
                        
                    new Panier(this._panier)

                    if (this._recu.classList.contains('recu--ferme')) {
                
                        this._recu.classList.replace('recu--ferme', 'recu--ouvert');
                    } else {
                    
                    this._recu.classList.replace('recu--ouvert', 'recu--ferme');
                    }
                
                }
            }.bind(this));
        };
        
        premierAffiche() {
        for (let i = 0, l = 12; i < l; i++) {
            
            let dom = 
            `
                <article data-js-livre="${[i]}">
                <img id="livre | ${[i]}" src="${livres[i].image}">
                    <p>${livres[i].titre}</p>
                    <div class="achat">
                    <p>${livres[i].prix} $</p>
                    <button name="btn" data-js-btn="${[i]}">Ajouter</button>
                    <div>
                    </article>
            `;
            
            this._librerie.insertAdjacentHTML('beforeend', dom)
        }
        

    }
}