package fit.iuh.se;

import fit.iuh.se.payment.decorator.DiscountDecorator;
import fit.iuh.se.payment.decorator.FeeDecorator;
import fit.iuh.se.payment.state.CompletedState;
import fit.iuh.se.payment.state.PaymentState;
import fit.iuh.se.payment.state.PendingState;
import fit.iuh.se.payment.strategy.CreditCardPayment;
import fit.iuh.se.payment.strategy.PaymentStrategy;

public class Main {
    public static void main(String[] args) {

        double amount = 200;

        System.out.println("=== STATE PATTERN ===");
        PaymentState state = new PendingState();
        state.handle();

        state = new CompletedState();
        state.handle();

        System.out.println("\n=== STRATEGY + DECORATOR ===");
        PaymentStrategy payment = new CreditCardPayment();

        payment = new DiscountDecorator(payment);
        payment = new FeeDecorator(payment);

        payment.pay(amount);
    }
}