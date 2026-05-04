package web.proiect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.proiect.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
