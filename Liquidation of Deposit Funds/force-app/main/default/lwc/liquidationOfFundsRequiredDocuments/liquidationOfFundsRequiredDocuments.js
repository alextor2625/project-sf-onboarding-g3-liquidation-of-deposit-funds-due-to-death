import { LightningElement, track } from 'lwc';

export default class LiquidationOfFundsRequiredDocuments extends LightningElement {
    // Options for the dropdown
    options = [
        { label: "Select Yes/No", value: "" },
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
    ];

    // Reactive tracked properties
    @track redirectLink = '';
    @track showMessage = false;
    @track showButton = false;
    @track message = '';
    @track wrapperClass = 'wrapper';
    @track warningClass = 'warning-inactive';
    @track buttonContainerClass = 'btn-container-inactive';

    // Handle selection from the dropdown
    handleSelected(event) {
        const selected = event.target.value;

        switch (selected) {
            case "yes":
                this.redirectLink = "https://resilient-badger-m2qcfb-dev-ed.trailblaze.my.site.com/LiquidationOfDepositFunds/login?startURL=%2FLiquidationOfDepositFunds%2Fs%2F%3Ft%3D1726178366307";
                // this.showMessage = false; // Reset showMessage for fade effect
                setTimeout(() => {
                    this.showMessage = true;
                    this.warningClass = 'warning-active';
                    setTimeout(()=>{
                        this.showButton = true;
                        this.buttonContainerClass = 'btn-container-active';    
                    },250)
                }, 500); // Delayed message display for fade-in effect
                this.wrapperClass = 'wrapper-selected-yes';
                this.message = 'By clicking continue you will be redirected to a registration page.';
                break;

            case "no":
                this.redirectLink = '';
                if (this.showButton) {
                    this.buttonContainerClass = 'btn-container-inactive';
                }
                // this.showMessage = false; // Reset showMessage for fade effect
                setTimeout(() => {
                    this.showMessage = true;
                    this.warningClass = 'warning-active';
                    this.showButton = false;
                    
                }, 1000); // Delayed message display for fade-in effect
                this.wrapperClass = 'wrapper-selected-no';
                this.message = 'In order to continue you must have the required documents.';
                break;

            default:
                this.redirectLink = '';
                this.showMessage = false;
                this.showButton = false;
                this.message = '';
                this.wrapperClass = 'wrapper';
                this.warningClass = 'warning-inactive';
                break;
        }
    }
}