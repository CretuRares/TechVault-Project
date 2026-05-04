package web.proiect.model;

import java.util.List;

public class CheckoutRequestDTO {
    private List<CartItemDTO> items;
    private boolean usePoints;

    public CheckoutRequestDTO() {
    }

    public CheckoutRequestDTO(List<CartItemDTO> items, boolean usePoints) {
        this.items = items;
        this.usePoints = usePoints;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }

    public boolean isUsePoints() {
        return usePoints;
    }

    public void setUsePoints(boolean usePoints) {
        this.usePoints = usePoints;
    }
}
