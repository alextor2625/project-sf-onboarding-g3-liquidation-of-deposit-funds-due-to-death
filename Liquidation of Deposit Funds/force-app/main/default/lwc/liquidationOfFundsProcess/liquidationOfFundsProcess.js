import { api, LightningElement, track } from 'lwc';
import isLoggedIn from '@salesforce/apex/UserController.isLoggedIn'
import InfoLabel1 from '@salesforce/label/c.Process_Info_1'


export default class LiquidationOfFundsProcess extends LightningElement {

    @track infoLabel1 = {};
    @track options;

    @api isLoggedIn;
    async connectedCallback(){
        this.infoLabel1 = JSON.parse(InfoLabel1);
        console.log("First options label: ", this.infoLabel1.t5);
   
        this.options = [
            { label: this.infoLabel1.t5, value: "" },
            { label: this.infoLabel1.t6, value: "No Link" },
            { label: this.infoLabel1.t7, value: "https://popular.com/processing-estate" },
            { label: this.infoLabel1.t8, value: "Liquidation Funds" }
        ];

        this.isLoggedIn = await isLoggedIn();
    }

    @track selectedValue = '';
    @track showRequiredDocuments = false;
    @track showContinueButton = false;
    @track disableButton = true;
    @track message = null;

    get liquidationOfFundsRequiredDocumentsClass(){
        return this.showRequiredDocuments? 'liquidation-of-funds-required-documents-container': 'hidden';
    }

    handleSelection(event) {
        this.selectedValue = event.target.value;

        switch (this.selectedValue) {
            case "Liquidation Funds":
                this.showRequiredDocuments = true;
                this.showContinueButton = false;
                this.disableButton = true;
                this.message = this.infoLabel1.t9;
                break;
            case "https://popular.com/processing-estate":
                this.showRequiredDocuments = false;
                this.showContinueButton = true;
                this.disableButton = false;
                this.message = this.infoLabel1.t10;
                break;
            case "No Link":
                this.showRequiredDocuments = false;
                this.showContinueButton = true;
                this.disableButton = true;
                this.message = this.infoLabel1.t11;
                break;
            default:
                this.showRequiredDocuments = false;
                this.showContinueButton = false;
                this.disableButton = true;
                this.message = null;
                break;
        }
    }
}