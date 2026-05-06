package web.proiect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.proiect.model.Product;
import web.proiect.model.Review;
import web.proiect.model.User;
import web.proiect.repository.ProductRepository;
import web.proiect.repository.ReviewRepository;
import web.proiect.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public static class ReviewRequest {
        public Long userId;
        public Long productId;
        public int rating;
        public String comment;
    }

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody ReviewRequest request) {
        if (request.rating < 1 || request.rating > 5) {
            return ResponseEntity.badRequest().body("Rating-ul trebuie să fie între 1 și 5.");
        }

        Optional<User> userOpt = userRepository.findById(request.userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Utilizatorul nu a fost găsit.");
        }

        Optional<Product> productOpt = productRepository.findById(request.productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Produsul nu a fost găsit.");
        }

        // Opțional: Poți verifica dacă există deja un review de la acest user pentru acest produs
        // if (reviewRepository.existsByUserIdAndProductId(request.userId, request.productId)) {
        //     return ResponseEntity.badRequest().body("Ai lăsat deja o recenzie pentru acest produs.");
        // }

        Review review = new Review(userOpt.get(), productOpt.get(), request.rating, request.comment);
        reviewRepository.save(review);

        return ResponseEntity.ok("Review adăugat cu succes!");
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return ResponseEntity.ok(reviews);
    }
}
