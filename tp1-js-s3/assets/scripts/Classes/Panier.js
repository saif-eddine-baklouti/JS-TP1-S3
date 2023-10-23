



export default class Panier {
    constructor(el) {
        this._el = el
        this._table = this._el.querySelector('table')
        this._logo = this._el.querySelector('path')
        this._svg = this._el.querySelector('[data-js-svg]')
        this._recu = this._el.querySelector('.recu')
        
        
        this.affichePanier();
        this.init();
        
    }
    
     init() {
        
     }
    
    affichePanier() {

        let dom = '';
        let total = 0;
        
        let panierStorage = JSON.parse(localStorage.getItem('panier'));
        
        if (!panierStorage) {
            this._table.innerHTML = 'il n\'y aucun livre dans votre panier';
        } else {
            
            for (let i = 0, l = panierStorage.length ; i < l ; i++) {
                
            total += panierStorage[i].prix

            dom += 
            `
            <tr>
            <td>${panierStorage[i].titre} </td>
            <td>${panierStorage[i].prix} $</td>
            </tr>
            `
            
        }
    }

    if (total == 0) {
        this._table.innerHTML = 'il n\'y aucun livre dans votre panier';
    } else {


        this._table.innerHTML = 
        `
        <thead>
        <tr>
            <th> Livre </th>
            <th> Prix </th>
        </tr>
    </thead>
        
        ${dom}
        
        <tr>
        <th>Total</th>
        <th>${total} $</th>
        </tr>
        
        
        `;

    }

    
    
    
    
}


    
}