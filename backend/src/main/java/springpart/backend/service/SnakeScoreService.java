package springpart.backend.service;

import springpart.backend.entity.SnakeScore;
import springpart.backend.repository.SnakeScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnakeScoreService {

    @Autowired
    private SnakeScoreRepository scoreRepository;

    public List<SnakeScore> getTopScores() {
        return scoreRepository.findTop10ByOrderByScoreDesc();
    }

    public SnakeScore saveScore(SnakeScore score) {
        return scoreRepository.save(score);
    }

    public List<SnakeScore> getPlayerScores(String playerName) {
        return scoreRepository.findByPlayerNameOrderByScoreDesc(playerName);
    }

    public void deleteScore(Long id) {
        scoreRepository.deleteById(id);
    }
}