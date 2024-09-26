import { LightningElement, wire } from 'lwc';
import { updateRecord, getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id'
import USER_LANGUAGE_FIELD from '@salesforce/schema/User.LanguageLocaleKey'

export default class LanguageSelector extends LightningElement {

    
    selectedLanguage; // Default
    languageOptions = [
        {label: 'English', value: 'en_US'},
        {label: 'Spanish', value: 'es'}
    ];
    
    // Get Current User's LanguageLocaleKey
    @wire(getRecord, {recordId: USER_ID, fields: [USER_LANGUAGE_FIELD]})
    wiredUser({error, data}){
        if (data){
            this.selectedLanguage = data.fields.LanguageLocaleKey.value;

        } else if (error){
            console.error('LanguageSelector Error getting user language locale: ', error);
        }
    }

    handleLanguageChange(event){
        this.selectedLanguage = event.detail.value;

        // Update user's language in Salesforce
        const fields = {};
        fields.Id = USER_ID;
        fields[USER_LANGUAGE_FIELD.fieldApiName] = this.selectedLanguage;

        const recordInput = {fields};

        updateRecord(recordInput)
            .then(() => {
                // Refresh page to apply language changes
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating user language: ', error);
            })
    }

}