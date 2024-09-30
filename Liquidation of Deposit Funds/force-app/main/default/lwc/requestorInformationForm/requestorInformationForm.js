import { api, LightningElement, track } from 'lwc';
import getCurrentUser from '@salesforce/apex/UserController.getCurrentUser';
import InfoLabel from '@salesforce/label/c.Requestor_Info'

export default class RequestorInformationForm extends LightningElement {

    @track infoLabel = {};
    @track relationshipOptions;

    @api requestorInformationData;
    relationshipSelectedValue = ''
    
    relationshipPHClass() {
        const element = this.template.querySelector('.selector-input');
        return element.value !== '' ? element.classList.remove('place-holder-text') : element.classList.add('place-holder-text');
    }

    async connectedCallback() {
        try {
            console.log("Getting User!")

            this.infoLabel = JSON.parse(InfoLabel);

            this.relationshipOptions = [
                { label: this.infoLabel.t4, value: '' },
                { label: this.infoLabel.t8, value: 'Father' },
                { label: this.infoLabel.t9, value: 'Mother' },
                { label: this.infoLabel.t10, value: 'Brother' },
                { label: this.infoLabel.t11, value: 'Sister' },
                { label: this.infoLabel.t12, value: 'Son' },
                { label: this.infoLabel.t13, value: 'Daughter' },
                { label: this.infoLabel.t14, value: 'Grandfather' },
                { label: this.infoLabel.t15, value: 'Grandmother' },
                { label: this.infoLabel.t16, value: 'Grandson' },
                { label: this.infoLabel.t17, value: 'Granddaughter' },
                { label: this.infoLabel.t18, value: 'Uncle' },
                { label: this.infoLabel.t19, value: 'Aunt' },
                { label: this.infoLabel.t20, value: 'Nephew' },
                { label: this.infoLabel.t21, value: 'Niece' },
                { label: this.infoLabel.t22, value: 'Cousin' },
                { label: this.infoLabel.t23, value: 'Stepfather' },
                { label: this.infoLabel.t24, value: 'Stepmother' },
                { label: this.infoLabel.t25, value: 'Stepbrother' },
                { label: this.infoLabel.t26, value: 'Stepsister' },
                { label: this.infoLabel.t27, value: 'Husband' },
                { label: this.infoLabel.t28, value: 'Wife' },
                { label: this.infoLabel.t29, value: 'Fiancé' },
                { label: this.infoLabel.t30, value: 'Fiancée' },
                { label: this.infoLabel.t31, value: 'Spouse' },
            ];

            const record = await getCurrentUser();
            this.requestorInformationData = {
                ...this.requestorInformationData,
                accId: record.ContactId,
                email: record.Email ? record.Email : '',
                preferredPhoneNumber: record.Phone ? record.Phone : '',
                firstName: record.FirstName ? record.FirstName : '',
                lastName: record.LastName ? record.LastName : ''
            }
            console.log("Success!!")
        } catch (error) {
            console.error(error.message)
        }
    }


    firstNameErrorMessage = '';
    lastNameErrorMessage = '';
    relationshipErrorMessage = '';
    emailErrorMessage = '';
    preferredPhoneNumberErrorMessage = '';
    otherPhoneNumberErrorMessage = '';

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log('Event')
        if(name === 'relationship'){
            this.relationshipPHClass();
        }

        if (value == '' || value == null) {
            switch (name) {
                case 'firstName':
                    this.firstNameErrorMessage = 'Please enter a first name.';
                    break;
                case 'lastName':
                    this.lastNameErrorMessage = 'Please enter a last name.';
                    break;
                case 'relationship':
                    this.relationshipErrorMessage = 'Please enter a valid relationship.';
                    break;
                case 'email':
                    this.dateOfDeathErrorMessage = 'Please enter a valid email address.';
                    break;
                case 'preferredPhoneNumber':
                    this.preferredPhoneNumberErrorMessage = 'Please enter a valid phone number.';
                    break;
            }
            event.target.value = '';
        } else {

            this.firstNameErrorMessage = '';
            this.lastNameErrorMessage = '';
            this.relationshipErrorMessage = '';
            this.emailErrorMessage = '';
            this.preferredPhoneNumberErrorMessage = '';
            this.otherPhoneNumberErrorMessage = '';


            // Update the data object
            this.requestorInformationData = { ...this.requestorInformationData, [name]: value };
            // Dispatch the event with updated data
            this.dispatchEvent(new CustomEvent('requestorinformationdatachange', {
                detail: {
                    requestorInformationData: this.requestorInformationData,
                    eventName: 'requestorinformationdatachange'
                }
            }));

        }

    }

}