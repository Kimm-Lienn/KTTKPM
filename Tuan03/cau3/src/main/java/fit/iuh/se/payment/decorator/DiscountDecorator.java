package fit.iuh.se.payment.decorator;

import fit.iuh.se.payment.strategy.PaymentStrategy;

public class DiscountDecorator extends PaymentDecorator {

    public DiscountDecorator(PaymentStrategy payment) {
        super(payment);
    }

    @Override
    public void pay(double amount) {
        System.out.println("➖ Giảm giá: 20");
        payment.pay(amount - 20);
    }
}
