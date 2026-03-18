package fit.iuh.se.usermanagement;

public class Guest extends User {
    public Guest(String name) {
        super(name);
    }

    @Override
    public String getRole() {
        return "Guest";
    }
}