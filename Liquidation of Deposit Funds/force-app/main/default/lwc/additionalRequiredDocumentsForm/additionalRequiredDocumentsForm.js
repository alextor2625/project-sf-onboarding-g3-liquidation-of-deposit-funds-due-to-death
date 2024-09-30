import { api, LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import InfoLabel from '@salesforce/label/c.Additional_Required_Docs_1'

export default class AdditionalRequiredDocumentsForm extends LightningElement {

    @track infoLabel = {};
    @track isThereAWillOptions;

    connectedCallback(){
            this.infoLabel = JSON.parse(InfoLabel);

            this.isThereAWillOptions = [
                {label: this.infoLabel.t12, value: ''},
                {label: this.infoLabel.t13, value: 'Yes, Will in PR'},
                {label: this.infoLabel.t14, value: 'Yes, Will in USA'},
                {label: this.infoLabel.t15, value: 'No, without Will'},
            ]
    }

    @api additionalRequiredDocumentsData;
    @api showGreaterThan15kAdditionalDocumentUpload;

    showResolutionOfDeclarationOfHeirsDocument=false
    showWillDocument=false
    showCertificationRegistroPoderesTestamentosDocument=false
    showResolutionTestamentaryLettersExecutorDocument=false
    showLastWillAndTestamentDocument=false
    showLettersOfAdministrationOrSmallEstateProcedureDocument=false
    // showCertificateReleaseTaxLienEstateReturnDetallesBienesDocument=false
    showAdvancementOrDisbursementRequirementsDocument=false

    get resolutionOfDeclarationOfHeirsDocumentClass(){
        return this.showResolutionOfDeclarationOfHeirsDocument? "additional-required-document-upload": "hidden";
    }
    get willDocumentClass(){
        return this.showWillDocument? "additional-required-document-upload": "hidden";
    }
    get certificationRegistroPoderesTestamentosDocumentClass(){
        return this.showCertificationRegistroPoderesTestamentosDocument? "additional-required-document-upload": "hidden";
    }
    get resolutionTestamentaryLettersExecutorDocumentClass(){
        return this.showResolutionTestamentaryLettersExecutorDocument? "additional-required-document-upload": "hidden";
    }
    get lastWillAndTestamentDocumentClass(){
        return this.showLastWillAndTestamentDocument? "additional-required-document-upload": "hidden";
    }
    get lettersOfAdministrationOrSmallEstateProcedureDocumentClass(){
        return this.showLettersOfAdministrationOrSmallEstateProcedureDocument? "additional-required-document-upload": "hidden";
    }
    get certificateReleaseTaxLienEstateReturnDetallesBienesDocumentClass(){
        return this.showGreaterThan15kAdditionalDocumentUpload? "additional-required-document-upload": "hidden";
    }
    get advancementOrDisbursementRequirementsDocumentClass(){
        return this.showAdvancementOrDisbursementRequirementsDocument? "additional-required-document-upload": "hidden";
    }

    pHClass(name) {
        const elem = this.template.querySelector(`[name=${name}]`);
        elem.value !== '' ? elem.classList.remove('place-holder-text') : elem.classList.add('place-holder-text')
    }


    handleSelection(event) {
        const name = event.target.name
        const selectedValue = event.target.value;
        if (name) {
            this.pHClass(name);
        }

        this.additionalRequiredDocumentsData = { ...this.additionalRequiredDocumentsData, [name]: selectedValue }
        if (name === 'isThereAWill') {
            switch (selectedValue) {
                case "Yes, Will in PR":
                    this.showWillDocument=true
                    this.showCertificationRegistroPoderesTestamentosDocument=true
                    this.showResolutionTestamentaryLettersExecutorDocument=true

                    this.showAdvancementOrDisbursementRequirementsDocument=true

                    this.showResolutionOfDeclarationOfHeirsDocument = false
                    this.showLastWillAndTestamentDocument=false
                    this.showLettersOfAdministrationOrSmallEstateProcedureDocument=false
                    break;
                    case "Yes, Will in USA":
                        this.showLastWillAndTestamentDocument=true
                        this.showLettersOfAdministrationOrSmallEstateProcedureDocument=true
                        this.showAdvancementOrDisbursementRequirementsDocument=true
                        
                        this.showResolutionOfDeclarationOfHeirsDocument = false
                        this.showWillDocument=false
                        this.showCertificationRegistroPoderesTestamentosDocument=false
                        this.showResolutionTestamentaryLettersExecutorDocument=false
                    break;
                case "No, without Will":
                    this.showResolutionOfDeclarationOfHeirsDocument = true
                    this.showAdvancementOrDisbursementRequirementsDocument=true

                    this.showLastWillAndTestamentDocument=false
                    this.showLettersOfAdministrationOrSmallEstateProcedureDocument=false
                    this.showWillDocument=false
                    this.showCertificationRegistroPoderesTestamentosDocument=false
                    this.showResolutionTestamentaryLettersExecutorDocument=false
                    break;
                default:
                    this.showWillDocument=false
                    this.showCertificationRegistroPoderesTestamentosDocument=false
                    this.showResolutionTestamentaryLettersExecutorDocument=false
                    this.showLastWillAndTestamentDocument=false
                    this.showLettersOfAdministrationOrSmallEstateProcedureDocument=false
                    this.showResolutionOfDeclarationOfHeirsDocument=false
                    this.showAdvancementOrDisbursementRequirementsDocument=false
                    break;
            }
            this.dispatchEvent(new CustomEvent('additionaldocumentsdatachange', {
                detail: {
                    additionalRequiredDocumentsData: this.additionalRequiredDocumentsData,
                    eventName: 'additionaldocumentsdatachange'
                }
            }));
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        if (file.type !== 'application/pdf') {
            this.showToast("Incorrect File Type", "Only PDF files can be uploaded!", "danger");
            event.target.files = [];
            this.uploadButtonErrorMessage = "Please select a valid PDF file";
        } else if (!file) {
            this.uploadButtonErrorMessage = "Please select a valid PDF file";
        }
        else {
            this.uploadButtonErrorMessage = '';
            const fileName = file.name;
            console.log(file.name);
            const fileInputElements = this.template.querySelectorAll('.upload-button');
            const fileInputElement = [...fileInputElements].find(elem => elem.dataset.name == event.target.name)
            // console.log(fileInputElement);
            fileInputElement.textContent = file ? fileName : 'Upload Document';
            fileInputElement.style.color = file ? 'var(--popular-blue)' : '';
            const name = event.target.name;
            this.additionalRequiredDocumentsData = { ...this.additionalRequiredDocumentsData, [name]: file };
            // // Dispatch the event with updated data
            this.dispatchEvent(new CustomEvent('additionaldocumentsdatachange', {
                detail: {
                    additionalRequiredDocumentsData: this.additionalRequiredDocumentsData,
                    eventName: 'additionaldocumentsdatachange'
                }
            }));

        }
    }

    triggerFileUpload(event) {
        // Get the hidden file input and trigger the click programmatically
        const fileInput = this.template.querySelector(`[data-file-input="${event.target.dataset.name}"]`);
        fileInput.click(); // Trigger file input click
    }
}