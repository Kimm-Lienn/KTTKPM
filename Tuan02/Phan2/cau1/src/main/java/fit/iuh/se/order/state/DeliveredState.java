package fit.iuh.se.order.state;

import fit.iuh.se.OrderContext;

public class DeliveredState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("Đơn hàng đã được giao.");
    }
}