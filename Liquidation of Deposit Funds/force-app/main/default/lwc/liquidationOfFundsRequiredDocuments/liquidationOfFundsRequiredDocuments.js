import { api, LightningElement, track } from 'lwc';
import InfoLabel1 from '@salesforce/label/c.Required_Documents_Info_1'
import InfoLabel2 from '@salesforce/label/c.Required_Documents_Info_2'
import InfoLabel3 from '@salesforce/label/c.Required_Documents_Info_3'


export default class LiquidationOfFundsRequiredDocuments extends LightningElement {

    @track infoLabel1 = {};
    @track infoLabel2 = {};
    @track infoLabel3 = {};
    @track options;
  

    connectedCallback(){
        this.infoLabel1 = JSON.parse(InfoLabel1);
        this.infoLabel2 = JSON.parse(InfoLabel2);
        this.infoLabel3 = JSON.parse(InfoLabel3);
        this.options = [
            { label: this.infoLabel3.t1, value: "" },
            { label: this.infoLabel3.t2, value: "yes" },
            { label: this.infoLabel3.t3, value: "no" }
        ];
    }

    @api isLoggedIn
    // Options for the dropdown

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
                this.message = this.infoLabel3.t4;
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
                this.message = this.infoLabel3.t5;
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