package fit.iuh.se.tax.state;

import fit.iuh.se.tax.decorator.SpecialTax;
import fit.iuh.se.tax.strategy.LuxuryTax;
import fit.iuh.se.tax.strategy.TaxStrategy;

public class LuxuryProduct implements ProductState {
    @Override
    public TaxStrategy getTaxStrategy() {
        return new SpecialTax(new LuxuryTax());
    }
}
