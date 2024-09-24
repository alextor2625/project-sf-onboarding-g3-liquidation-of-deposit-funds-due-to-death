public with sharing class ReCaptchaController {
    @AuraEnabled
    public static Map<String,Object> verifyToken(String token){
        try{
            String secretKey = '6LctA00qAAAAAB0tX8SzPoCOXRwQuron0RA-i2wl';
            String URL = 'https://www.google.com/recaptcha/api/siteverify';
            String body = 'secret=' + secretKey + '&response=' + token;
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(URL);
            request.setMethod('POST');
            request.setBody (body);
            HttpResponse response = http.send(request);
            if(response.getStatusCode() == 200){
                Map<String,Object> result = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
                System.debug('RECAPTCHA '+result);
                return result;
            }
            else{
                Map<String,Object> responseMap = new Map<String,Object>();
                responseMap.put('success',false);
                System.debug('RECAPTCHA '+responseMap);
                return responseMap;
            }
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}