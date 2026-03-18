package fit.iuh.se.payment.decorator;

import fit.iuh.se.payment.strategy.PaymentStrategy;

public abstract class PaymentDecorator implements PaymentStrategy {

    protected PaymentStrategy payment;

    public PaymentDecorator(PaymentStrategy payment) {
        this.payment = payment;
    }
}
