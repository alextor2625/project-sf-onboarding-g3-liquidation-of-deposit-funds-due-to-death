import { api, LightningElement } from 'lwc';
import getCurrentUser from '@salesforce/apex/UserController.getCurrentUser';

export default class RequestorInformationForm extends LightningElement {

    @api requestorInformationData;
    relationshipSelectedValue = ''
    relationshipOptions = [
        { label: 'Relationship', value: '' },
        { label: 'Father', value: 'Father' },
        { label: 'Mother', value: 'Mother' },
        { label: 'Brother', value: 'Brother' },
        { label: 'Sister', value: 'Sister' },
        { label: 'Son', value: 'Son' },
        { label: 'Daughter', value: 'Daughter' },
        { label: 'Grandfather', value: 'Grandfather' },
        { label: 'Grandmother', value: 'Grandmother' },
        { label: 'Grandson', value: 'Grandson' },
        { label: 'Granddaughter', value: 'Granddaughter' },
        { label: 'Uncle', value: 'Uncle' },
        { label: 'Aunt', value: 'Aunt' },
        { label: 'Nephew', value: 'Nephew' },
        { label: 'Niece', value: 'Niece' },
        { label: 'Cousin', value: 'Cousin' },
        { label: 'Stepfather', value: 'Stepfather' },
        { label: 'Stepmother', value: 'Stepmother' },
        { label: 'Stepbrother', value: 'Stepbrother' },
        { label: 'Stepsister', value: 'Stepsister' },
        { label: 'Husband', value: 'Husband' },
        { label: 'Wife', value: 'Wife' },
        { label: 'Fiancé', value: 'Fiancé' },
        { label: 'Fiancée', value: 'Fiancée' },
        { label: 'Spouse', value: 'Spouse' },
    ];
    relationshipPHClass() {
        const element = this.template.querySelector('.selector-input');
        return element.value !== '' ? element.classList.remove('place-holder-text') : element.classList.add('place-holder-text');
    }

    async connectedCallback() {
        try {
            console.log("Getting User!")
            const record = await getCurrentUser();
            this.requestorInformationData = {
                ...this.requestorInformationData,
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