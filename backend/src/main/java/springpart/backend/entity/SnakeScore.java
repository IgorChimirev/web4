
package springpart.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "snake_scores")
public class SnakeScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String playerName;

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    // Конструкторы
    public SnakeScore() {}

    public SnakeScore(String playerName, Integer score, Integer level) {
        this.playerName = playerName;
        this.score = score;
        this.level = level;
        this.createdAt = LocalDateTime.now(); // Устанавливаем текущее время
    }

    // Геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}