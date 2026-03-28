package web.proiect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.proiect.model.Product; 
import web.proiect.repository.ProductRepository;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Esențial pentru React!
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

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
}