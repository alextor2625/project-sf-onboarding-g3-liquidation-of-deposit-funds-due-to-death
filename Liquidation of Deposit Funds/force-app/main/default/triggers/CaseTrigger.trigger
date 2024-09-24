trigger CaseTrigger on Case (after insert) {
    Set<Id> caseIdSet = new Set<Id>();

    for (Case c : trigger.new){
        caseIdSet.add(c.Id);
    }

    List<Case> caseList = new List<Case>();

    Database.DMLOptions dmo = new Database.DMLOptions();

    dmo.AssignmentRuleHeader.assignmentRuleId = '01Qbm000001MdrqEAC'; // Id of Case Assignment Luiquidation of Funds

    for (Case c : [SELECT Id FROM Case WHERE Id IN: caseIdSet]){
        c.setOptions(dmo);
        caseList.add(c);
    }

    try {
        update caseList;
        
    } catch (Exception e) {
        System.debug('Exception in Case Trigger: ' + e.getMessage());
        throw new AuraHandledException('An error occurred while updating caseList with assignment rule.');
    }

}