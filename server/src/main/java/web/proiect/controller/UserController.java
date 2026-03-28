package web.proiect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import web.proiect.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import web.proiect.model.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Permite accesul din React
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. Obține toți utilizatorii (util pentru Admin Panel)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2. Obține un utilizator după ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    // 3. Înregistrare utilizator nou (Register)
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // În mod normal, aici am codifica parola, dar pentru început o salvăm așa
        if (user.getRole() == null) {
            user.setRole(Role.USER); // Setăm rolul implicit ca USER
        }
        return userRepository.save(user);
    }

   @PostMapping("/login")
        public ResponseEntity<?> loginUser(@RequestBody User loginData) {
            // Căutăm utilizatorul în baza de date
            User user = userRepository.findByUsername(loginData.getUsername());

            // Verificăm dacă user-ul există ȘI dacă parola coincide
            if (user != null && user.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(user); // Status 200 + obiectul User
            }

            // Dacă datele sunt greșite, trimitem Status 401 și mesajul de eroare
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Utilizatorul sau parola sunt incorecte!");
        }
    // 4. Șterge un utilizator
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}