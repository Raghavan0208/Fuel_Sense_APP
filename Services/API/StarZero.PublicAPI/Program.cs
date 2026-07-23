using Invent.DAL;
using StarZero.API.Filters;
using System.Security.Principal;

var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration = builder.Configuration;

DefaultTypeMap.MatchNamesWithUnderscores = true;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// API Documentation Implementation.
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "StarZero API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme 
            {
                Reference = new OpenApiReference
                {
                     Type = ReferenceType.SecurityScheme,
                     Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddAuthentication(option =>
{
    option.DefaultScheme = StarZeroConstants.ServiceAuthorizationHeaderScheme;
}).AddScheme<ServiceAPIAuthOptions, TokenAuthenticationHandler>(StarZeroConstants.ServiceAuthorizationHeaderScheme, o => { });

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<CountryContext, CountryContextHelper>();
builder.Services.AddTransient<IPrincipal>(provider => provider.GetService<IHttpContextAccessor>().HttpContext.User);

builder.Services.AddHttpCacheHeaders(option =>
{
    option.MaxAge = 60;
    option.CacheLocation = Marvin.Cache.Headers.CacheLocation.Private;
}, (validationModel) => { validationModel.MustRevalidate = true; });

/// IOptionsSnapshot Implementation
builder.Services.AddOptions()
        .Configure<AppConfiguration>(configuration)
        .AddTransient<IConfiguration>(item => configuration);

builder.Logging.AddSerilog();
builder.Services.AddAutoMapper(typeof(AutoMapperBootStrapper));


/// API Documentation Implementation.

//builder.Services.AddSwaggerGen(option =>
//{
//    option.SwaggerDoc("v1", new OpenApiInfo { Title = "StarZero API", Version = "v1" });
//});

/// API Version Implementation.
builder.Services.AddApiVersioning(options =>
{
    options.ReportApiVersions = true;
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ApiVersionSelector = new CurrentImplementationApiVersionSelector(options);
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.ApiVersionReader = ApiVersionReader.Combine(
                                new MediaTypeApiVersionReader(),
                                new QueryStringApiVersionReader(),
                                new HeaderApiVersionReader("api-version"));
});

builder.Services.AddResponseCompression(option =>
{
    option.Providers.Add<BrotliCompressionProvider>();
    option.Providers.Add<GzipCompressionProvider>();
});

builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.SmallestSize;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.SmallestSize;
});

builder.Services.RegisterModelDependencies();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseResponseCompression();

app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

InventLogger.LoggingConfiguration(configuration, typeof(Program).Namespace);

var appConfigurationSnapshot = builder.Services.BuildServiceProvider().GetService<IOptionsSnapshot<AppConfiguration>>();

var iMapper = builder.Services.BuildServiceProvider().GetService<IMapper>();

if (appConfigurationSnapshot?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false)
{
    MasterEntitiesCache.Init(appConfigurationSnapshot, iMapper);
}

// https://github.com/openiddict/openiddict-core/issues/518
// And
// https://github.com/aspnet/Docs/issues/2384#issuecomment-297980490
ForwardedHeadersOptions forwarOptions = new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
};

forwarOptions.KnownNetworks.Clear();
forwarOptions.KnownProxies.Clear();

app.UseForwardedHeaders(forwarOptions);

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseHttpCacheHeaders();

app.UseRouting();
//app.UseCors(MyAllowSpecificOrigins);

app.UseApiVersioning();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();

app.Run();
