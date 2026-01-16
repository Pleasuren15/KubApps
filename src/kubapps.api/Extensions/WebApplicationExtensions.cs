using Scalar.AspNetCore;

namespace kubapps.api.Extensions;

public static class WebApplicationExtensions
{
    public static WebApplication AddWebApplication(this WebApplication webApplication)
    {
        if (webApplication.Environment.IsDevelopment())
        {
            webApplication.MapOpenApi();
            webApplication.MapScalarApiReference(options =>
            {
                options.WithTheme(ScalarTheme.BluePlanet)
                       .WithTitle("Kubapps API")
                       .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
            });
        }

        webApplication.UseHttpsRedirection();
        webApplication.UseAuthorization();

        return webApplication;
    }
}
