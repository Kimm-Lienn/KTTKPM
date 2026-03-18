package fit.iuh.se.tax.decorator;

import fit.iuh.se.tax.strategy.TaxStrategy;

public abstract class TaxDecorator implements TaxStrategy {

    protected TaxStrategy tax;

    public TaxDecorator(TaxStrategy tax) {
        this.tax = tax;
    }
}