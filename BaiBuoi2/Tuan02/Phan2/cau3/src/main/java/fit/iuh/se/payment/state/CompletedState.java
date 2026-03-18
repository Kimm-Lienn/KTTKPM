package fit.iuh.se.payment.state;

public class CompletedState implements PaymentState {
    @Override
    public void handle() {
        System.out.println(" Thanh toán hoàn tất!");
    }
}
