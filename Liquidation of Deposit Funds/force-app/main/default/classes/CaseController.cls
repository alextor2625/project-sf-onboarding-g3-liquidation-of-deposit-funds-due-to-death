public with sharing class CaseController {
    @AuraEnabled
    public static void insertCase(Case newCase, Map<String, String> pdfBlobs) {
        try {
            // Insert the case
            // for(String key: newCaseObj.keySet()){
            //     if (newCaseObj.get(key) != null) {
            //         newCase.put(key,newCaseObj.get(key));
            //     }
            // }
            // Add the Blob if there are any
            insert newCase;
            Id caseId;
            // caseId = insertCase.getId();
            Case createdCase = [SELECT Id FROM Case where AccountId= :newCase.AccountId ORDER BY CreatedDate DESC LIMIT 1];
            caseId = createdCase.Id;
            
            system.debug('Case ID: ' + caseId);

            List<Attachment> attachmentList = new List<Attachment>();

            // Iterate through the map of filenames and Base64-encoded content
            for (String key : pdfBlobs.keySet()) {
                String base64String = pdfBlobs.get(key);
                if (base64String != null) {
                    // Decode the Base64 string to Blob
                    Blob pdfBlob = EncodingUtil.base64Decode(base64String);

                    // Create the attachment object
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

            // Insert all the attachments
            insert attachmentList;

        } catch (Exception e) {
            System.debug('Exception: ' + e);
            throw new AuraHandledException(e.getMessage());
        }
    }
}