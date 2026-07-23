namespace StarZero.Helper;

public static class StarZeroConstants
{
    public const string HostingEnvironment = "Hosting:Environment";

    public const string ServiceAuthorizationHeaderScheme = "BaseSecurityAPIkey";

    public static bool ACTIVESTATUS { get; set; } = true;

    public static string DATE_FORMAT { get; set; } = "MMM d, yyy";

    public static string TIME_FORMAT { get; set; } = "hh:mm tt";

    public static string DEFAULT_SQL_DATE { get; set; } = "Jan 1, 1900";

    public static string MASTERDATAFROMCACHE { get; set; } = "ApplicationConfiguration:MasterDataFromCache";

    public static int JWT_MAX_AGE = 8;

    public static class DataBase
    {

        public static string VW_LoginDetail { get; set; } = "vw_logindetail";

        public static string VW_PaymentSuccess { get; set; } = "vw_paymentsuccess";

        public static string VW_UserPlan { get; set; } = "vw_userplan";

        public static string SP_GetPlanDashboard { get; set; } = "sp_getplandashboard";

        public static string SP_PersonDetails { get; set; } = "sp_persondetails";
    }

    public static class EmailTemplatesInfo
    {

    }

    public static class PermittedFileTypes
    {
        public static string  JPEG_img = "image/jpeg";


        public static string JPG_img = "image/jpg";


        public static string PNG_img = "image/png";


        public static readonly List<string> FileType = new List<string>
        {
            JPEG_img,
            JPG_img,
            PNG_img
        };
    }
}