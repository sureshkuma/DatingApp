using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp1.API.Helper
{
    public static class Extensions
    {
        public static void ApplicationError(this HttpResponse response, string message){

            response.Headers.Add("Application-error",message);
            response.Headers.Add("Acess-Control-Expose-Headers","Application-error");
            response.Headers.Add("Acess-Allow-Cross-Origin","*");
        }

        public static void AddPagination(this HttpResponse response, int pagesize,int currentpage, int totalitems, int totalpages) {

             var paginationheader = new PaginationHeader(currentpage,pagesize,totalitems,totalpages);
             var camelcaseconverter = new JsonSerializerSettings();
             camelcaseconverter.ContractResolver = new CamelCasePropertyNamesContractResolver();
             response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationheader, camelcaseconverter));
            response.Headers.Add("access-control-expose-headers","Pagination");
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