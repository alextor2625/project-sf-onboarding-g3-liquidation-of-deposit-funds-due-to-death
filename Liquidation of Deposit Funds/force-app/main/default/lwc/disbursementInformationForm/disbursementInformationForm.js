import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DisbursementInformationForm extends LightningElement {
    greaterThan15kOptions = [
        { label: 'Select Yes/No/Don\'t know', value: '' },
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'Don\'t know', value: 'don\'t know' },
    ]
    disbursementPreferenceOptions = [
        { label: "Select Disbursement preference", value: '' },
        { label: 'Account deposit', value: 'Account deposit' },
        { label: 'Pick-up at branch', value: 'Pick-up at branch' }
    ]

    @api disbursementInformationData;
    showAccountDepositSection;
    showPickUpCheckSection;

    get accountDepositSectionClass() {
        if (this.showAccountDepositSection) {
            return 'account-deposit-section';
        }
        return 'hidden';
    }
    get pickUpCheckSectionClass() {
        return this.showPickUpCheckSection ? 'pick-up-check-section' : 'hidden';
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.disbursementInformationData = {...this.disbursementInformationData, [name]:value}
        console.log("Testing handle Change", JSON.stringify(this.disbursementInformationData))
        this.dispatchEvent(new CustomEvent('disbursementinformationdatachange', {
            detail: {
                disbursementInformationData: this.disbursementInformationData,
                eventName: 'disbursementinformationdatachange'
            }
        }));

    }
    handleSelection(event) {
        const name = event.target.name
        const selectedValue = event.target.value;
        console.log('Name: ', name, name === 'disbursementPreference')
        console.log('Value: ', selectedValue, selectedValue === "Account deposit")
        if (name === 'disbursementPreference') {
            this.disbursementInformationData = {...this.disbursementInformationData, [name]:selectedValue}
            switch (selectedValue) {
                case "Account deposit":
                    console.log('Im In Account Deposit')
                    this.showAccountDepositSection = true;
                    this.showPickUpCheckSection = false;
                    break;
                case "Pick-up at branch":
                    this.showPickUpCheckSection = true;
                    this.showAccountDepositSection = false;
                    break;
                default:
                    this.showPickUpCheckSection = false;
                    this.showAccountDepositSection = false;

                    break;
            }
            this.dispatchEvent(new CustomEvent('disbursementinformationdatachange', {
                detail: {
                    disbursementInformationData: this.disbursementInformationData,
                    eventName: 'disbursementinformationdatachange'
                }
            }));
        }
        else if (name === 'greaterThan15k') {
            console.log("Im dispatching greaterThan15k")
            this.disbursementInformationData = {...this.disbursementInformationData, [name]:selectedValue}
            this.dispatchEvent(new CustomEvent('disbursementinformationdatachange', {
                detail: {
                    disbursementInformationData: this.disbursementInformationData,
                    eventName: 'disbursementinformationdatachange'
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
            fileInputElement.style.color = file ? 'red' : '';
            const name = event.target.name;
            this.disbursementInformationData = { ...this.disbursementInformationData, [name]: file };
            // // Dispatch the event with updated data
            this.dispatchEvent(new CustomEvent('disbursementinformationdatachange', {
                detail: {
                    disbursementInformationData: this.disbursementInformationData,
                    eventName: 'disbursementinformationdatachange'
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