package web.proiect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.proiect.model.Product;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Spring va genera automat SQL-ul pentru aceste metode bazându-se pe numele lor!
    
    // Găsește produse după categorie (ex: "Plăci Video")
    List<Product> findByCategory(String category);

    // Găsește produse care au stoc mai mare de 0
    List<Product> findByStockGreaterThan(int stock);
    
    // Găsește produse după nume care conțin un anumit text (search)
    List<Product> findByNameContainingIgnoreCase(String name);
}