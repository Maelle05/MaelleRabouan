window.addEventListener(
    'load', 
    function() {  
        console.log('load')   
    },
 false);

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

const pagesWorks = [w1010010]

// BOUTONS WORKS 

const b1010010 = document.getElementById('w1010010')

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

