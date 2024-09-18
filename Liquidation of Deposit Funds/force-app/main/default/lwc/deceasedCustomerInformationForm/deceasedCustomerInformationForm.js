import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeceasedCustomerInformationForm extends LightningElement {
    @api deceasedCustomerInformationData;

    firstNameErrorMessage ='';
    lastNameErrorMessage ='';
    ssnErrorMessage ='';
    dateOfDeathErrorMessage ='';
    uploadButtonErrorMessage = '';

    // connectedCallback() {
    //     console.log("Im logging");
    // }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        if(value == '' || value == null){
            switch (name){
                case 'firstName':
                    this.firstNameErrorMessage = 'Please enter a first name';
                    break;
                case 'lastName':
                    this.lastNameErrorMessage = 'Please enter a last name';
                    break;
                case 'ssn':
                    this.ssnErrorMessage = 'Please enter a valid SSN';
                    break;
                case 'dateOfDeath':
                    this.dateOfDeathErrorMessage = 'Please enter a date of death';
                    break;
            }
            event.target.value = '';
        }else{
            
            this.firstNameErrorMessage = ''
            this.lastNameErrorMessage = ''
            this.ssnErrorMessage = ''
            this.dateOfDeathErrorMessage = ''


            // Update the data object
            this.deceasedCustomerInformationData = { ...this.deceasedCustomerInformationData, [name]: value };
            console.log(this.deceasedCustomerInformationData.dateOfDeath);
            // Dispatch the event with updated data
            this.dispatchEvent(new CustomEvent('deccustinfodatachange', {
                detail: {
                    deceasedCustomerInformationData: this.deceasedCustomerInformationData,
                    eventName: 'deccustinfodatachange'
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
        } else if(!file){
            this.uploadButtonErrorMessage = "Please select a valid PDF file";
        }
        else {
            this.uploadButtonErrorMessage = '';
            const fileName = file.name;
            const fileInputElement = this.template.querySelector('.upload-button');
            fileInputElement.textContent = file ? fileName : 'Upload Death Certificate'; 
            fileInputElement.style.color = file ? 'red' : '';
            const name = event.target.name;
            console.log('FILE:', JSON.stringify(file));
            file.name = "Death-Certificate";
            this.deceasedCustomerInformationData = { ...this.deceasedCustomerInformationData, [name]: file };
            // Dispatch the event with updated data
            this.dispatchEvent(new CustomEvent('deccustinfodatachange', {
                detail: {
                    deceasedCustomerInformationData: this.deceasedCustomerInformationData,
                    eventName: 'deccustinfodatachange'
                }
            }));

            console.log('Selected file:', file.name);
        }
    }

    triggerFileUpload() {
        // Get the hidden file input and trigger the click programmatically
        const fileInput = this.template.querySelector('[data-file-input="deathCertificate"]');
        fileInput.click(); // Trigger file input click
    }


}