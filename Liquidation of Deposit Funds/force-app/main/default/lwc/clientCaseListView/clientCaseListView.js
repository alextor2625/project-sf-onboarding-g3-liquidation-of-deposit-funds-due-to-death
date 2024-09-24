import { LightningElement, wire } from 'lwc';
import getClientCases from '@salesforce/apex/ClientCaseController.getClientCases';

export default class ClientCaseListView extends LightningElement {
    cases;
    error;

    @wire(getClientCases)
    wiredCases({error, data}){
        if (data){
            // this.cases = data;
            this.cases = data.map((caseRecord) => {
                return {
                    ...caseRecord,
                    formattedDate: new Date(caseRecord.CreatedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            });
            this.error = undefined;
            console.log("Data received!: ", data);
        } else if (error){
            this.error = error;
            this.cases = undefined;
            console.log("Error getting cases!: ", error);
        }
    }

    get hasCases(){
        return this.cases && this.cases.length > 0;
    }

}