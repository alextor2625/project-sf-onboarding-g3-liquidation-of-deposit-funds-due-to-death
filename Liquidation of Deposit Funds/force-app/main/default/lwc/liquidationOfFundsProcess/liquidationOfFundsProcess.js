import { LightningElement } from 'lwc';

export default class LiquidationOfFundsProcess extends LightningElement {
    options = [
        { label: "Select request type", value: "" },
        { label: "Advance Funds For Unpaid Funeral Expenses", value: "No Link" },
        { label: "General Advance Of Available Funds Or Certification Of Bank", value: "https://popular.com/processing-estate" },
        { label: "Liquidation Funds", value: "Liquidation Funds" }
    ];

    selectedValue = '';
    showRequiredDocuments = false;
    showContinueButton = false;
    disableButton = true;
    message = null;

    handleSelection(event) {
        this.selectedValue = event.target.value;

        switch (this.selectedValue) {
            case "Liquidation Funds":
                this.showRequiredDocuments = true;
                this.showContinueButton = false;
                this.disableButton = true;
                this.message = 'Please verify the documents required below.';
                break;
            case "https://popular.com/processing-estate":
                this.showRequiredDocuments = false;
                this.showContinueButton = true;
                this.disableButton = false;
                this.message = 'By clicking continue you will be redirected to another page.';
                break;
            case "No Link":
                this.showRequiredDocuments = false;
                this.showContinueButton = true;
                this.disableButton = true;
                this.message = 'This Request Type is not available at this time.';
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