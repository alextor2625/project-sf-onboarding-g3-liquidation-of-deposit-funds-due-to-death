import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id'
import USER_LANGUAGE_FIELD from '@salesforce/schema/User.LanguageLocaleKey'
import PORTAL_BACKGROUND from '@salesforce/resourceUrl/HeroBackground'

export default class PortalHeroComponent extends LightningElement {

    backgroundImage = PORTAL_BACKGROUND;

    heroText = 'Liquidation of Deposit Funds Request';

    // Get Current User's LanguageLocaleKey
    @wire(getRecord, {recordId: USER_ID, fields: [USER_LANGUAGE_FIELD]})
    wiredUser({error, data}){
        if (data){
            if (data.fields.LanguageLocaleKey.value === 'es'){
                this.heroText = 'Solicitud de Liquidación de Fondos de Depósito'
            }

        } else if (error){
            console.error('PortalHeroComponent Error getting user language: ', error);
        }
    }

}