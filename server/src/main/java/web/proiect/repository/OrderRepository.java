package web.proiect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.proiect.model.Order;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);
}
