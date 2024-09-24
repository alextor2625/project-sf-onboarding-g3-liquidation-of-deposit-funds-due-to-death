import { api, LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertCase from '@salesforce/apex/CaseController.insertCase'
import getUserAccountId from '@salesforce/apex/UserController.getUserAccountId'
import reCaptchaScript from '@salesforce/resourceUrl/reCaptchaScript'
import verifyToken from '@salesforce/apex/ReCaptchaController.verifyToken'
export default class LiquidationOfFundsProcessForm extends LightningElement {

    get reCaptchaURL() {
        return reCaptchaScript;
    }
    @track reCaptchaSuccess = false;
    async handleReCaptcha(event) {
        try {
            const token = event.data;
            console.log(token);
            const result = await verifyToken({ token: token })
            if (result.success) {
                this.reCaptchaSuccess = true;
            } else {
                this.reCaptchaSuccess = false;
            }
        } catch (error) {
            console.log(error);
        }

    }

    get submitButtonClass() {
        return this.reCaptchaSuccess ? 'custom-btn' : 'disabled-button';
    }

    userAccountId;
    connectedCallback() {
        getUserAccountId()
            .then((Id) => {
                this.userAccountId = Id;
            })
        window.addEventListener("message", this.handleReCaptcha.bind(this))
    }

    disconnectedCallback() {
        window.removeEventListener("message", this.handleReCaptcha.bind(this))
    }

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
        heirsDisbursementAuthorizationDocument: null,
        pickUpCheckBranchTown: '',
        pickUpCheckBranch: '',
        pickUpCheckWillAllHeirsPresent: '',
        pickUpCheckNonPresentHeirLocationOptions: [],
        affidavitPowerOfAttorneyPRCheckAuthorizationDocument: null,
        affidavitPowerOfAttorneyUSClerkCertificateDocument: null,
        apostilleIssuanceCountryDocument: null,
        militaryPowerDocument: null,
        greaterThan15k: ''
    }

    @api additionalRequiredDocumentsData = {
        isThereAWill: '',
        resolutionOfDeclarationOfHeirsDocument: null,
        willDocument: null,
        certificationRegistroPoderesTestamentosDocument: null,
        resolutionTestamentaryLettersExecutorDocument: null,
        lastWillAndTestamentDocument: null,
        lettersOfAdministrationOrSmallEstateProcedureDocument: null,
        certificateReleaseTaxLienEstateReturnDetallesBienesDocument: null,
        advancementOrDisbursementRequirementsDocument: null,
    }; //Needs Further Consideration

    @track showGreaterThan15kAdditionalDocumentUpload = false;
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
            // console.log("FILE FROM PARENT", JSON.stringify(this.deceasedCustomerInformationData.deathCertificate.name));

        }
        if (event.detail.eventName === 'requestorinformationdatachange') {
            this.requestorInformationData = { ...event.detail.requestorInformationData };
        }
        if (event.detail.eventName === 'disbursementinformationdatachange') {
            this.disbursementInformationData = { ...event.detail.disbursementInformationData };
            console.log("From PARENT: ", JSON.stringify(this.disbursementInformationData))
            this.showGreaterThan15kAdditionalDocumentUpload = this.disbursementInformationData.greaterThan15k.toLowerCase() === 'yes' ? true : false;
        }
        if (event.detail.eventName === 'additionaldocumentsdatachange') {
            this.additionalRequiredDocumentsData = { ...event.detail.additionalRequiredDocumentsData };
            console.log("From PARENT: ", JSON.stringify(this.additionalRequiredDocumentsData))
        }
    }
    handleSubmit() {
        try {
            if (!this.reCaptchaSuccess) {
                return
            }
            const newCase = {
                //Hidden Requirements
                AccountId: this.userAccountId,
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
                // Account Deposit
                Disbursement__c: this.disbursementInformationData.disbursementPreference,
                Account_Holder_Name__c: this.disbursementInformationData.accountHolderName,
                Disbursement_Account_Number__c: this.disbursementInformationData.disbursementAccountNumber,
                // PickUp Check At Branch
                Branch_Town__c: this.disbursementInformationData.pickUpCheckBranchTown,
                Branch_Name__c: this.disbursementInformationData.pickUpCheckBranch,
                Will_All_The_Heirs_Be_Present__c: this.disbursementInformationData.pickUpCheckWillAllHeirsPresent,
                Where_Is_he_located__c: this.disbursementInformationData.pickUpCheckNonPresentHeirLocationOptions,

                Is_the_sum_all_account_more_than_15k__c: this.disbursementInformationData.greaterThan15k.toLowerCase() === "yes" ? true : false,

                // Additional Required Documents
                Is_there_a_Will__c: this.additionalRequiredDocumentsData.isThereAWill
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
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.heirsDisbursementAuthorizationDocument)
                        .then(base64 => ({
                            name: this.disbursementInformationData.heirsDisbursementAuthorizationDocument.name,
                            base64
                        }))
                );
            }
            if (this.disbursementInformationData.affidavitPowerOfAttorneyPRCheckAuthorizationDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.affidavitPowerOfAttorneyPRCheckAuthorizationDocument)
                        .then(base64 => ({
                            name: this.disbursementInformationData.affidavitPowerOfAttorneyPRCheckAuthorizationDocument,
                            base64
                        }))
                );
            }
            if (this.disbursementInformationData.affidavitPowerOfAttorneyUSClerkCertificateDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.affidavitPowerOfAttorneyUSClerkCertificateDocument)
                        .then(base64 => ({
                            name: this.disbursementInformationData.affidavitPowerOfAttorneyUSClerkCertificateDocument,
                            base64
                        }))
                );
            }
            if (this.disbursementInformationData.apostilleIssuanceCountryDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.apostilleIssuanceCountryDocument)
                        .then(base64 => ({
                            name: this.disbursementInformationData.apostilleIssuanceCountryDocument,
                            base64
                        }))
                );
            }
            if (this.disbursementInformationData.militaryPowerDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.militaryPowerDocument)
                        .then(base64 => ({
                            name: this.disbursementInformationData.militaryPowerDocument,
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.resolutionOfDeclarationOfHeirsDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.resolutionOfDeclarationOfHeirsDocument)
                        .then(base64 => ({
                            name: this.additionalRequiredDocumentsData.resolutionOfDeclarationOfHeirsDocument,
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.willDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.willDocument)
                        .then(base64 => ({
                            name: this.additionalRequiredDocumentsData.willDocument,
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.certificationRegistroPoderesTestamentosDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.certificationRegistroPoderesTestamentosDocument)
                        .then(base64 => ({
                            name: this.additionalRequiredDocumentsData.certificationRegistroPoderesTestamentosDocument,
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.resolutionTestamentaryLettersExecutorDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.resolutionTestamentaryLettersExecutorDocument)
                        .then(base64 => ({
                            name: this.additionalRequiredDocumentsData.resolutionTestamentaryLettersExecutorDocument,
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.lastWillAndTestamentDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.lastWillAndTestamentDocument)
                        .then(base64 => ({
                            name: this.additionalRequiredDocumentsData.lastWillAndTestamentDocument,
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.lettersOfAdministrationOrSmallEstateProcedureDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.lettersOfAdministrationOrSmallEstateProcedureDocument)
                        .then(base64 => ({
                            name: this.additionalRequiredDocumentsData.lettersOfAdministrationOrSmallEstateProcedureDocument,
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.certificateReleaseTaxLienEstateReturnDetallesBienesDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.certificateReleaseTaxLienEstateReturnDetallesBienesDocument)
                        .then(base64 => ({
                            name: this.additionalRequiredDocumentsData.certificateReleaseTaxLienEstateReturnDetallesBienesDocument,
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.advancementOrDisbursementRequirementsDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.advancementOrDisbursementRequirementsDocument)
                        .then(base64 => ({
                            name: this.additionalRequiredDocumentsData.advancementOrDisbursementRequirementsDocument,
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