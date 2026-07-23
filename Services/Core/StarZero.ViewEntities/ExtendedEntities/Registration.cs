namespace StarZero.ViewEntities;

public class Registration : PersonalDetail
{
    public Login LoginDetail { get; set; } = new Login();

    public UserVehicle Vehicle { get; set; } =  new UserVehicle();

    public UserPlan Plan { get; set; } =  new UserPlan();
}
  