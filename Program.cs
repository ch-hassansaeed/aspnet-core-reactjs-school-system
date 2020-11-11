using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace aspnet_reactjs_basic
{
    //https://www.youtube.com/watch?v=VoPA7wF-cSg
    //Develop a CRUD Application using ASP.NET MVC Core Web API and ReactJS
    //or more help for getting snipet go to this site
    //https://dotnetdetail.net/how-to-create-crud-operations-using-reactjs-and-asp-net-core-2-0/
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
