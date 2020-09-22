public with sharing class EventController {
    @AuraEnabled(Cacheable=true)
    public static Event__c[] getAllEvents() {
        return [
            SELECT
                Id,
                Name,
                Event_Description__c,
                Event_Location__c,
                Event_Start__c,
                Event_End__c,
                Event_Type__c
            FROM Event__c
            WHERE Event_Start__c > YESTERDAY
            ORDER BY Event_Start__c
            LIMIT 30
        ];
    }
}