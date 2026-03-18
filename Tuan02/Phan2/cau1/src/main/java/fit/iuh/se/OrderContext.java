package fit.iuh.se;

import fit.iuh.se.order.state.NewOrderState;
import fit.iuh.se.order.state.OrderState;

public class OrderContext {

    private OrderState state;

    public OrderContext() {
        this.state = new NewOrderState();
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void process() {
        state.handle(this);
    }
}
