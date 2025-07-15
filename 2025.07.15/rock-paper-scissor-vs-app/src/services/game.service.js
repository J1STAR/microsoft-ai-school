/**
 * @file game.service.js
 * @description 가위바위보 게임의 비즈니스 로직을 관리하는 서비스
 */

/**
 * 게임의 상태와 로직을 관리하는 모듈입니다.
 */
export const gameService = {
    choices: ["가위", "바위", "보"], // 클래스 이름을 한글로 변경
    gameLog: [],
    stats: {
        played: 0,
        wins: 0,
        losses: 0,
        draws: 0,
    },

    /**
     * 컴퓨터의 선택을 랜덤하게 결정합니다.
     * @returns {string} "가위", "바위위", "보" 중 하나를 반환합니다.
     */
    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    },

    /**
     * 플레이어와 컴퓨터의 선택에 따라 승자를 결정합니다.
     * @param {string} playerChoice - 플레이어의 선택
     * @param {string} computerChoice - 컴퓨터의 선택
     * @returns {'win' | 'loss' | 'draw'} 게임 결과를 반환합니다.
     */
    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'draw';
        }
        if (
            (playerChoice === "바위" && computerChoice === "가위") ||
            (playerChoice === "가위" && computerChoice === "보") ||
            (playerChoice === "보" && computerChoice === "바위")
        ) {
            return 'win';
        }
        return 'loss';
    },

    /**
     * 한 라운드의 게임 결과를 기록하고 통계를 업데이트합니다.
     * @param {string} playerChoice 
     * @param {string} computerChoice 
     * @param {'win' | 'loss' | 'draw'} result 
     * @returns {object} 현재 게임 로그 항목
     */
    recordResult(playerChoice, computerChoice, result) {
        this.stats.played++;
        if (result === 'win') this.stats.wins++;
        else if (result === 'loss') this.stats.losses++;
        else this.stats.draws++;

        const logEntry = {
            round: this.stats.played,
            player: playerChoice,
            computer: computerChoice,
            result,
            timestamp: new Date().toLocaleString(),
        };
        
        this.gameLog.unshift(logEntry); // 최신 기록이 위로 오도록 unshift 사용
        return logEntry;
    },

    /**
     * 현재 승률을 계산합니다.
     * @returns {number} 승률 (0-100)
     */
    getWinRate() {
        if (this.stats.played === 0) {
            return 0;
        }
        return Math.round((this.stats.wins / this.stats.played) * 100);
    },

    /**
     * 현재 게임 통계를 반환합니다.
     * @returns {object} 게임 통계 객체
     */
    getStats() {
        return {
            ...this.stats,
            winRate: this.getWinRate(),
        }
    }
}; 