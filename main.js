window.addEventListener(
    'load', 
    function() {  
        console.log('load')   
    },
 false);



/*
 function loader(){
	var gifContainer = document.querySelector('.loading');
    gifContainer.classList.add('none'); }
    */
/*
window.onload = loader;

function extraire()
    {
        if( ++i < message.length ){  // On incremente i et on compare a la taille du message.
            // Si i ne depasse pas le nombre de caracteres dans le message
            // Note : le premier caractere de la chaine commence a l'index 0
            if( message[i] == '\n' ){
                // Si saut de ligne on remplace par l'equivalent HTML : "<br/>".
                document.getElementById("msg").innerHTML += '<br/>';
            } else {
                // Sinon on ajoute simplement le caractere a l'emplacement courant.
                document.getElementById("msg").innerHTML += message[i];
            }
        } else {
            // Sinon on arrete le timer car le texte a fini de s'afficher.
            clearTimeout(interval);
        }
    }
        
    var i = -1; // On incremente i en debut de fonction, il vaudra donc 0 a la premiere execution.
    var message = "Maëlle Rabouan \n Web Développeuse"; // Message a afficher, on utilise le caractere \n pour le retour a la ligne.
    var interval = setInterval(extraire, 120); // On declanche le timer et on le garde dans une variable pour l'arreter plus tard.

extraire()*/

// MENU BURGER 

const btn_burger = document.getElementById('btn_burger')
const fleche_menu = document.getElementById('flecheTips')
const tips_menu = document.getElementById('tips')

let largeurPage = window.innerWidth

btn_burger.addEventListener(
    'click',
    () => {
        btn_burger.classList.toggle('active')
        btn_burger.classList.toggle('not-active')

        menulowd.classList.toggle('hide')

        let menuOuvert = menulowd.classList.contains('hide')
        menuTel(menuOuvert)
    }) 

// PAGES

const pageAceuil = document.getElementById('contenuAcceuil')
const pageDevWeb = document.getElementById('contenuDevWeb')
const pageMotion = document.getElementById('contenuMotionDesign')
const pageVideoGame = document.getElementById('contenuVideoGame')
const pageVideo = document.getElementById('contenuVideo')
const pageInfoLogo = document.getElementById('contenuInfoLogo')
const pageOther = document.getElementById('contenuOther')
const pageBookPh = document.getElementById('contenuBookPh')
const pageAboutMe = document.getElementById('contenuAboutMe')
const pageResume = document.getElementById('contenuResume')
const pageContact = document.getElementById('contenuContact')

const pageOuverte = [pageAceuil,pageDevWeb,pageMotion,pageVideoGame,pageVideo,pageInfoLogo,pageOther,pageBookPh,pageAboutMe,pageResume,pageContact]

// MENU
const menulowd = document.getElementById('transition')

const cHome = document.getElementById('cHome')
const cDevWeb = document.getElementById('cDevWeb')
const cMoDes = document.getElementById('cMoDes')
const cVidGam = document.getElementById('cVidGam')
const cVideo = document.getElementById('cVideo')
const cInfLog = document.getElementById('cInfLog')
const cOther = document.getElementById('cOther')
const cBookPh = document.getElementById('cBookPh')
const cAbMe = document.getElementById('cAbMe')
const cCV = document.getElementById('cCV')
const cContactM = document.getElementById('cContactM')

const btActif = [cHome, cDevWeb, cMoDes, cVidGam, cVideo, cInfLog, cOther, cBookPh, cAbMe, cCV, cContactM]


// PAGES WORKS

const w1010010 = document.getElementById('contenuWork1010010')
const wETPO = document.getElementById('contenuWorkETPO')
const wGaveBleu = document.getElementById('contenuGaveBleu')
const wCodageDecodage = document.getElementById('contenuWorkCodageDecodage')
const wMuseeAqu = document.getElementById('contenuMuseeAqu')
const wUXUI = document.getElementById('contenuUXUI')
const wNightMaze = document.getElementById('contenuNightMaze')
const wShowTime = document.getElementById('contenuShowTime')
const wEcoNum = document.getElementById('contenuEcoNum')
const wAFE = document.getElementById('contenuLogoAFE')
const wPetra = document.getElementById('contenuPetra')

const pagesWorks = [w1010010, wETPO, wGaveBleu, wCodageDecodage, wMuseeAqu, wUXUI, wNightMaze, wShowTime, wEcoNum, wAFE, wPetra]

// BOUTONS WORKS 

const b1010010 = document.getElementById('w1010010')
const b1010010p = document.getElementById('w1010010p')
const bETPO = document.getElementById('wETPO')
const bETPOp = document.getElementById('wETPOp')
const bGaveBleu = document.getElementById('wGaveBleu')
const bGaveBleup = document.getElementById('wGaveBleup')
const bCodageDeco = document.getElementById('wCodageDecodage')
const bCodageDecop = document.getElementById('wCodageDecodagep')
const bMuseeAqu = document.getElementById('wMuseeAqu')
const bUXUI = document.getElementById('wUXUI')
const bNightMaze = document.getElementById('wNightMaze')
const bShowTime = document.getElementById('wShowTime')
const bEcoNum = document.getElementById('wEcoNum')
const bAFE = document.getElementById('wAFE')
const bPetra = document.getElementById('wPetra')

// BOUTONS 

const Telecharge1010010 = document.getElementById('Telecharge1010010')


