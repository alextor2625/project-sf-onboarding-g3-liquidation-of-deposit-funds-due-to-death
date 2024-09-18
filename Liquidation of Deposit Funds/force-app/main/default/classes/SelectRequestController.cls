public with sharing class SelectRequestController {
    public String selection { get; set;}
    public List<SelectOption> options {get; set;}
    public Boolean showMessage {get; set;}
    public Boolean deactivateButton {get; set;}
    public String message {get; set;}

    public SelectRequestController() {
        options = getOptions();


    }
    public List<SelectOption> getOptions(){
        List<SelectOption> opts = new List<SelectOption>();
            opts.add(new SelectOption('Link 1','Advance Funds For Unpaid Funeral Expenses'));
            opts.add(new SelectOption('Link 2','General Advance Of Available Funds Or Certification Of Bank'));
            opts.add(new SelectOption('Link 3','Liquidation Funds'));
        return opts;
    }
    public void handleChange(){
        if(selection != '' || selection != null){
            showMessage = true;
            
            if(selection == 'Link 3'){
                message='When you click on continue you will redirected to a registration page.';
                deactivateButton = false;
            }else{
                message= '';
                deactivateButton = true;
            }
        }
        system.debug('selection '+selection);
    }
}