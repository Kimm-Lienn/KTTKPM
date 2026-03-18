package fit.iuh.se.tax.state;

import fit.iuh.se.tax.strategy.TaxStrategy;
import fit.iuh.se.tax.strategy.VATTax;

public class NormalProduct implements ProductState {
    @Override
    public TaxStrategy getTaxStrategy() {
        return new VATTax();
    }
}
