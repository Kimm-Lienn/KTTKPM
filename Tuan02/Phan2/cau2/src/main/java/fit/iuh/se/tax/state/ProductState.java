package fit.iuh.se.tax.state;

import fit.iuh.se.tax.strategy.TaxStrategy;

public interface ProductState {
    TaxStrategy getTaxStrategy();
}
