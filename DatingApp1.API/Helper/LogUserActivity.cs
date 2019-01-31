using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp1.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp1.API.Helper
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultcontext = await next();

            var userid = int.Parse(resultcontext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultcontext.HttpContext.RequestServices.GetService<IDatingRepositroy>();

            var user = await repo.Getuser(userid);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();

        }
    }
}