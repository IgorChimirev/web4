
package springpart.backend.repository;

import springpart.backend.entity.SnakeScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnakeScoreRepository extends JpaRepository<SnakeScore, Long> {

    // Топ-10 результатов по убыванию счета
    @Query("SELECT s FROM SnakeScore s ORDER BY s.score DESC, s.createdAt DESC")
    List<SnakeScore> findTop10ByOrderByScoreDesc();

    // Результаты конкретного игрока
    List<SnakeScore> findByPlayerNameOrderByScoreDesc(String playerName);
}