package fit.iuh.se.usermanagement;

public class Member extends User {
    public Member(String name) {
        super(name);
    }

    @Override
    public String getRole() {
        return "Member";
    }
}
