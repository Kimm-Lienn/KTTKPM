package fit.iuh.se.payment.strategy;

public class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println(" Thanh toán bằng thẻ tín dụng: " + amount);
    }
}
