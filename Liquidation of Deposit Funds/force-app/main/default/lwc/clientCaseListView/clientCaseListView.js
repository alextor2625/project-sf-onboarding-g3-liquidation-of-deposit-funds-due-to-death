import { LightningElement, wire } from 'lwc';
import getClientCases from '@salesforce/apex/ClientCaseController.getClientCases';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id'
import USER_LANGUAGE_FIELD from '@salesforce/schema/User.LanguageLocaleKey'

export default class ClientCaseListView extends LightningElement {
    cases;
    error;

    languageLocale;

    // HTML Text Language Variation
    cardTitle = 'My Cases';
    tH1 = 'Case Number';
    tH2 = 'Deceased Member';
    tH3 = 'Created Date';

    // Get Current User's LanguageLocaleKey
    @wire(getRecord, {recordId: USER_ID, fields: [USER_LANGUAGE_FIELD]})
    wiredUser({error, data}){
        if (data){
            this.languageLocale = data.fields.LanguageLocaleKey.value;

            console.log('User record data received!: ', data);
            console.log('languageLocale in LWC: ', this.languageLocale);

            if (this.languageLocale === 'es'){
                this.cardTitle = 'Mis Casos';
                this.tH1 = 'Numero de Caso';
                this.tH2 = 'Miembro Fallecido';
                this.tH3 = 'Fecha Creado';
            } 

            console.log(`Text for HTML: cardTitle = ${this.cardTitle}, tH1 = ${this.tH1}`);

        } else if (error){
            console.error('Error getting user language locale: ', error);
        }
    }


    // Get Current User's related Cases
    @wire(getClientCases)
    wiredCases({error, data}){
        if (data){
            // this.cases = data;
            this.cases = data.map((caseRecord) => {
                return {
                    ...caseRecord,
                    formattedDate: new Date(caseRecord.CreatedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            });
            this.error = undefined;
            console.log("Data received!: ", data);
        } else if (error){
            this.error = error;
            this.cases = undefined;
            console.log("Error getting cases!: ", error);
        }
    }

    get hasCases(){
        return this.cases && this.cases.length > 0;
    }

}