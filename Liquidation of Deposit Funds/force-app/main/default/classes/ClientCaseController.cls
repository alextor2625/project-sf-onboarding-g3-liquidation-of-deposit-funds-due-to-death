public with sharing class ClientCaseController {
    
    @AuraEnabled(cacheable=true)
    public static List<Case> getClientCases(){
        try {
            // Query Cases of the current logged in user
            // String currentUserEmail = UserInfo.getUserEmail();
            User userContactId = [SELECT ContactId FROM User WHERE Id = :UserInfo.getUserId() Limit 1];
            return [
                SELECT Id, CaseNumber, Case_Detail_Page_URL__c, First_Name__c, Last_Name__c, CreatedDate, ContactEmail
                FROM Case
                WHERE ContactId = :userContactId.ContactId
                ORDER BY CreatedDate DESC
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}