import { api, LightningElement, track } from 'lwc';

export default class LiquidationOfFundsRequiredDocuments extends LightningElement {

    @api isLoggedIn
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
    // @track wrapperClass = 'wrapper';
    // @track warningClass = 'warning-inactive';
    // @track buttonContainerClass = 'btn-container-inactive';
    get warningClass(){
        console.log(this.message&&this.showMessage&&(this.wrapperClassLevel===1 || this.wrapperClassLevel===2));
        return this.message&&this.showMessage&&(this.wrapperClassLevel===1 || this.wrapperClassLevel===2)? 'warning-active':'hidden'
    }
    get buttonContainerClass(){
        return this.message&&this.showButton && this.wrapperClassLevel===1? 'button-container-active':'hidden'
    }
    @track wrapperClassLevel = 0;
    get wrapperClass(){
        switch (this.wrapperClassLevel) {
            case 0:
                return 'wrapper';
            case 1:
                return 'wrapper-selected-yes';
            case 2:
                return 'wrapper-selected-no';
            default:
                return 'wrapper';
        }
    }

    // Handle selection from the dropdown
    handleSelected(event) {
        const selected = event.target.value;

        switch (selected) {
            case "yes":
                this.redirectLink = this.isLoggedIn? 
                                        "https://resilient-badger-m2qcfb-dev-ed.trailblaze.my.site.com/LiquidationOfDepositFunds/s/liquidation-request":
                                        "https://resilient-badger-m2qcfb-dev-ed.trailblaze.my.site.com/LiquidationOfDepositFunds/login?startURL=%2FLiquidationOfDepositFunds%2Fs%2F%3Ft%3D1726178366307";
                this.showMessage = false; // Reset showMessage for fade effect
                this.showButton = false;
                this.wrapperClassLevel=1
                setTimeout(()=>{
                    
                    this.showMessage = true
                    this.showButton = true
                },100)
                // setTimeout(() => {
                //     this.showMessage = true;
                //     this.warningClass = 'warning-active';
                //     setTimeout(()=>{
                //         this.showButton = true;
                //         this.buttonContainerClass = 'btn-container-active';    
                //     },250)
                // }, 500); // Delayed message display for fade-in effect
                // this.wrapperClass = 'wrapper-selected-yes';
                this.message = 'By clicking continue you will be redirected to a registration page.';
                break;

            case "no":
                this.redirectLink = '';
                this.showMessage=false
                this.showButton = false;
                this.wrapperClassLevel=2
                setTimeout(()=>{
                    this.showMessage=true
                },100)
                // if (this.showButton) {
                //     this.buttonContainerClass = 'btn-container-inactive';
                // }
                // this.showMessage = false; // Reset showMessage for fade effect
                // setTimeout(() => {
                //     this.showMessage = true;
                //     this.warningClass = 'warning-active';
                //     this.showButton = false;
                    
                // }, 1000); // Delayed message display for fade-in effect
                // this.wrapperClass = 'wrapper-selected-no';
                this.message = 'In order to continue you must have the required documents.';
                break;

            default:
                this.redirectLink = '';
                this.showMessage = false;
                this.showButton = false;
                this.message = '';
                this.wrapperClassLevel=0
                // this.wrapperClass = 'wrapper';
                // this.warningClass = 'warning-inactive';
                break;
        }
    }
}