function changePage(page, btMenu) {
    menulowd.classList.add('hide')
    setTimeout(() => {
        menulowd.classList.remove('hide')
    }, 500)
    setTimeout(() => {

        for (let i = 0; i < pageOuverte.length; i++) {
            pageOuverte[i].classList.replace('contenuBlock', 'contenuNone')
        }
        for (let y = 0; y < pagesWorks.length; y++) {
            pagesWorks[y].classList.replace('contenuBlock', 'contenuNone')
        }
        // page en cour 
        page.classList.replace( 'contenuNone', 'contenuBlock' )
        for (let bt = 0; bt < btActif.length; bt++) {
            btActif[bt].classList.replace('btMenuOn','categorieMenu' )
        }
        btMenu.classList.replace('categorieMenu', 'btMenuOn')

        if(window.innerWidth<480) {
            
            if(pageOuverte.includes(page)){
              btn_burger.classList.toggle('active')
              btn_burger.classList.toggle('not-active')  
            }
            setTimeout(() => {
                for (let btOFF = 0; btOFF < btActif.length; btOFF++) {
                btActif[btOFF].classList.remove('contenuBlock')
                btActif[btOFF].classList.add('contenuNone')
                }
                fleche_menu.classList.remove('contenuBlock')
                fleche_menu.classList.add('contenuNone')
                tips_menu.classList.remove('contenuBlock')
                tips_menu.classList.add('contenuNone')
            }, 300)

            }

    }, 400)
}

// BOUTONS MENU 
cHome.addEventListener(
    "click", 
    () => { 
        changePage(pageAceuil, cHome)
    });

cDevWeb.addEventListener(
    "click", 
    () => { 
        changePage(pageDevWeb, cDevWeb)
    });

cMoDes.addEventListener(
    "click", 
    () => { 
        changePage(pageMotion, cMoDes)
    });

cVidGam.addEventListener(
    "click", 
    () => { 
        changePage(pageVideoGame, cVidGam)
    });

cVideo.addEventListener(
    "click", 
    () => { 
        changePage(pageVideo, cVideo)
    });

cInfLog.addEventListener(
    "click", 
    () => { 
        changePage(pageInfoLogo, cInfLog)
    });

cOther.addEventListener(
    "click", 
    () => { 
        changePage(pageOther, cOther)
    });

cBookPh.addEventListener(
    "click", 
    () => { 
        changePage(pageBookPh, cBookPh)
    });


cAbMe.addEventListener(
    "click", 
    () => { 
        changePage(pageAboutMe, cAbMe)
    });

cCV.addEventListener(
    "click", 
    () => { 
        changePage(pageResume, cCV)
    });

cContactM.addEventListener(
    "click", 
    () => { 
        changePage(pageContact, cContactM)
    });

// PAGES WORKS 

b1010010.addEventListener(
    "click",
    () => {
        changePage(w1010010, cVidGam)
    });

b1010010p.addEventListener(
    "click",
    () => {
        changePage(w1010010, cVidGam)
    });

bETPO.addEventListener(
    "click",
    () => {
        changePage(wETPO, cMoDes)
    });
bETPOp.addEventListener(
    "click",
    () => {
        changePage(wETPO, cMoDes)
    });

bGaveBleu.addEventListener(
    "click",
    () => {
        changePage(wGaveBleu, cDevWeb)
    });

bCodageDeco.addEventListener(
    "click",
    () => {
        changePage(wCodageDecodage, cMoDes)
    });
bCodageDecop.addEventListener(
    "click",
    () => {
        changePage(wCodageDecodage, cMoDes)
    });

bGaveBleup.addEventListener(
    "click",
    () => {
        changePage(wGaveBleu, cDevWeb)
    });

bMuseeAqu.addEventListener(
    "click",
    () => {
        changePage(wMuseeAqu, cDevWeb)
    });

bUXUI.addEventListener(
    "click",
    () => {
        changePage(wUXUI, cDevWeb)
    });

bNightMaze.addEventListener(
    "click",
    () => {
        changePage(wNightMaze, cVidGam)
    });

bShowTime.addEventListener(
    "click",
    () => {
        changePage(wShowTime, cVideo)
    });

bEcoNum.addEventListener(
    "click",
    () => {
        changePage(wEcoNum, cInfLog)
    });

bAFE.addEventListener(
    "click",
    () => {
        changePage(wAFE, cInfLog)
    });

bPetra.addEventListener(
    "click",
    () => {
        changePage(wPetra, cVideo)
    });

Telecharge1010010.addEventListener(
    "click",
    () => {
        alert('Sorry !😥 Cette fonction n\'est pas encore disponible ... ')
    });


const menuTel = (bla)=>{
    if (bla == true){
        for (let btON = 0; btON < btActif.length; btON++) {
            btActif[btON].classList.remove('contenuNone')
            btActif[btON].classList.add('contenuBlock')
        }
        fleche_menu.classList.remove('contenuNone')
        fleche_menu.classList.add('contenuBlock')
        tips_menu.classList.remove('contenuNone')
        tips_menu.classList.add('contenuBlock')
    }else{
        for (let btOFF = 0; btOFF < btActif.length; btOFF++) {
            btActif[btOFF].classList.remove('contenuBlock')
            btActif[btOFF].classList.add('contenuNone')
        }
        fleche_menu.classList.remove('contenuBlock')
        fleche_menu.classList.add('contenuNone')
        tips_menu.classList.remove('contenuBlock')
        tips_menu.classList.add('contenuNone')
    }
}

if(window.innerWidth<480) {
    for (let btOFF = 0; btOFF < btActif.length; btOFF++) {
        btActif[btOFF].classList.remove('contenuBlock')
        btActif[btOFF].classList.add('contenuNone')
    }
    fleche_menu.classList.remove('contenuBlock')
    fleche_menu.classList.add('contenuNone')
    tips_menu.classList.remove('contenuBlock')
    tips_menu.classList.add('contenuNone')
    }

    
