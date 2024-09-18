public with sharing class UserController {
    @AuraEnabled(cacheable=true)
    public static User getCurrentUser() {
        try {
            User currentUser = [SELECT Id, Email, Phone, FirstName, LastName 
                                FROM User 
                                WHERE Id = :UserInfo.getUserId() 
                                LIMIT 1];
            system.debug('currentUser: '+ currentUser);
            return currentUser;
        } catch (QueryException qe) {
            // Log the error for internal troubleshooting
            System.debug('QueryException: ' + qe.getMessage());
            // Return a more user-friendly error message
            throw new AuraHandledException('Error retrieving current user information.');
        } catch (Exception e) {
            // Handle any unexpected exceptions
            System.debug('Unexpected Exception: ' + e.getMessage());
            throw new AuraHandledException('An unexpected error occurred while retrieving user data.');
        }
    }
}