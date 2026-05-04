package web.proiect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.proiect.model.Card;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByUserId(Long userId);
}
