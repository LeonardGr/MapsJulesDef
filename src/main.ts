/// <reference types="@workadventure/iframe-api-typings" />

import { CreateUIWebsiteEvent } from "@workadventure/iframe-api-typings/front/Api/Events/Ui/UIWebsite";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
export const sleep = async (waitTime: number) => new Promise(resolve => setTimeout(resolve, waitTime));
/* const waitASecond = async () => {
    //await sleep(1);
} */
// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    if (WA.player.tags.includes('ca')) {
        WA.player.setOutlineColor(255, 0, 0)
    }
    
    currentPopup = WA.ui.openPopup("InstructionPopup", "Bienvenue dans notre forum Alternance by JULES ! \n Tu vas pouvoir découvrir les métiers de la vente, notre quotidien, notre entreprise et peut-être tes futurs collègues.", [])
    WA.room.area.onLeave("Instruction").subscribe(closePopup)

    WA.room.area.onEnter("SiteStyle").subscribe(() => {
        currentPopup = WA.ui.openPopup("StylePopup", "Choisis ton style ! \n  Un nouvel onglet va s’ouvrir, trouve ta tenue la plus stylée et fais-en une capture d’écran pour nous la pitcher en entretien !", [])
    })
    WA.room.area.onLeave("SiteStyle").subscribe(closePopup)


    WA.room.area.onEnter("Magasin").subscribe(() => {
        currentPopup = WA.ui.openPopup("MagasinPopup", "Bonjour !  Tu vas maintenant entrer dans un super magasin Jules ! \n Découvre les différentes étapes du parcours client !", [])
    })
    WA.room.area.onLeave("Magasin").subscribe(closePopup)

    WA.room.area.onEnter("RSE").subscribe(() => {
        currentPopup = WA.ui.openPopup("RSE Popup", "Découvre maintenant nos engagements RSE, symbolisé avec le TRUST, rapproche toi de chaque lettre pour en savoir plus !", [])
    })
    WA.room.area.onLeave("RSE").subscribe(closePopup)

    WA.room.area.onEnter("Stylotype").subscribe(() => {
        currentPopup = WA.ui.openPopup("Stylotype Popup", "Découvre ici les styles à la JULES. \n A la fin de ce parcours, tu pourras créer ta propre tenue à nous pitcher lors de l’entretien. ", [])
    })
    WA.room.area.onLeave("Stylotype").subscribe(closePopup)

    WA.room.area.onEnter("SalleCommune").subscribe(() => {
        currentPopup = WA.ui.openPopup("CommunePopup", "C'est le moment des questions ! Rencontre des alternants, poses des questions et relaxe toi avant l'entretien !", [])
    })
    WA.room.area.onLeave("SalleCommune").subscribe(closePopup) 

    WA.room.area.onEnter("Pre-entretien").subscribe(() => {
        currentPopup = WA.ui.openPopup("PrePopup", "L'entretien approche ! Découvre quelques petits conseils et relaxe toi... \n Tout va bien se passer ! ", [])
    })
    WA.room.area.onLeave("Pre-entretien").subscribe(closePopup)

    WA.room.area.onEnter("Entretien").subscribe(() => {
        currentPopup = WA.ui.openPopup("entretienPopup", "C’est parti ! \n Bon courage pour ton échange avec la team JULES et surtout reste toi-même !", [])
    })
    WA.room.area.onLeave("Entretien").subscribe(closePopup)

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    const guideBtn: CreateUIWebsiteEvent = {
        url:  root + "/guideBtn.html",
        visible: true,
        allowApi: true,
        allowPolicy: "",   // The list of feature policies allowed
        position: {
            vertical: "top",
            horizontal: "left",
        },
        size: {            // Size on the UI (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
            width: "65px",
            height: "65px",
        },
    }
  
    WA.ui.website.open(guideBtn)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        //waitASecond();
        currentPopup.close();
        currentPopup = undefined;   
    }
}


export {};
