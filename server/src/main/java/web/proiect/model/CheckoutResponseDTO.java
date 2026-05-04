package web.proiect.model;

public class CheckoutResponseDTO {
    private User user;
    private int pointsGained;

    public CheckoutResponseDTO() {
    }

    public CheckoutResponseDTO(User user, int pointsGained) {
        this.user = user;
        this.pointsGained = pointsGained;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getPointsGained() {
        return pointsGained;
    }

    public void setPointsGained(int pointsGained) {
        this.pointsGained = pointsGained;
    }
}
