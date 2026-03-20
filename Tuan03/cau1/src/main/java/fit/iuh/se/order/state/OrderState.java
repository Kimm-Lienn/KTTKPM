package fit.iuh.se.order.state;

import fit.iuh.se.OrderContext;

public interface OrderState {
    void handle(OrderContext order);
}
