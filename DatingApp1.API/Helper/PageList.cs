using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp1.API.Helper
{
    public class PageList<T> : List<T>
    {
        public int Totalitems {get;set;}

        public int Pagesize {get;set;}

        public int TotalPages {get;set;}

        public int currentpage {get;set;}

        public PageList(List<T> items, int count, int pagenumber, int pagesize) {
            Totalitems = Count;
            Pagesize = pagesize;
           currentpage = pagenumber;
           TotalPages = (int)Math.Ceiling(count / (double) pagesize);
            this.AddRange(items);
        }

        public static async Task<PageList<T>> CreatAsync(IQueryable<T> source, int Pagesize, int pagenumber) {

            var count = await source.CountAsync();
 
            var itmes = await source.Skip((pagenumber - 1)* Pagesize).Take(Pagesize).ToListAsync();

            return new PageList<T>(itmes, count, Pagesize, pagenumber);
        }
    }
}