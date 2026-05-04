package web.proiect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.proiect.model.Card;
import web.proiect.model.Order;
import web.proiect.model.User;
import web.proiect.repository.CardRepository;
import web.proiect.repository.OrderRepository;
import web.proiect.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class UserProfileController {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // --- Card Endpoints ---

    @GetMapping("/card/{userId}")
    public ResponseEntity<?> getCard(@PathVariable Long userId) {
        Optional<Card> card = cardRepository.findByUserId(userId);
        if (card.isPresent()) {
            return ResponseEntity.ok(card.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/card/{userId}")
    public ResponseEntity<?> addOrUpdateCard(@PathVariable Long userId, @RequestBody Card cardData) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Utilizatorul nu a fost găsit.");
        }

        Optional<Card> existingCardOpt = cardRepository.findByUserId(userId);
        Card card;
        if (existingCardOpt.isPresent()) {
            card = existingCardOpt.get();
            card.setCardNumber(cardData.getCardNumber());
            card.setExpiryDate(cardData.getExpiryDate());
            card.setCvv(cardData.getCvv());
        } else {
            card = new Card(cardData.getCardNumber(), cardData.getExpiryDate(), cardData.getCvv(), user);
        }

        Card savedCard = cardRepository.save(card);
        return ResponseEntity.ok(savedCard);
    }

    @DeleteMapping("/card/{userId}")
    public ResponseEntity<?> deleteCard(@PathVariable Long userId) {
        Optional<Card> existingCardOpt = cardRepository.findByUserId(userId);
        if (existingCardOpt.isPresent()) {
            cardRepository.delete(existingCardOpt.get());
            return ResponseEntity.ok("Cardul a fost șters.");
        }
        return ResponseEntity.notFound().build();
    }

    // --- Order Endpoints ---

    @GetMapping("/orders/{userId}")
    public ResponseEntity<List<Order>> getOrders(@PathVariable Long userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByOrderDateDesc(userId);
        return ResponseEntity.ok(orders);
    }
}
