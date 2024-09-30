import { api, LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import InfoLabel from '@salesforce/label/c.Disbursement_Info_1'
import InfoLabel2 from '@salesforce/label/c.Disbursement_Info_2'

export default class DisbursementInformationForm extends LightningElement {

    @track infoLabel = {};
    @track infoLabel2 = {};
    @track greaterThan15kOptions;
    @track disbursementPreferenceOptions;
    @track pickUpCheckWillAllHeirsBePresentOptions;
    @track nonPresentHeirLocationOptions;
    
    connectedCallback(){
        this.infoLabel = JSON.parse(InfoLabel);
        this.infoLabel2 = JSON.parse(InfoLabel2);

        this.greaterThan15kOptions = [
            { label: this.infoLabel2.t8, value: '' },
            { label: this.infoLabel2.t9, value: 'yes' },
            { label: 'No', value: 'no' },
            { label: this.infoLabel2.t11, value: 'don\'t know' },
        ]

        this.disbursementPreferenceOptions = [
            { label: this.infoLabel2.t12, value: '' },
            { label: this.infoLabel2.t13, value: 'Account deposit' },
            { label: this.infoLabel2.t14, value: 'Pick-up at branch' }
        ]
    
        this.pickUpCheckWillAllHeirsBePresentOptions = [
            { label: this.infoLabel2.t15, value: '' },
            { label: this.infoLabel2.t9, value: 'yes' },
            { label: "No", value: 'no' },
        ]

        this.nonPresentHeirLocationOptions = [
            { label: this.infoLabel2.t16, value: "Active Duty in US Armed Forces" },
            { label: "Puerto Rico", value: "Puerto Rico" },
            { label: this.infoLabel2.t17, value: "Unites States" },
            { label: "Foreign Country", value: "Foreign Country" },
        ]

    }


    townBranchOptionsJson = {
        "Adjuntas": ["Adjuntas"],
        "Aguas Buenas": ["Aguas Buenas"],
        "Aibonito": ["Aibonito"],
        "Aguada": ["Aguada"],
        "Aguadilla": [
            "Aguadilla Sur",
            "Aguadilla Mall",
            "Ramey"
        ],
        "Aguas Buenas": ["Aguas Buenas"],
        "Aibonito": ["Aibonito"],
        "Añasco": ["Añasco"],
        "Arecibo": [
            "Arecibo Highway",
            "Arecibo San Luis",
            "Arecibo Aeropuerto"
        ],
        "Arroyo": ["Arroyo"],
        "Barranquitas": ["Barranquitas"],
        "Barceloneta": [
            "Cruce Davila",
            "Barceloneta Prime Outlets"
        ],
        "Bayamón": [
            "Bayamón Center",
            "Santa Rosa",
            "Lomas Verdes",
            "Bayamón Oeste",
            "Plaza Del Sol",
            "Rexville Town Center",
            "Rio Hondo"
        ],
        "Cabo Rojo": ["Cabo Rojo La Hacienda"],
        "Caguas": [
            "Las Catalinas",
            "Plaza Centro II",
            "Plaza Los Prados",
            "RFW Bairoa",
            "Caguas Pueblo",
            "Condadito",
            "San Alfonso"
        ],
        "Camuy": ["Camuy"],
        "Canóvanas": ["Canovanas Outlet"],
        "Carolina": [
            "Carolina Highway",
            "Parque Escorial",
            "Plaza Carolina",
            "Los Colobos Shopping Center",
            "Campo Rico",
            "Isla Verde",
            "Ave. 65 Infantería Shopping Center",
            "Aeropuerto"
        ],
        "Cayey": [
            "Walmart Cayey",
            "Cayey Montellano"
        ],
        "Ceiba": ["Ceiba"],
        "Ciales": ["Ciales"],
        "Cidra": ["Cidra"],
        "Coamo": ["Coamo"],
        "Comerio": ["Comerio"],
        "Corozal": ["Corozal"],
        "Culebra": ["Culebra"],
        "Dorado": ["Plaza Dorada"],
        "Fajardo": ["Fajardo"],
        "Florida": ["Florida"],
        "Guayanilla": ["Guayanilla"],
        "Guayama": ["Guayama"],
        "Guaynabo": [
            "Plaza Guaynabo",
            "Guaynabo Las Cumbres",
            "San Patricio Gallery",
            "San Patricio Mall",
            "Buchanan",
            "Exp Garden Hills"
        ],
        "Gurabo": ["Gurabo"],
        "Hatillo": ["Hatillo"],
        "Hormigueros": ["Hormigueros"],
        "Humacao": [
            "Humacao Este",
            "Palmas Del Mar",
            "Humacao Palma Real"
        ],
        "Isabela": ["Isabela"],
        "Jayuya": ["Jayuya"],
        "Juana Díaz": ["Juana Díaz"],
        "Juncos": ["RFW Juncos"],
        "Lares": ["Lares"],
        "Lajas": ["Lajas"],
        "Las Marías": ["Las Marías"],
        "Las Piedras": ["Las Piedras"],
        "Loíza": ["Loíza"],
        "Luquillo": ["Luquillo"],
        "Maunabo": ["Maunabo"],
        "Manatí": [
            "Manatí Popular Center",
            "Econo Manatí"
        ],
        "Maricao": ["Maricao"],
        "Mayagüez": [
            "Mayagüez Mall Centro",
            "Mayagüez Mall Sur",
            "Mayagüez Suau",
            "RUM",
            "Mendez Vigo"
        ],
        "Moca": ["Moca"],
        "Morovis": ["Morovis"],
        "Naguabo": ["Naguabo"],
        "Naranjito": ["El Mercado Plaza"],
        "Orocovis": ["Orocovis"],
        "Patillas": ["Patillas"],
        "Peñuelas": ["Peñuelas"],
        "Ponce": [
            "Plaza Del Caribe",
            "Centro Del Sur",
            "Ponce Towne Center Norte",
            "Ponce Towne Center Sur",
            "Ponce Rambla",
            "Ponce El Monte",
            "Ponce Plaza"
        ],
        "Quebradillas": ["Quebradillas"],
        "Rincón": ["Rincón"],
        "Rio Grande": [
            "Plaza Del Yunque",
            "Rio Grande Pueblo"
        ],
        "Salinas": ["Salinas"],
        "San Germán": ["San Germán Plaza Del Oeste"],
        "San Juan": [
            "Montehiedra",
            "Mall Of San Juan",
            "Walmart Parada 18",
            "El Señorial Center",
            "San Francisco",
            "Galería Paseos",
            "El Señorial Mall",
            "Barbosa",
            "Muñoz Rivera",
            "Cupey Center",
            "Reparto Metropolitano",
            "San José",
            "Centro Medico",
            "Plaza Del Mercado",
            "Universidad",
            "Caparra Center",
            "Plaza Las Américas",
            "Popular Center",
            "Condado Gallery",
            "Altamira",
            "Puerto Nuevo",
            "Parada 22",
            "Parada 34",
            "Barrio Obrero",
            "Valencia Park",
            "Condado Centro",
            "Calle Loíza",
            "Parada 26",
            "Miramar",
            "San Juan Los Puertos",
            "San Juan"
        ],
        "San Lorenzo": ["San Lorenzo"],
        "San Sebastián": ["San Sebastián"],
        "Santa Isabel": ["Santa Isabel"],
        "Toa Alta": ["Toa Alta"],
        "Toa Baja": [
            "Levittown",
            "Toa Baja"
        ],
        "Trujillo Alto": [
            "Trujillo Alto Shopping",
            "Trujillo Alto"
        ],
        "Utuado": ["Utuado"],
        "Vega Alta": ["Vega Alta"],
        "Vega Baja": ["Vega Baja"],
        "Vieques": ["Vieques"],
        "Villalba": ["Villalba"],
        "Yabucoa": ["Yabucoa"]
    }
    
    showNonPresentHeirOptions = false;
    
    branchTownSelection = '';
    disableBranchSelector = true;
    get branchOptions() {
        return this.townBranchOptionsJson[this.branchTownSelection] || [];
    }
    setBranchOptions(town) {
        this.branchTownSelection = town;
    }
    get nonPresentHeirOptionsClass() {
        return this.showNonPresentHeirOptions ? "non-present-heirs-section" : "hidden";
    }
    get branchTownOptions() {
        return [
            { label: "Select Town", value: "" },
            { label: "Adjuntas", value: "Adjuntas" },
            { label: "Aguada", value: "Aguada" },
            { label: "Aguadilla", value: "Aguadilla" },
            { label: "Aguas Buenas", value: "Aguas Buenas" },
            { label: "Aibonito", value: "Aibonito" },
            { label: "Añasco", value: "Añasco" },
            { label: "Arroyo", value: "Arroyo" },
            { label: "Barceloneta", value: "Barceloneta" },
            { label: "Barranquitas", value: "Barranquitas" },
            { label: "Bayamón", value: "Bayamón" },
            { label: "Cabo Rojo", value: "Cabo Rojo" },
            { label: "Camuy", value: "Camuy" },
            { label: "Canóvanas", value: "Canóvanas" },
            { label: "Carolina", value: "Carolina" },
            { label: "Caguas", value: "Caguas" },
            { label: "Cayey", value: "Cayey" },
            { label: "Ceiba", value: "Ceiba" },
            { label: "Cidra", value: "Cidra" },
            { label: "Ciales", value: "Ciales" },
            { label: "Coamo", value: "Coamo" },
            { label: "Comerio", value: "Comerio" },
            { label: "Corozal", value: "Corozal" },
            { label: "Culebra", value: "Culebra" },
            { label: "Dorado", value: "Dorado" },
            { label: "Fajardo", value: "Fajardo" },
            { label: "Florida", value: "Florida" },
            { label: "Guayanilla", value: "Guayanilla" },
            { label: "Guayama", value: "Guayama" },
            { label: "Guaynabo", value: "Guaynabo" },
            { label: "Gurabo", value: "Gurabo" },
            { label: "Hatillo", value: "Hatillo" },
            { label: "Hormigueros", value: "Hormigueros" },
            { label: "Humacao", value: "Humacao" },
            { label: "Isabela", value: "Isabela" },
            { label: "Jayuya", value: "Jayuya" },
            { label: "Juana Díaz", value: "Juana Díaz" },
            { label: "Juncos", value: "Juncos" },
            { label: "Lares", value: "Lares" },
            { label: "Las Marías", value: "Las Marías" },
            { label: "Las Piedras", value: "Las Piedras" },
            { label: "Loíza", value: "Loíza" },
            { label: "Luquillo", value: "Luquillo" },
            { label: "Lajas", value: "Lajas" },
            { label: "Manatí", value: "Manatí" },
            { label: "Maricao", value: "Maricao" },
            { label: "Maunabo", value: "Maunabo" },
            { label: "Mayagüez", value: "Mayagüez" },
            { label: "Moca", value: "Moca" },
            { label: "Morovis", value: "Morovis" },
            { label: "Naguabo", value: "Naguabo" },
            { label: "Naranjito", value: "Naranjito" },
            { label: "Orocovis", value: "Orocovis" },
            { label: "Patillas", value: "Patillas" },
            { label: "Peñuelas", value: "Peñuelas" },
            { label: "Ponce", value: "Ponce" },
            { label: "Quebradillas", value: "Quebradillas" },
            { label: "Rincón", value: "Rincón" },
            { label: "Rio Grande", value: "Rio Grande" },
            { label: "Sabana Grande", value: "Sabana Grande" },
            { label: "Salinas", value: "Salinas" },
            { label: "San Germán", value: "San Germán" },
            { label: "San Juan", value: "San Juan" },
            { label: "San Lorenzo", value: "San Lorenzo" },
            { label: "San Sebastián", value: "San Sebastián" },
            { label: "Santa Isabel", value: "Santa Isabel" },
            { label: "Toa Alta", value: "Toa Alta" },
            { label: "Toa Baja", value: "Toa Baja" },
            { label: "Trujillo Alto", value: "Trujillo Alto" },
            { label: "Utuado", value: "Utuado" },
            { label: "Vega Alta", value: "Vega Alta" },
            { label: "Vega Baja", value: "Vega Baja" },
            { label: "Vieques", value: "Vieques" },
            { label: "Villalba", value: "Villalba" },
            { label: "Yabucoa", value: "Yabucoa" }
        ]
        
    }
    

    pHClass(name) {
        console.log("ChangingClass")
        const elem = this.template.querySelector(`[name=${name}]`);
        elem.value !== '' ? elem.classList.remove('place-holder-text') : elem.classList.add('place-holder-text')
    }
   

    @api disbursementInformationData;
    showAccountDepositSection = false;
    showPickUpCheckSection = false;

    // heirLocationRendering = {
    //     "Active Duty in US Armed Forces":false,
    //     "Puerto Rico":false ,
    //     "Unites States":false,
    //     "Foreign Country":false,
    // }
    showAffidavitPowerOfAttorneyPRAuthorizationDocumentUpload = false;
    showAffidavitPowerOfAttorneyUSClerkCertificateDocumentUpload = false;
    showApostilleIssuanceCountryDocumentUpload = false;
    showMilitaryDocumentUpload = false;

    get heirLocationRenderingStatusPRClass(){
    return this.showAffidavitPowerOfAttorneyPRAuthorizationDocumentUpload? "heir-location-document-upload": "hidden"
        
    }
    get heirLocationRenderingStatusUSClass(){
        return this.showAffidavitPowerOfAttorneyUSClerkCertificateDocumentUpload? "heir-location-document-upload": "hidden"
        
    }
    get heirLocationRenderingStatusForeignCountryClass(){
        return this.showApostilleIssuanceCountryDocumentUpload? "heir-location-document-upload": "hidden"

    }
    get heirLocationRenderingStatusMilitaryClass(){
        return this.showMilitaryDocumentUpload? "heir-location-document-upload": "hidden"
    }

    showGreaterThan15kSelectionNoMessage = false;
    showGreaterThan15kSelectionDontKnowMessage = false;

    get accountDepositSectionClass() {
        if (this.showAccountDepositSection) {
            return 'account-deposit-section';
        }
        return 'hidden';
    }
    get pickUpCheckSectionClass() {
        return this.showPickUpCheckSection ? 'pick-up-check-section' : 'hidden';
    }

    get greaterThan15kMessageClass() {
        return this.showGreaterThan15kSelectionNoMessage || this.showGreaterThan15kSelectionDontKnowMessage ? 'message-container' : 'hidden';
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.disbursementInformationData = { ...this.disbursementInformationData, [name]: value }
        console.log("Testing handle Change", JSON.stringify(this.disbursementInformationData))
        this.dispatchEvent(new CustomEvent('disbursementinformationdatachange', {
            detail: {
                disbursementInformationData: this.disbursementInformationData,
                eventName: 'disbursementinformationdatachange'
            }
        }));

    }
    handleCheckbox(event) {
        const { name, value, checked } = event.target;
        // Ensure the data property is initialized as an array
        // // Add the value when checked, remove when unchecked
        // Add the value if it's not already in the array
        if (this.disbursementInformationData[name].includes(value)) {
            this.disbursementInformationData = {...this.disbursementInformationData, [name]:this.disbursementInformationData[name].filter(item => item !== value)};

        } else {
            // Remove the value when unchecked
            this.disbursementInformationData = {...this.disbursementInformationData, [name]:[...this.disbursementInformationData[name], value]};
        }
        if(name === 'pickUpCheckNonPresentHeirLocationOptions'){
            if(checked){
                switch (value){
                    case 'Puerto Rico' :
                        this.showAffidavitPowerOfAttorneyPRAuthorizationDocumentUpload = true;
                        break;
                    case 'Unites States' :
                        this.showAffidavitPowerOfAttorneyUSClerkCertificateDocumentUpload = true;
                        break;
                    case 'Foreign Country' :
                        this.showApostilleIssuanceCountryDocumentUpload = true;
                        break;
                    case 'Active Duty in US Armed Forces' :
                        this.showMilitaryDocumentUpload = true;
                        break;
                }
            }else{
                switch (value){
                    case 'Puerto Rico' :
                        this.showAffidavitPowerOfAttorneyPRAuthorizationDocumentUpload = false;
                        break;
                    case 'Unites States' :
                        this.showAffidavitPowerOfAttorneyUSClerkCertificateDocumentUpload = false;
                        break;
                    case 'Foreign Country' :
                        this.showApostilleIssuanceCountryDocumentUpload = false;
                        break;
                    case 'Active Duty in US Armed Forces' :
                        this.showMilitaryDocumentUpload = false;
                        break;
                }
            }
        }
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
        if (name) {
            this.pHClass(name);
        }
        console.log('Name: ', name)
        console.log('Value: ', selectedValue)
        if (name === 'disbursementPreference') {
            this.disbursementInformationData = { ...this.disbursementInformationData, [name]: selectedValue }
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
        else if (name === 'pickUpCheckBranchTown') {
            this.branchTownSelection = selectedValue;
            this.disbursementInformationData = { ...this.disbursementInformationData, [name]: selectedValue }
            this.disableBranchSelector = this.branchTownSelection === '' ? true : false;

            this.dispatchEvent(new CustomEvent('disbursementinformationdatachange', {
                detail: {
                    disbursementInformationData: this.disbursementInformationData,
                    eventName: 'disbursementinformationdatachange'
                }
            }));
        }
        else if (name === 'pickUpCheckBranch') {
            try {
                
                this.disbursementInformationData = { ...this.disbursementInformationData, [name]: selectedValue }
    
                this.dispatchEvent(new CustomEvent('disbursementinformationdatachange', {
                    detail: {
                        disbursementInformationData: this.disbursementInformationData,
                        eventName: 'disbursementinformationdatachange'
                    }
                }));
            } catch (error) {
                console.log(error.message)
            }

        }
        else if (name === 'pickUpCheckWillAllHeirsPresent') {
            this.disbursementInformationData = { ...this.disbursementInformationData, [name]: selectedValue }
            console.log("Selected Value:", selectedValue);
            if (selectedValue.toLowerCase() === 'no') {
                this.showNonPresentHeirOptions = true;
                console.log("Its True");
            } else {
                this.showNonPresentHeirOptions = false;
                console.log("Its False");
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
            this.disbursementInformationData = { ...this.disbursementInformationData, [name]: selectedValue }
            if (selectedValue === 'no') {
                this.showGreaterThan15kSelectionNoMessage = false;
                this.showGreaterThan15kSelectionDontKnowMessage = false;
                setTimeout(() => {
                    this.showGreaterThan15kSelectionNoMessage = true;
                    this.showGreaterThan15kSelectionDontKnowMessage = false;
                }, 100)
            } else if (selectedValue === 'don\'t know') {
                this.showGreaterThan15kSelectionNoMessage = false;
                this.showGreaterThan15kSelectionDontKnowMessage = false;
                setTimeout(() => {
                    this.showGreaterThan15kSelectionNoMessage = false;
                    this.showGreaterThan15kSelectionDontKnowMessage = true;
                }, 100)
            } else if (selectedValue === "yes") {
                this.showGreaterThan15kSelectionNoMessage = false;
                this.showGreaterThan15kSelectionDontKnowMessage = false;
            }
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
            fileInputElement.style.color = file ? 'var(--popular-blue)' : '';
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