public with sharing class ClientCaseController {
    
    @AuraEnabled(cacheable=true)
    public static List<Case> getClientCases(){
        try {
            // Query Cases of the current logged in user
            String currentUserEmail = UserInfo.getUserEmail();

            return [
                SELECT Id, CaseNumber, Case_Detail_Page_URL__c, Account_First_Name__c, Account_Last_Name__c, First_Name__c, Last_Name__c, CreatedDate, ContactEmail
                FROM Case
                WHERE ContactEmail = :currentUserEmail
                ORDER BY CreatedDate DESC
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}