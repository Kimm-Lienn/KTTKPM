package fit.iuh.se.order.state;

import fit.iuh.se.OrderContext;

public class CancelledState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println(" Đơn hàng bị hủy – hoàn tiền.");
    }
}