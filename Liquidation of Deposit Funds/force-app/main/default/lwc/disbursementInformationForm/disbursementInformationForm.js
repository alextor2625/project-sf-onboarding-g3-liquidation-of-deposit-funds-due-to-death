import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DisbursementInformationForm extends LightningElement {
    greaterThan15kOptions = [
        { label: 'Select Yes/No/Don\'t know', value: '' },
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'Don\'t know', value: 'don\'t know' },
    ]
    disbursementPreferenceOptions = [
        { label: "Select Disbursement preference", value: '' },
        { label: 'Account deposit', value: 'Account deposit' },
        { label: 'Pick-up at branch', value: 'Pick-up at branch' }
    ]

    pickUpCheckWillAllHeirsBePresentOptions = [
        { label: "Select Yes/No", value: '' },
        { label: "Yes", value: 'yes' },
        { label: "No", value: 'no' },
    ]

    // townBranchOptionsJson = {
    //     "San Juan": [
    //         "Montehiedra",

    //         "Mall Of San Juan",

    //         "Walmart Parada 18",

    //         "El Señorial Center",

    //         "San Francisco",

    //         "Galería Paseos",

    //         "El Señorial Mall",

    //         "Barbosa",

    //         "Muñoz Rivera",

    //         "Cupey Center",

    //         "Reparto Metropolitano",

    //         "San José",

    //         "Centro Medico",

    //         "Plaza Del Mercado",

    //         "Universidad",

    //         "Caparra Center",

    //         "Plaza Las Américas",

    //         "Popular Center",

    //         "Condado Gallery",

    //         "Altamira",

    //         "Puerto Nuevo",

    //         "Parada 22",

    //         "Parada 34",

    //         "Barrio Obrero",

    //         "Valencia Park",

    //         "Condado Centro",

    //         "Calle Loíza",

    //         "Parada 26",

    //         "Miramar",

    //         "San Juan Los Puertos",

    //         "San Juan"

    //     ],

    //     "Cayey": [

    //         "Walmart Cayey",

    //         "Cayey Montellano"

    //     ],

    //     "Caguas": [

    //         "Las Catalinas",

    //         "Plaza Centro II",

    //         "Plaza Los Prados",

    //         "RFW Bairoa",

    //         "Caguas Pueblo",

    //         "Condadito",

    //         "San Alfonso"

    //     ],

    //     "Cidra": ["Cidra"],

    //     "Fajardo": ["Fajardo"],

    //     "San Lorenzo": ["San Lorenzo"],

    //     "Humacao": [

    //         "Humacao Este",

    //         "Palmas Del Mar",

    //         "Humacao Palma Real"

    //     ],

    //     "Canóvanas": ["Canovanas Outlet"],

    //     "Las Piedras": ["Las Piedras"],

    //     "Gurabo": ["Gurabo"],

    //     "Luquillo": ["Luquillo"],

    //     "Yabucoa": ["Yabucoa"],

    //     "Aibonito": ["Aibonito"],

    //     "Rio Grande": [

    //         "Plaza Del Yunque",

    //         "Rio Grande Pueblo"

    //     ],

    //     "Barranquitas": ["Barranquitas"],

    //     "Juncos": ["RFW Juncos"],

    //     "Aguas Buenas": ["Aguas Buenas"],

    //     "Naguabo": ["Naguabo"],

    //     "Vieques": ["Vieques"],

    //     "Ceiba": ["Ceiba"],

    //     "Loíza": ["Loíza"],

    //     "Maunabo": ["Maunabo"],

    //     "Culebra": ["Culebra"],

    //     "Bayamón": [

    //         "Bayamón Center",

    //         "Santa Rosa",

    //         "Lomas Verdes",

    //         "Bayamón Oeste",

    //         "Plaza Del Sol",

    //         "Rexville Town Center",

    //         "Rio Hondo"

    //     ],

    //     "Vega Alta": ["Vega Alta"],

    //     "Corozal": ["Corozal"],

    //     "Barceloneta": [

    //         "Cruce Davila",

    //         "Barceloneta Prime Outlets"

    //     ],

    //     "Naranjito": ["El Mercado Plaza"],

    //     "Hatillo": ["Hatillo"],

    //     "Toa Baja": [

    //         "Levittown",

    //         "Toa Baja"

    //     ],

    //     "Arecibo": [

    //         "Arecibo Highway",

    //         "Arecibo San Luis",

    //         "Arecibo Aeropuerto"

    //     ],

    //     "Utuado": ["Utuado"],

    //     "Camuy": ["Camuy"],

    //     "Orocovis": ["Orocovis"],

    //     "Morovis": ["Morovis"],

    //     "Manatí": [

    //         "Manatí Popular Center",

    //         "Econo Manatí"

    //     ],

    //     "Toa Alta": ["Toa Alta"],

    //     "Ciales": ["Ciales"],

    //     "Comerio": ["Comerio"],

    //     "Florida": ["Florida"],

    //     "Dorado": ["Plaza Dorada"],

    //     "Carolina": [

    //         "Carolina Highway",

    //         "Parque Escorial",

    //         "Plaza Carolina",

    //         "Los Colobos Shopping Center",

    //         "Campo Rico",

    //         "Isla Verde",

    //         "Ave. 65 Infantería Shopping Center",

    //         "Aeropuerto"

    //     ],

    //     "Trujillo Alto": [

    //         "Trujillo Alto Shopping",

    //         "Trujillo Alto"

    //     ],

    //     "Guaynabo": [

    //         "Plaza Guaynabo",

    //         "Guaynabo Las Cumbres",

    //         "San Patricio Gallery",

    //         "San Patricio Mall",

    //         "Buchanan",

    //         "Exp Garden Hills"

    //     ],

    //     "Ponce": [

    //         "Plaza Del Caribe",

    //         "Centro Del Sur",

    //         "Ponce Towne Center Norte",

    //         "Ponce Towne Center Sur",

    //         "Ponce Rambla",

    //         "Ponce El Monte",

    //         "Ponce Plaza"

    //     ],

    //     "Juana Díaz": ["Juana Díaz"],

    //     "Coamo": ["Coamo"],

    //     "Guayanilla": ["Guayanilla"],

    //     "Arroyo": ["Arroyo"],

    //     "Peñuelas": ["Peñuelas"],

    //     "Jayuya": ["Jayuya"],

    //     "Patillas": ["Patillas"],

    //     "Adjuntas": ["Adjuntas"],

    //     "Villalba": ["Villalba"],

    //     "Aguadilla": [

    //         "Aguadilla Sur",

    //         "Aguadilla Mall",

    //         "Ramey"

    //     ],

    //     "Isabela": ["Isabela"],

    //     "Sabana Grande": ["Sabana Grande"],

    //     "Mayagüez": [

    //         "Mayagüez Mall Centro",

    //         "Mayagüez Mall Sur",

    //         "Mayagüez Suau",

    //         "RUM",

    //         "Mendez Vigo"

    //     ],

    //     "Cabo Rojo": ["Cabo Rojo La Hacienda"],

    //     "Moca": ["Moca"],

    //     "Añasco": ["Añasco"],

    //     "San Germán": ["San Germán Plaza Del Oeste"],

    //     "Lares": ["Lares"],

    //     "Aguada": ["Aguada"],

    //     "Quebradillas": ["Quebradillas"],

    //     "San Sebastián": ["San Sebastián"],

    //     "Lajas": ["Lajas"],

    //     "Rincón": ["Rincón"],

    //     "Hormigueros": ["Hormigueros"],

    //     "Las Marías": ["Las Marías"],

    //     "Maricao": ["Maricao"],

    //     "Santa Isabel": ["Santa Isabel"],
    //     "Guayama": ["Guayama"],
    //     "Salinas": ["Salinas"],
    //     "Vega Baja": ["Vega Baja"]

    // }
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
    nonPresentHeirLocationOptions = [
        { label: "Active Duty in US Armed Forces", value: "Active Duty in US Armed Forces" },
        { label: "Puerto Rico", value: "Puerto Rico" },
        { label: "Unites States", value: "Unites States" },
        { label: "Foreign Country", value: "Foreign Country" },
    ]
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
    // get branchTownOptions() {
    //     return [
    //         { label: "Select Town", value: "" },
    //         { label: "San Juan", value: "San Juan" },
    //         { label: "Cayey", value: "Cayey" },
    //         { label: "Caguas", value: "Caguas" },
    //         { label: "Cidra", value: "Cidra" },
    //         { label: "Fajardo", value: "Fajardo" },
    //         { label: "San Lorenzo", value: "San Lorenzo" },
    //         { label: "Humacao", value: "Humacao" },
    //         { label: "Canóvanas", value: "Canóvanas" },
    //         { label: "Las Piedras", value: "Las Piedras" },
    //         { label: "Gurabo", value: "Gurabo" },
    //         { label: "Luquillo", value: "Luquillo" },
    //         { label: "Yabucoa", value: "Yabucoa" },
    //         { label: "Aibonito", value: "Aibonito" },
    //         { label: "Rio Grande", value: "Rio Grande" },
    //         { label: "Barranquitas", value: "Barranquitas" },
    //         { label: "Juncos", value: "Juncos" },
    //         { label: "Aguas Buenas", value: "Aguas Buenas" },
    //         { label: "Naguabo", value: "Naguabo" },
    //         { label: "Vieques", value: "Vieques" },
    //         { label: "Ceiba", value: "Ceiba" },
    //         { label: "Loíza", value: "Loíza" },
    //         { label: "Maunabo", value: "Maunabo" },
    //         { label: "Culebra", value: "Culebra" },
    //         { label: "Bayamón", value: "Bayamón" },
    //         { label: "Vega Alta", value: "Vega Alta" },
    //         { label: "Corozal", value: "Corozal" },
    //         { label: "Barceloneta", value: "Barceloneta" },
    //         { label: "Naranjito", value: "Naranjito" },
    //         { label: "Hatillo", value: "Hatillo" },
    //         { label: "Toa Baja", value: "Toa Baja" },
    //         { label: "Arecibo", value: "Arecibo" },
    //         { label: "Utuado", value: "Utuado" },
    //         { label: "Camuy", value: "Camuy" },
    //         { label: "Orocovis", value: "Orocovis" },
    //         { label: "Morovis", value: "Morovis" },
    //         { label: "Manatí", value: "Manatí" },
    //         { label: "Toa Alta", value: "Toa Alta" },
    //         { label: "Ciales", value: "Ciales" },
    //         { label: "Comerio", value: "Comerio" },
    //         { label: "Florida", value: "Florida" },
    //         { label: "Dorado", value: "Dorado" },
    //         { label: "Carolina", value: "Carolina" },
    //         { label: "Trujillo Alto", value: "Trujillo Alto" },
    //         { label: "Guaynabo", value: "Guaynabo" },
    //         { label: "Ponce", value: "Ponce" },
    //         { label: "Juana Díaz", value: "Juana Díaz" },
    //         { label: "Coamo", value: "Coamo" },
    //         { label: "Guayanilla", value: "Guayanilla" },
    //         { label: "Arroyo", value: "Arroyo" },
    //         { label: "Peñuelas", value: "Peñuelas" },
    //         { label: "Jayuya", value: "Jayuya" },
    //         { label: "Patillas", value: "Patillas" },
    //         { label: "Adjuntas", value: "Adjuntas" },
    //         { label: "Villalba", value: "Villalba" },
    //         { label: "Aguadilla", value: "Aguadilla" },
    //         { label: "Isabela", value: "Isabela" },
    //         { label: "Sabana Grande", value: "Sabana Grande" },
    //         { label: "Mayagüez", value: "Mayagüez" },
    //         { label: "Cabo Rojo", value: "Cabo Rojo" },
    //         { label: "Moca", value: "Moca" },
    //         { label: "Añasco", value: "Añasco" },
    //         { label: "San Germán", value: "San Germán" },
    //         { label: "Lares", value: "Lares" },
    //         { label: "Aguada", value: "Aguada" },
    //         { label: "Quebradillas", value: "Quebradillas" },
    //         { label: "San Sebastián", value: "San Sebastián" },
    //         { label: "Lajas", value: "Lajas" },
    //         { label: "Rincón", value: "Rincón" },
    //         { label: "Hormigueros", value: "Hormigueros" },
    //         { label: "Las Marías", value: "Las Marías" },
    //         { label: "Maricao", value: "Maricao" },
    //         { label: "Santa Isabel", value: "Santa Isabel" },
    //         { label: "Guayama", value: "Guayama" },
    //         { label: "Salinas", value: "Salinas" },
    //         { label: "Vega Baja", value: "Vega Baja" },
    //     ]
    // }

    pHClass(name) {
        console.log("ChangingClass")
        const elem = this.template.querySelector(`[name=${name}]`);
        elem.value !== '' ? elem.classList.remove('place-holder-text') : elem.classList.add('place-holder-text')
    }
    // connectedCallback(){
    //     console.log(this.branchTownSelection)
    //     console.log(JSON.stringify(this.branchOptions))
    // }

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
            fileInputElement.style.color = file ? 'red' : '';
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