import Vitrine from "./Classes/Vitrine.js";

(function () {
    
    
    // console.log('yesyes')
    // console.log('no no no ')
    let vitrine = document.querySelectorAll('[data-js-vitrine]');

    for (let i = 0, l = vitrine.length; i < l; i++) {
        
        new Vitrine(vitrine[i]);
        
    }

})();