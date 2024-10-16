import { api, LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertCase from '@salesforce/apex/CaseController.insertCase'
import getUserAccountId from '@salesforce/apex/UserController.getUserAccountId'
import reCaptchaScript from '@salesforce/resourceUrl/reCaptchaScript'
import verifyToken from '@salesforce/apex/ReCaptchaController.verifyToken'
import InfoLabel from '@salesforce/label/c.Process_Form'

export default class LiquidationOfFundsProcessForm extends LightningElement {

    @track infoLabel = {};

    @track legalAgreementCheckbox = false;
    get reCaptchaURL() {
        return reCaptchaScript;
    }
    @track reCaptchaSuccess = false;
    async handleReCaptcha(event) {
        try {
            const { type, token } = event.data;
            console.log(event);
            const result = await verifyToken({ token: token })
            if (type === 'recaptcha-success') {
                if (result.success) {
                    this.reCaptchaSuccess = true;
                } else {
                    this.reCaptchaSuccess = false;
                }
            }
            else if (type === 'recaptcha-expired') {
                this.reCaptchaSuccess = false;
            }
        } catch (error) {
            console.log(error);
        }

    }
    buttonActive = true
    // get submitButtonClass() {
    //     return true ? 'custom-btn' : 'disabled-button';
    // }
    get submitButtonClass() {
        return this.reCaptchaSuccess && this.legalAgreementCheckbox && this.verifyFormCompletion() && this.buttonActive? 'custom-btn' : 'disabled-button';
    }


    userAccountId;
    connectedCallback() {

        this.infoLabel = JSON.parse(InfoLabel);

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
        // accId: '',
        // copyOfRequestorId: null,

    }

    @api disbursementInformationData = {
        disbursementPreference: '',
        //Account Deposit
        accountHolderName: '',
        disbursementAccountNumber: '',
        heirsDisbursementAuthorizationDocument: null,
        // Pick Up Check At Branch
        pickUpCheckBranchTown: '',
        pickUpCheckBranch: '',
        pickUpCheckWillAllHeirsPresent: '',
        pickUpCheckNonPresentHeirLocationOptions: [],
        affidavitPowerOfAttorneyPRCheckAuthorizationDocument: null,
        affidavitPowerOfAttorneyUSClerkCertificateDocument: null,
        apostilleIssuanceCountryDocument: null,
        militaryPowerDocument: null,

        greaterThan15k: '',
    }

    @api additionalRequiredDocumentsData = {
        isThereAWill: '',
        //No
        resolutionOfDeclarationOfHeirsDocument: null,
        //Yes will in PR
        willDocument: null,
        certificationRegistroPoderesTestamentosDocument: null,
        resolutionTestamentaryLettersExecutorDocument: null,
        //Yes will in US
        lastWillAndTestamentDocument: null,
        lettersOfAdministrationOrSmallEstateProcedureDocument: null,
        //Greater than 15k
        certificateReleaseTaxLienEstateReturnDetallesBienesDocument: null,
        //Other
        advancementOrDisbursementRequirementsDocument: null,
    }; //Needs Further Consideration
/**
 * 
 * willDocument
certificationRegistroPoderesTestamentosDocument
resolutionTestamentaryLettersExecutorDocument
advancementOrDisbursementRequirementsDocument
 */
    @track showGreaterThan15kAdditionalDocumentUpload = false;
    showToast(title, message, variant, mode) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(event);
    }
    verifyFormCompletion() {
        const formDataArray = [
                            {name:'deceasedCustomerInformationData', formData:this.deceasedCustomerInformationData},
                            {name:'requestorInformationData', formData:this.requestorInformationData},
                            {name:'disbursementInformationData', formData:this.disbursementInformationData},
                            {name:'additionalRequiredDocumentsData', formData:this.additionalRequiredDocumentsData}
                        ]
        for(let form of formDataArray){
            if(form.name === 'deceasedCustomerInformationData' || form.name === 'requestorInformationData'){
                for(let dataKey of Object.keys(form.formData)){
                    console.log(dataKey, form.formData[dataKey]);
                    if(!form.formData[dataKey] || form.formData[dataKey] === '' || form.formData[dataKey] === null){
                        return false;
                    }
                }
                continue;
            } 
            else if(form.name === 'disbursementInformationData'){
                
                for (let dataKey of Object.keys(form.formData)) {
                    console.log(dataKey, form.formData[dataKey]);
                    if(dataKey === 'accId'){
                        continue;
                    }
                    const disbursementPreference = form.formData['disbursementPreference'];
                    if(!disbursementPreference || disbursementPreference === '' || disbursementPreference === null){
                        return false;
                    }
                    else if(dataKey !== 'disbursementPreference' && disbursementPreference.toLowerCase() === 'account deposit'){
                        if(
                            (dataKey !=='pickUpCheckWillAllHeirsPresent' && 
                            dataKey !=='pickUpCheckNonPresentHeirLocationOptions' &&
                            dataKey !=='affidavitPowerOfAttorneyPRCheckAuthorizationDocument' &&
                            dataKey !=='affidavitPowerOfAttorneyUSClerkCertificateDocument' &&
                            dataKey !=='apostilleIssuanceCountryDocument' &&
                            dataKey !== 'pickUpCheckBranchTown' && 
                            dataKey !== 'pickUpCheckBranch' && 
                            dataKey !=='militaryPowerDocument') && 
                            (!form.formData[dataKey] || form.formData[dataKey] === '' || form.formData[dataKey] === null)){
                            return false;
                        }
                        continue
                    }
                    else if(dataKey !== 'disbursementPreference' && disbursementPreference.toLowerCase() === 'pick-up at branch'){
                        console.log('In Pickup at Branch', dataKey ,form.formData[dataKey]);
                        if( (   
                                dataKey !== 'accountHolderName' && 
                                dataKey !== 'disbursementAccountNumber' && 
                                dataKey !== 'heirsDisbursementAuthorizationDocument' && 
                                dataKey !== 'pickUpCheckWillAllHeirsPresent' && 
                                dataKey !== 'pickUpCheckNonPresentHeirLocationOptions' && 
                                dataKey !== 'affidavitPowerOfAttorneyPRCheckAuthorizationDocument' && 
                                dataKey !== 'affidavitPowerOfAttorneyUSClerkCertificateDocument'  && 
                                dataKey !== 'apostilleIssuanceCountryDocument' && 
                                dataKey !== 'militaryPowerDocument') && 
                            (   !form.formData[dataKey] || 
                                form.formData[dataKey] === '' || 
                                form.formData[dataKey] === null)){
                            return false;
                        }
                        if(dataKey === 'pickUpCheckWillAllHeirsPresent'){
                            const pickUpCheckWillAllHeirsPresent = form.formData['pickUpCheckWillAllHeirsPresent'];
                            if(!pickUpCheckWillAllHeirsPresent || pickUpCheckWillAllHeirsPresent==='' || pickUpCheckWillAllHeirsPresent === null){
                                console.log('Will All Heirs Be Present? Is Falsy');
                                return false;
                            }
                            if(pickUpCheckWillAllHeirsPresent.toLowerCase() === 'no'){
                                const pickUpCheckNonPresentHeirLocationOptions = form.formData['pickUpCheckNonPresentHeirLocationOptions'];
                                if(!pickUpCheckNonPresentHeirLocationOptions.length){
                                    console.log("pickUpCheckNonPresentHeirLocationOptions is empty");
                                    return false;
                                }
                                for(let location of pickUpCheckNonPresentHeirLocationOptions){
                                    switch (location) {
                                        case 'Active Duty in US Armed Forces':
                                            console.log("Active Duty in US Armed Forces has been Chosen");
                                            if(!form.formData['militaryPowerDocument']){
                                                console.log("Missing Document");
                                                return false;
                                            }
                                            break;
                                        case 'Puerto Rico':
                                            if(!form.formData['affidavitPowerOfAttorneyPRCheckAuthorizationDocument']){
                                                return false;
                                            }
                                            break;
                                        case 'Unites States':
                                            if(!form.formData['affidavitPowerOfAttorneyUSClerkCertificateDocument']){
                                                return false;
                                            }
                                            break;
                                        case 'Foreign Country':
                                            if(!form.formData['apostilleIssuanceCountryDocument']){
                                                return false;
                                            }
                                            break;
                                    
                                        default:
                                            break;
                                    }
                                }
                            }
                        }   
                    }
                }
            }
            else if (form.name === 'additionalRequiredDocumentsData'){
                console.log("In Additional");
                for(let dataKey of Object.keys(form.formData)){
                    const isThereAWill = form.formData['isThereAWill'];
                    // console.log(isThereAWill.toLowerCase(), 'yes, will in pr', );
                    if(!isThereAWill){
                        console.log("Will missing!");
                        return false
                    }
                    else if(dataKey !== 'isThereAWill' && isThereAWill.toLowerCase() === 'yes, will in pr'){
                        console.log('In Yes, Will In PR', dataKey, form.formData[dataKey], !form.formData[dataKey] );
                        if((dataKey === 'willDocument' || 
                            dataKey === 'certificationRegistroPoderesTestamentosDocument' || 
                            dataKey === 'resolutionTestamentaryLettersExecutorDocument' || 
                            dataKey === 'advancementOrDisbursementRequirementsDocument') && 
                            (   !form.formData[dataKey] || 
                                form.formData[dataKey] === '' || 
                                form.formData[dataKey] === null) ){
                                    return false
                        }
                    }
                    else if(dataKey !== 'isThereAWill' && isThereAWill.toLowerCase() === 'yes, will in us'){
                        if((dataKey === 'lastWillAndTestamentDocument' || 
                            dataKey === 'lettersOfAdministrationOrSmallEstateProcedureDocument' || 
                            // dataKey === 'certificateReleaseTaxLienEstateReturnDetallesBienesDocument' || 
                            dataKey === 'advancementOrDisbursementRequirementsDocument') && 
                            (   !form.formData[dataKey] || 
                                form.formData[dataKey] === '' || 
                                form.formData[dataKey] === null) ){
                                    return false
                        }
                    }
                    else if(dataKey !== 'isThereAWill' && isThereAWill.toLowerCase() === 'no, without will'){
                        if((dataKey === 'resolutionOfDeclarationOfHeirsDocument' ||
                            dataKey === 'advancementOrDisbursementRequirementsDocument') && 
                            (   !form.formData[dataKey] || 
                                form.formData[dataKey] === '' || 
                                form.formData[dataKey] === null) ){
                                    return false
                        }
                    }
                    if(dataKey !== 'isThereAWill' && this.disbursementInformationData['greaterThan15k'].toLowerCase() === 'yes'){
                        if(dataKey === 'certificateReleaseTaxLienEstateReturnDetallesBienesDocument' && 
                            (   !form.formData[dataKey] || 
                                form.formData[dataKey] === '' || 
                                form.formData[dataKey] === null) ){
                                    return false
                        }
                    }
                }
            }

            // console.log(form.name , form.name === 'additionalRequiredDocumentsData');
        }

        return true
    }
    handleCheckbox(event) {
        if (event.target.name === 'legalAgreementCheckbox') {
            if (event.target.checked) {
                this.legalAgreementCheckbox = true;
            } else {
                this.legalAgreementCheckbox = false;
            }
        }
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
            if(!this.verifyFormCompletion()){
                this.showToast("Error", "Please All Fields Must Be Filled", 'error', 'sticky')
                return
            }
            else if (!this.reCaptchaSuccess) {
                this.showToast("Error", "Please Complete The reCAPTCHA.", 'error', 'sticky')
                return
            }
            else if (!this.legalAgreementCheckbox) {
                this.showToast("Error", "To continue please read and agree to the terms.", 'error', 'sticky')
                return
            }
            else{
                
                if(this.buttonActive){
                    this.buttonActive = false;
                } else{
                    this.showToast("Warning", "Your request is being processed, please hold", 'warning', 'sticky')
                    return
                }
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

            // Death certificate
            if (this.deceasedCustomerInformationData.deathCertificate) {
                pdfPromises.push(
                    readFileAsBase64(this.deceasedCustomerInformationData.deathCertificate)
                        .then(base64 => ({
                            name: "Death-Certificate.pdf",
                            base64
                        }))
                );
            }

            // Heirs disbursement authorization document
            if (this.disbursementInformationData.heirsDisbursementAuthorizationDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.heirsDisbursementAuthorizationDocument)
                        .then(base64 => ({
                            name: "Heirs-Authorized-To-Disburse-In-The-Account.pdf",
                            base64
                        }))
                );
            }
            if (this.disbursementInformationData.affidavitPowerOfAttorneyPRCheckAuthorizationDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.affidavitPowerOfAttorneyPRCheckAuthorizationDocument)
                        .then(base64 => ({
                            name: "PR-Affidavit-Power-Of-Attorney_Auth-3rd-Party_Receive-Endorce-Exchange-Check.pdf",
                            base64
                        }))
                );
            }
            if (this.disbursementInformationData.affidavitPowerOfAttorneyUSClerkCertificateDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.affidavitPowerOfAttorneyUSClerkCertificateDocument)
                        .then(base64 => ({
                            name: 'US-Affidavit-Power-Of-Attorney_Country-Clerk-Certificate-Issuance-State.pdf',
                            base64
                        }))
                );
            }
            if (this.disbursementInformationData.apostilleIssuanceCountryDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.apostilleIssuanceCountryDocument)
                        .then(base64 => ({
                            name: 'Apostille-From-Issuance-Country.pdf',
                            base64
                        }))
                );
            }
            if (this.disbursementInformationData.militaryPowerDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.disbursementInformationData.militaryPowerDocument)
                        .then(base64 => ({
                            name: 'Military-Power.pdf',
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.resolutionOfDeclarationOfHeirsDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.resolutionOfDeclarationOfHeirsDocument)
                        .then(base64 => ({
                            name: 'Resolution-Of-Declaration-Of-Heirs.pdf',
                            base64
                        }))
                );
            }
            // Will
            if (this.additionalRequiredDocumentsData.willDocument) {
                console.log(JSON.stringify(this.additionalRequiredDocumentsData.willDocument.name))
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.willDocument)
                        .then(base64 => ({
                            name: 'Will.pdf',
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.certificationRegistroPoderesTestamentosDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.certificationRegistroPoderesTestamentosDocument)
                        .then(base64 => ({
                            name: "Certification-From-Registro-de-Poderes-y-Testamentos.pdf",
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.resolutionTestamentaryLettersExecutorDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.resolutionTestamentaryLettersExecutorDocument)
                        .then(base64 => ({
                            name: 'Resolution-Of-Testamentary-Letters.pdf',
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.lastWillAndTestamentDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.lastWillAndTestamentDocument)
                        .then(base64 => ({
                            name: 'Last-Will-And-Testament.pdf',
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.lettersOfAdministrationOrSmallEstateProcedureDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.lettersOfAdministrationOrSmallEstateProcedureDocument)
                        .then(base64 => ({
                            name: 'Letters-Of-Administration-Granted-By-Surrogate-Of-Probate-Court_Substitute-Document.pdf',
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.certificateReleaseTaxLienEstateReturnDetallesBienesDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.certificateReleaseTaxLienEstateReturnDetallesBienesDocument)
                        .then(base64 => ({
                            name: "Certificate-Of-Release-Of-Tax-Lien-w-Estate-Tax-Return_Including-Detalles-de-Bienes-addendum.pdf",
                            base64
                        }))
                );
            }
            if (this.additionalRequiredDocumentsData.advancementOrDisbursementRequirementsDocument) {
                pdfPromises.push(
                    readFileAsBase64(this.additionalRequiredDocumentsData.advancementOrDisbursementRequirementsDocument)
                        .then(base64 => ({
                            name: 'Requirements-For-Advancement_Disbursement-Of-Deceased-Customer-Funds.pdf',
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
                        .then((results) => {
                            console.log('Case Created');
                            const toasMessage = `Your request is being processed. Case  ${results[1]} was created.\n
                                                 Today you will receive an email confirming we got to your request with your ticket number. We will send the email to the one you input in the form\n\n
                                                 Your request should be processed by 20 business days. We will send you and email indicating if your request was approved or denied.
`;
                            this.showToast("Success!", toasMessage, "success");
                            setTimeout(() => {
                                window.location.replace(`https://resilient-badger-m2qcfb-dev-ed.trailblaze.my.site.com/LiquidationOfDepositFunds/s/case/${results[0]}/detail`)
                            }, 2000);
                        })
                        .catch(error => {
                            console.log(error);
                            this.showToast("Error!", "Unable to create Case", "error");
                            this.buttonActive = true
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