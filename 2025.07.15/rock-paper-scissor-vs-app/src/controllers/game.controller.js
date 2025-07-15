/**
 * @file game.controller.js
 * @description UI와 상호작용하고, 서비스들을 조율하여 게임을 진행하는 컨트롤러
 */

import { handDetectionService } from "../services/hand-detection.service.js";
import { gameService } from "../services/game.service.js";

const gameController = {
    // Teachable Machine 모델 URL
    MODEL_URL: "./data/models/rock-paper-scissor/",
    
    // DOM 요소 캐싱
    elements: {
        webcamContainer: null,
        labelContainer: null,
        playButton: null,
        gameStatus: null,
        playerChoice: null,
        computerChoice: null,
        statsList: null,
        logList: null,
    },

    /**
     * 애플리케이션을 초기화합니다.
     */
    async init() {
        this.cacheDOMElements();
        this.addEventListeners();
        
        this.updateStats();
        this.updateGameLog();

        try {
            this.elements.gameStatus.textContent = "웹캠을 로딩 중입니다...";
            await handDetectionService.init(this.MODEL_URL, this.elements.webcamContainer, this.elements.labelContainer);
            this.elements.gameStatus.textContent = "준비 완료! '승부!' 버튼을 누르세요.";
            this.elements.playButton.disabled = false;
        } catch (error) {
            console.error("초기화 실패:", error);
            this.elements.gameStatus.textContent = "오류: 카메라를 시작할 수 없습니다.";
        }
    },

    /**
     * 사용할 DOM 요소들을 캐싱합니다.
     */
    cacheDOMElements() {
        this.elements.webcamContainer = document.getElementById("webcam-container");
        this.elements.labelContainer = document.getElementById("label-container");
        this.elements.playButton = document.getElementById("play-button");
        this.elements.gameStatus = document.getElementById("game-status");
        this.elements.playerChoice = document.getElementById("player-choice-text");
        this.elements.computerChoice = document.getElementById("computer-choice-text");
        this.elements.statsList = document.getElementById("stats-list");
        this.elements.logList = document.getElementById("log-list");
    },

    /**
     * 이벤트 리스너를 등록합니다.
     */
    addEventListeners() {
        this.elements.playButton.addEventListener("click", () => this.playRound());
    },

    /**
     * 게임 한 라운드를 진행합니다.
     */
    async playRound() {
        this.elements.playButton.disabled = true;
        this.elements.playerChoice.textContent = "???";
        this.elements.computerChoice.textContent = "???";
        this.elements.gameStatus.textContent = "3초 동안 손을 보여주세요...";

        // 3초간 손 감지
        const playerChoice = await handDetectionService.detectBestHand(3);
        this.elements.playerChoice.textContent = this.addEmoji(playerChoice);

        // 컴퓨터 선택 및 승패 결정
        const computerChoice = gameService.getComputerChoice();
        this.elements.computerChoice.textContent = this.addEmoji(computerChoice);
        
        const result = gameService.determineWinner(playerChoice, computerChoice);
        gameService.recordResult(playerChoice, computerChoice, result);

        // 결과 업데이트
        this.updateGameStatus(result);
        this.updateStats();
        this.updateGameLog();

        this.elements.playButton.disabled = false;
    },
    
    /**
     * 게임 통계 UI를 업데이트합니다.
     */
    updateStats() {
        const stats = gameService.getStats();
        this.elements.statsList.innerHTML = `
            <p>승부 횟수: ${stats.played}</p>
            <p>승리: ${stats.wins}</p>
            <p>패배: ${stats.losses}</p>
            <p>무승부: ${stats.draws}</p>
            <p>승률: ${stats.winRate}%</p>
        `;
    },

    /**
     * 게임 로그 UI를 업데이트합니다.
     */
    updateGameLog() {
        const logs = gameService.gameLog;
        this.elements.logList.innerHTML = logs.map(log => 
            `<li>
                [${log.timestamp}] Round ${log.round}: 
                <strong>You (${this.addEmoji(log.player)})</strong> vs 
                <strong>Computer (${this.addEmoji(log.computer)})</strong> - 
                <span class="${log.result}">${log.result.toUpperCase()}</span>
            </li>`
        ).join('');
    },

    /**
     * 게임 상태 메시지를 업데이트합니다.
     * @param {'win' | 'loss' | 'draw'} result 
     */
    updateGameStatus(result) {
        const statusElement = this.elements.gameStatus;
        statusElement.classList.remove('win', 'loss', 'draw');
        statusElement.classList.add(result);

        if (result === 'win') {
            statusElement.textContent = "🎉 승리! 🎉";
        } else if (result === 'loss') {
            statusElement.textContent = "😥 패배... 😥";
        } else {
            statusElement.textContent = "🤝 무승부 🤝";
        }
    },
    
    /**
     * 선택지에 맞는 이모지를 추가합니다.
     * @param {string} choice - "가위", "바위", "보", "감지 안됨"
     * @returns {string} - "바위 ✊", "보 🖐️", "가위 ✌️", "감지 안됨 🤔"
     */
    addEmoji(choice) {
        const dictionary = {
            "바위": "바위 ✊",
            "보": "보 🖐️",
            "가위": "가위 ✌️",
            "감지 안됨": "감지 안됨 🤔"
        };
        return dictionary[choice] || "알 수 없음";
    }
};

// DOM이 로드되면 컨트롤러를 초기화합니다.
document.addEventListener("DOMContentLoaded", () => {
    gameController.init();
}); 