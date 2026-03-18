package fit.iuh.se.order.state;


import fit.iuh.se.OrderContext;

public class ProcessingState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println(" Đang xử lý: đóng gói & vận chuyển...");
        order.setState(new DeliveredState());
    }
}