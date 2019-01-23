using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp1.API.Helper
{
    public static class Extensions
    {
        public static void ApplicationError(this HttpResponse response, string message){

            response.Headers.Add("Application-error",message);
            response.Headers.Add("Acess-Control-Expose-Headers","Application-error");
            response.Headers.Add("Acess-Allow-Cross-Origin","*");
        }

        public static int Calculateage(this DateTime theDatetime){
            var age = DateTime.Today.Year - theDatetime.Year;
            if(theDatetime.AddYears(age) > DateTime.Today)

            age--;

            return age;

        }
    }
}