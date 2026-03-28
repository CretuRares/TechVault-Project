package web.proiect.repository;

import web.proiect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Aici Spring Boot va genera automat metode precum:
    // save(), findAll(), findById(), delete()
    
    // Putem adăuga și o metodă personalizată pentru Login:
    User findByUsername(String username);
}