package fit.iuh.se;

import fit.iuh.se.tax.state.LuxuryProduct;
import fit.iuh.se.tax.state.NormalProduct;
import fit.iuh.se.tax.state.ProductState;
import fit.iuh.se.tax.strategy.TaxStrategy;

public class Main {
    public static void main(String[] args) {

        double price = 1000;

        System.out.println("=== SẢN PHẨM THƯỜNG ===");
        ProductState normal = new NormalProduct();
        TaxStrategy normalTax = normal.getTaxStrategy();
        System.out.println("Thuế: " + normalTax.calculate(price));

        System.out.println("\n=== SẢN PHẨM XA XỈ ===");
        ProductState luxury = new LuxuryProduct();
        TaxStrategy luxuryTax = luxury.getTaxStrategy();
        System.out.println("Thuế: " + luxuryTax.calculate(price));
    }
}