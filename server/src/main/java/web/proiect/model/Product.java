package web.proiect.model;

import jakarta.persistence.*;
import java.math.BigDecimal; // Import important pentru prețuri exacte

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url") // Sincronizăm cu numele din SQL
    private String imageUrl;

    @Column(nullable = false)
    private String name; // Numele produsului (ex: "RTX 4070")

    @Column(length = 1000)
    private String description; // Descrierea componentelor (ex: "12GB GDDR6X, DLSS 3")

    @Column(nullable = false)
    private BigDecimal price; // Prețul produsului (ex: 3499.99)


    private String category; // Categoria (ex: "Plăci Video", "Procesoare")

    private int stock; // Cantitatea în stoc



    // --- Constructor fără argumente (obligatoriu pentru JPA/Hibernate) ---
    public Product() {
    }

    // --- Constructor cu argumente (util pentru DataInitializer) ---
  public Product(String name, String description, BigDecimal price, String category, int stock, String imageUrl) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.imageUrl = imageUrl;
}

    // --- Getteri și Setteri ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}