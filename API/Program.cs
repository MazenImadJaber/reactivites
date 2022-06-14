using Microsoft.EntityFrameworkCore;
using Presistance;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();

            var services = scope.ServiceProvider;
            try{
                var context = services.GetRequiredService<DataContext>();
                 await  context.Database.MigrateAsync();
                 await Seed.SeedData(context);
            } catch (Exception ex){
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "an error occured during migration");
            }
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}