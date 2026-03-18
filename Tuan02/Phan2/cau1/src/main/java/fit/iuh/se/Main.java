package fit.iuh.se;


import fit.iuh.se.order.decorator.BasicOrder;
import fit.iuh.se.order.decorator.GiftWrap;
import fit.iuh.se.order.decorator.Insurance;
import fit.iuh.se.order.decorator.OrderService;
import fit.iuh.se.order.strategy.FastShipping;
import fit.iuh.se.order.strategy.ShippingStrategy;

public class Main {
    public static void main(String[] args) {

        System.out.println("=== STATE PATTERN ===");
        OrderContext order = new OrderContext();
        order.process();
        order.process();

        System.out.println("\n=== STRATEGY PATTERN ===");
        ShippingStrategy shipping = new FastShipping();
        shipping.ship();

        System.out.println("\n=== DECORATOR PATTERN ===");
        OrderService service = new BasicOrder();
        service = new GiftWrap(service);
        service = new Insurance(service);

        System.out.println(" Tổng tiền đơn hàng: " + service.cost());
    }
}