package web.proiect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import web.proiect.repository.*;
import web.proiect.model.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Esențial pentru React!
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


        // Adaugă un produs nou (POST)
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    

    // 1. UPDATE PRODUCT (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product productData) {
        return productRepository.findById(id)
                .map(product -> {
                    // Actualizăm câmpurile dorite
                    product.setName(productData.getName());
                    product.setDescription(productData.getDescription());
                    product.setPrice(productData.getPrice());
                    product.setStock(productData.getStock());
                    product.setImageUrl(productData.getImageUrl());
                    
                    // Salvăm modificările
                    Product updated = productRepository.save(product);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 2. DELETE PRODUCT (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    productRepository.delete(product);
                    return ResponseEntity.ok("Produsul a fost șters definitiv!");
                })
                .orElse(ResponseEntity.notFound().build());
    }


   @PostMapping("/checkout/{userId}")
    @org.springframework.transaction.annotation.Transactional // Asigură-te că ai importul corect
    public ResponseEntity<?> checkout(@PathVariable Long userId, @RequestBody List<CartItemDTO> items) {
        
        // 1. Găsim utilizatorul folosind instanța injectată (cu literă mică!)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit"));
        
        BigDecimal totalOrder =BigDecimal.ZERO;

        for (CartItemDTO item : items) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Produsul nu a fost găsit"));
            
            // 2. Verificăm stocul
            if (product.getStock() < item.getQuantity()) {
                return ResponseEntity.badRequest().body("Stoc insuficient pentru: " + product.getName());
            }

            // 3. Scădem stocul
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
            
            totalOrder = totalOrder.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        // 4. Calculăm punctele și salvăm
       // Varianta corectă: folosim .divide() și BigDecimal.valueOf(10)
        int pointsGained = totalOrder.divide(BigDecimal.valueOf(10), RoundingMode.HALF_UP).intValue();
        user.setPoints((user.getPoints() != null ? user.getPoints() : 0) + pointsGained);
        
        userRepository.save(user);

        return ResponseEntity.ok(user); 
    }

}