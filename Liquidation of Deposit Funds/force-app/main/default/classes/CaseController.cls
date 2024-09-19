public with sharing class CaseController {
    public static void createCase(Id accId, Map<String, Object> formData, Map<String, Blob> pdfBlobs) {
        List<Attachment> attachmentList = new List<Attachment>();
        Case newCase = new Case(
            First_Name__c = formData.containsKey('firstName') && (formData.get('firstName') != null || formData.get('firstName') != '')? String.valueOf(formData.get('firstName')): '', 
            Last_Name__c = formData.containsKey('lastName') && (formData.get('lastName') != null || formData.get('lastName') != '')? String.valueOf(formData.get('lastName')): '', 
            Social_Security_Number__c = formData.containsKey('ssn') && (formData.get('ssn') != null || formData.get('ssn') != '')? String.valueOf(formData.get('ssn')): '', 
            Date_of_Death__c = formData.containsKey('dateOfDeath') && (formData.get('dateOfDeath') != null || formData.get('dateOfDeath') != '')? Date.valueOf(String.valueOf(formData.get('dateOfDeath'))): null,
            Relationship__c = formData.containsKey('relationship') && (formData.get('relationship') != null || formData.get('relationship') != '')? String.valueOf(formData.get('relationship')): '',
            Other_Phone_Number__c = formData.containsKey('otherPhoneNumber') && (formData.get('otherPhoneNumber') != null || formData.get('otherPhoneNumber') != '')? String.valueOf(formData.get('otherPhoneNumber')): '',
            Disbursement__c = formData.containsKey('disbursementPreference') && (formData.get('disbursementPreference') != null || formData.get('disbursementPreference') != '')? String.valueOf(formData.get('disbursementPreference')): '',
            AccountId = accId,
            Account_Holder_Name__c = formData.containsKey('accountHolderName') && (formData.get('accountHolderName') != null || formData.get('accountHolderName') != '')? String.valueOf(formData.get('accountHolderName')): '',
            Is_the_sum_all_account_more_than_15k__c	= formData.containsKey('greaterThan15k') && formData.get('greaterThan15k') != null ? Boolean.valueOf(formData.get('greaterThan15k')): false,
            // Is_there_a_Will__c = ,
            Origin ='Liquidation Of Funds Portal'

            );
            insert newCase;
            for(String key : pdfBlobs.keySet()) {
                Blob pdfBlob = pdfBlobs.get(key);
                if(pdfBlob != null){
                    attachmentList.add(
                        new Attachment(
                            Name = key,
                            Body = pdfBlob,
                            ContentType = 'application/pdf',
                            ParentId = newCase.Id
                        )
                    );
                }
            }
        insert attachmentList;
    }
}