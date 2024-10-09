import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { LightningElement, api, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import WORKFLOW_STATUS_FIELD from "@salesforce/schema/Case.Workflow_Status__c";
// import ACCOUNT_FIRSTNAME_FIELD from "@salesforce/schema/Case.Account_First_Name__c";

export default class CaseStatusClientView extends LightningElement {

    @api recordId;

    @wire(CurrentPageReference)
    getPageRef(pageRef){
        console.log('getting page ref: ', pageRef);
        if (pageRef.attributes.recordId){
            this.recordId = pageRef.attributes.recordId;
            console.log('recordId after page ref: ', this.recordId);
        }
    }

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [WORKFLOW_STATUS_FIELD],
        // optionalFields: [ACCOUNT_FIRSTNAME_FIELD],
    })
    case;

    get selectedStatus(){
        const status = getFieldValue(this.case.data, WORKFLOW_STATUS_FIELD);
        console.log('selected status: ', status);
        return status === 'Hold' ? 'In-Progress' : status;
    }


}