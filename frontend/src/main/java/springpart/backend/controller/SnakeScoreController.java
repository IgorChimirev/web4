
package springpart.backend.controller;

import org.springframework.http.HttpStatus;
import springpart.backend.entity.SnakeScore;
import springpart.backend.service.SnakeScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("/api/snake")
@CrossOrigin(origins = "*")
public class SnakeScoreController {

    @Autowired
    private SnakeScoreService scoreService;

    @PostMapping("/score")
    public ResponseEntity<SnakeScore> saveScore(@RequestBody SnakeScore score) {
        try {
            // Устанавливаем текущее время, если не установлено
            if (score.getCreatedAt() == null) {
                score.setCreatedAt(LocalDateTime.now());
            }

            SnakeScore savedScore = scoreService.saveScore(score);
            return ResponseEntity.ok(savedScore);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/scores")
    public ResponseEntity<List<SnakeScore>> getTopScores() {
        try {
            List<SnakeScore> topScores = scoreService.getTopScores();
            return ResponseEntity.ok(topScores);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/scores/{playerName}")
    public ResponseEntity<List<SnakeScore>> getPlayerScores(@PathVariable String playerName) {
        try {
            List<SnakeScore> playerScores = scoreService.getPlayerScores(playerName);
            return ResponseEntity.ok(playerScores);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}