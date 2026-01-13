document.addEventListener('DOMContentLoaded', () => {
    
    taikytiNustatymus();
    
    
    valdytiModala();
    

    prijungtiNustatymuValdyma();
    
    
    prijungtiFormosValidacija();
});


function valdytiModala() {
    const modalas = document.getElementById('nustatymuLangas');
    const mygtukas = document.getElementById('nustatymuAtidarymas');
    const uzdaryti = document.getElementById('uzdarytiNustatymus');

    if (mygtukas && modalas) {
        mygtukas.onclick = () => modalas.style.display = "block";
        uzdaryti.onclick = () => modalas.style.display = "none";
        
        
        window.onclick = (event) => {
            if (event.target == modalas) {
                modalas.style.display = "none";
            }
        }
    }
}


function prijungtiNustatymuValdyma() {
    const temosSel = document.getElementById('temosPasirinkimas');
    const dydisRange = document.getElementById('tekstoDydis');

    if (temosSel) {
        temosSel.addEventListener('change', (e) => {
            localStorage.setItem('jshot_tema', e.target.value);
            taikytiNustatymus();
        });
    }

    if (dydisRange) {
    
        dydisRange.addEventListener('input', (e) => {
            const dydis = e.target.value + 'px';
            document.getElementById('dydžioReikšmė').innerText = dydis;
            localStorage.setItem('jshot_dydis', dydis);
            taikytiNustatymus();
        });
    }
}


function prijungtiFormosValidacija() {
   
    const forma = document.querySelector('form'); 

    if (forma) {
        forma.addEventListener('submit', function(e) {
            e.preventDefault(); 

            
            const vardasInput = forma.querySelector('input[name="vardas"]');
            const emailInput = forma.querySelector('input[name="email"]');
            const zinuteInput = forma.querySelector('textarea[name="zinute"]');

            
            if (!vardasInput.value || vardasInput.value.length < 2) {
                alert("Klaida: Prašome įvesti vardą (bent 2 simboliai).");
                return;
            }
            if (!emailInput.value || !emailInput.value.includes('@')) {
                alert("Klaida: Prašome įvesti teisingą el. pašto adresą.");
                return;
            }
            if (!zinuteInput.value) {
                alert("Klaida: Žinutės laukas negali būti tuščias.");
                return;
            }

            
            alert(`SĖKMINGA REGISTRACIJA!\n\nJūsų duomenys:\nVardas: ${vardasInput.value}\nEl. paštas: ${emailInput.value}\nŽinutė: ${zinuteInput.value}\n\nSusisieksime su jumis artimiausiu metu!`);
            
            
            forma.reset();
        });
    }
}


function taikytiNustatymus() {
    const tema = localStorage.getItem('jshot_tema');
    const dydis = localStorage.getItem('jshot_dydis');

 
    if (dydis) {
       
        document.documentElement.style.setProperty('font-size', dydis, 'important');
        document.body.style.setProperty('font-size', dydis, 'important');
        
        
        const range = document.getElementById('tekstoDydis');
        const text = document.getElementById('dydžioReikšmė');
        if (range && text) {
            range.value = parseInt(dydis);
            text.innerText = dydis;
        }
    }


    const elementaiSuJuoduTekstu = document.querySelectorAll(`
        article, article *, 
        aside, aside *, 
        forma, forma *,
        .nustatymu-turinys, .nustatymu-turinys *,
        form, form label, form input, form textarea, form select
    `);


    if (tema === 'dark') {

        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff'; 
        
        
        elementaiSuJuoduTekstu.forEach(el => {
            el.style.setProperty('color', '#000000', 'important');
        });

    } else if (tema === 'sepia') {
        document.body.style.backgroundColor = '#f4ecd8';
        document.body.style.color = '#5b4636';
        
        
     
        elementaiSuJuoduTekstu.forEach(el => el.style.color = '');

    } else {
        
        document.body.style.backgroundColor = '#fff8f0';
        document.body.style.color = '#333';
        
        
        elementaiSuJuoduTekstu.forEach(el => el.style.color = '');
    }
}
