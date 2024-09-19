import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertCase from '@salesforce/apex/CaseController.insertCase'
import getUserAccountId from '@salesforce/apex/UserController.getUserAccountId'
export default class LiquidationOfFundsProcessForm extends LightningElement {
    @api deceasedCustomerInformationData = {
        firstName: '',
        lastName: '',
        ssn: '',
        dateOfDeath: '',
        deathCertificate: null
    };
    @api requestorInformationData = {
        firstName: '',
        lastName: '',
        relationship: '',
        email: '',
        preferredPhoneNumber: '',
        otherPhoneNumber: '',
        accId: '',
        // copyOfRequestorId: null,

    }

    @api disbursementInformationData = {
        disbursementPreference: '',
        accountHolderName: '',
        disbursementAccountNumber: '',
        greaterThan15k: '',
        heirsDisbursementAuthorizationDocument: null,
    }

    @api additionalRequiredDocumentsData; //Needs Further Consideration
    userAccountId;
    connectedCallback(){
        getUserAccountId()
        .then((Id) =>{
            this.userAccountId = Id;
            console.log(this.userAccountId);
        })
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    handleDataChange(event) {
        if (event.detail.eventName === 'deccustinfodatachange') {
            this.deceasedCustomerInformationData = { ...event.detail.deceasedCustomerInformationData };
            // console.log(JSON.stringify(this.deceasedCustomerInformationData));
            // console.log(JSON.stringify(typeof this.deceasedCustomerInformationData.deathCertificate));
            console.log("FILE FROM PARENT", JSON.stringify(this.deceasedCustomerInformationData.deathCertificate.name));

        }
        if (event.detail.eventName === 'requestorinformationdatachange') {
            this.requestorInformationData = { ...event.detail.requestorInformationData };
            // console.log(this.requestorInformationData.firstName);
            // console.log(this.requestorInformationData.lastName);
            // console.log(this.requestorInformationData.relationship);
            // console.log(this.requestorInformationData.email);
            // console.log(this.requestorInformationData.preferredPhoneNumber);
            // console.log(this.requestorInformationData.otherPhoneNumber);
            // console.log(this.requestorInformationData.copyOfRequestorId);
        }
        if (event.detail.eventName === 'disbursementinformationdatachange') {
            this.disbursementInformationData = { ...event.detail.disbursementInformationData };
            // console.log(JSON.stringify(this.disbursementInformationData));
        }
    }
    handleSubmit() {
        try {
            const newCase = {
                //Hidden Requirements
                AccountId: this.userAccountId, 
                OwnerId: "00Gbm000004tj73EAA",
                Origin: 'Liquidation Of Funds Portal',

                // Deceased Customer Information Data
                First_Name__c: this.deceasedCustomerInformationData.firstName,
                Last_Name__c: this.deceasedCustomerInformationData.lastName,
                Social_Security_Number__c: this.deceasedCustomerInformationData.ssn,
                Date_of_Death__c: this.deceasedCustomerInformationData.dateOfDeath,
                // Requestor Information
                Relationship__c: this.requestorInformationData.relationship,
                Other_Phone_Number__c: this.requestorInformationData.otherPhoneNumber,
                // Disbursement Information
                Disbursement__c: this.disbursementInformationData.disbursementPreference,
                Account_Holder_Name__c: this.disbursementInformationData.accountHolderName,
                Disbursement_Account_Number__c: this.disbursementInformationData.disbursementAccountNumber,
                Is_the_sum_all_account_more_than_15k__c: this.disbursementInformationData.greaterThan15k.toLowerCase() === "yes" ? true : false,
            }
            console.log(JSON.stringify(newCase));
    
            // Function to handle file to Base64 conversion
            const readFileAsBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = error => reject(error);
                    reader.readAsDataURL(file);
                });
            };
    
            let pdfPromises = [];
    
            // Push the promise for death certificate
            if (this.deceasedCustomerInformationData.deathCertificate) {
                pdfPromises.push(
                    readFileAsBase64(this.deceasedCustomerInformationData.deathCertificate)
                        .then(base64 => ({ 
                            name: this.deceasedCustomerInformationData.deathCertificate.name, 
                            base64 
                        }))
                );
            }
    
            // Push the promise for heirs disbursement authorization document
            if (this.disbursementInformationData.heirsDisbursementAuthorizationDocument) {
                console.log("Checking Heirs File")
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.heirsDisbursementAuthorizationDocument)
                        .then(base64 => ({ 
                            name: this.disbursementInformationData.heirsDisbursementAuthorizationDocument.name, 
                            base64 
                        }))
                );
            }
    
            // Once all files are converted to Base64
            Promise.all(pdfPromises)
                .then(pdfFiles => {
                    // Create a map of filenames and base64 data
                    const pdfBlobs = pdfFiles.reduce((acc, file) => {
                        acc[file.name] = file.base64;
                        return acc;
                    }, {});
                    
                    console.log("PDFs", JSON.stringify(Object.keys(pdfBlobs)));
                    console.log("Attempting Insert");
    
                    // Call the Apex method with newCase and pdfBlobs
                    insertCase({ newCase: newCase, pdfBlobs: pdfBlobs })
                        .then(() => {
                            console.log('Case Created');
                            this.showToast("Success!", "Case Created", "success");
                        })
                        .catch(error => {
                            console.log(error);
                            this.showToast("Error!", "Unable to create Case", "danger");
                        });
                })
                .catch(error => {
                    console.error('Error reading files: ', error);
                });
        } catch (error) {
            console.log(error.message);
        }
    }
    
}