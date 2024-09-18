import { api, LightningElement } from 'lwc';

export default class LiquidationOfFundsProcessForm extends LightningElement {
    @api deceasedCustomerInformationData = {
        firstName: '',
        lastName: '',
        ssn: '',
        dateOfDeath: '',
        deathCertificate: ''
    };
    @api requestorInformationData = {
        firstName: '',
        lastName: '',
        relationship: '',
        email: '',
        preferredPhoneNumber: '',
        otherPhoneNumber: '',
        copyOfRequestorId: null,

    }

    @api disbursementInformationData = {
        disbursementPreference: '',
        accountHolderName:'',
        disbursementAccountNumber: '',
        heirsDisbursementAuthorizationDocument: null,
    }
    
    @api additionalRequiredDocumentsData; //Needs Further Consideration
    
    handleDataChange(event) {
        if (event.detail.eventName === 'deccustinfodatachange') {
            this.deceasedCustomerInformationData = { ...event.detail.deceasedCustomerInformationData };
            console.log("Hello!!!",JSON.stringify(this.deceasedCustomerInformationData));
        }
        if (event.detail.eventName === 'requestorinformationdatachange') {
            this.requestorInformationData = { ...event.detail.requestorInformationData };
            console.log(this.requestorInformationData.firstName);
            console.log(this.requestorInformationData.lastName);
            console.log(this.requestorInformationData.relationship);
            console.log(this.requestorInformationData.email);
            console.log(this.requestorInformationData.preferredPhoneNumber);
            console.log(this.requestorInformationData.otherPhoneNumber);
            console.log(this.requestorInformationData.copyOfRequestorId);
        }
        if (event.detail.eventName === 'disbursementinformationdatachange') {
            this.disbursementInformationData = { ...event.detail.disbursementInformationData};
            console.log([...Object.values(this.disbursementInformationData)]);
        }
    }
}