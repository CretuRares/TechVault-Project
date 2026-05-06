package web.proiect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import web.proiect.repository.*;
import web.proiect.model.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Esențial pentru React!
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
    public ResponseEntity<?> checkout(@PathVariable Long userId, @RequestBody CheckoutRequestDTO request) {
        
        // 1. Găsim utilizatorul folosind instanța injectată (cu literă mică!)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit"));

        // Verificăm dacă are un card asociat
        Optional<Card> userCard = cardRepository.findByUserId(userId);
        if (userCard.isEmpty()) {
            return ResponseEntity.badRequest().body("Trebuie să adaugi un card în cont pentru a putea comanda.");
        }
        
        BigDecimal totalOrder =BigDecimal.ZERO;
        
        // Creăm o comandă nouă
        Order order = new Order(user, BigDecimal.ZERO, LocalDateTime.now());
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItemDTO item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Produsul nu a fost găsit"));
            
            // 2. Verificăm stocul
            if (product.getStock() < item.getQuantity()) {
                return ResponseEntity.badRequest().body("Stoc insuficient pentru: " + product.getName());
            }

            // 3. Scădem stocul
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
            
            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            totalOrder = totalOrder.add(itemTotal);

            // Adăugăm produsul în comandă
            OrderItem orderItem = new OrderItem(order, product, item.getQuantity(), product.getPrice());
            orderItems.add(orderItem);
        }

        BigDecimal finalTotal = totalOrder;
        int currentPoints = user.getPoints() != null ? user.getPoints() : 0;
        
        if (request.isUsePoints() && currentPoints > 0) {
            BigDecimal discount = BigDecimal.valueOf(currentPoints).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            
            if (discount.compareTo(finalTotal) >= 0) {
                // Points cover the entire order
                BigDecimal pointsUsedDec = finalTotal.multiply(BigDecimal.valueOf(100));
                currentPoints -= pointsUsedDec.intValue();
                finalTotal = BigDecimal.ZERO;
            } else {
                // Points cover part of the order
                finalTotal = finalTotal.subtract(discount);
                currentPoints = 0;
            }
        }

        order.setTotalAmount(finalTotal);
        order.setItems(orderItems);
        orderRepository.save(order);

        // 4. Calculăm punctele și salvăm (doar din ce a mai rămas de plată)
        int pointsGained = finalTotal.divide(BigDecimal.valueOf(10), RoundingMode.HALF_UP).intValue();
        user.setPoints(currentPoints + pointsGained);
        
        userRepository.save(user);

        return ResponseEntity.ok(new CheckoutResponseDTO(user, pointsGained)); 
    }

}