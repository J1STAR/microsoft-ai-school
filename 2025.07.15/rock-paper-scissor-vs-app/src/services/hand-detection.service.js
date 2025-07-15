/**
 * @file hand-detection.service.js
 * @description Teachable Machine 모델을 사용하여 웹캠에서 사용자의 손 모양(가위, 바위, 보)을 감지하는 서비스
 */

/**
 * Teachable Machine 모델과 웹캠을 초기화하고 관리하는 모듈입니다.
 */
export const handDetectionService = {
    model: null,
    webcam: null,
    labelContainer: null,
    maxPredictions: 0,
    isDetecting: false,
    _animationFrameId: null,

    /**
     * 모델과 웹캠을 설정하고 초기화합니다.
     * @param {string} modelUrl - Teachable Machine 모델의 URL
     * @param {HTMLElement} webcamContainer - 웹캠 영상을 추가할 DOM 요소
     * @param {HTMLElement} labelContainer - 예측 결과를 표시할 DOM 요소
     */
    async init(modelUrl, webcamContainer, labelContainer) {
        const modelURL = `${modelUrl}model.json`;
        const metadataURL = `${modelUrl}metadata.json`;

        // 모델과 메타데이터 로드
        this.model = await tmImage.load(modelURL, metadataURL);
        this.maxPredictions = this.model.getTotalClasses();

        // 웹캠 설정
        const flip = true; // 웹캠 좌우 반전
        this.webcam = new tmImage.Webcam(300, 300, flip);
        await this.webcam.setup();
        await this.webcam.play();

        // 웹캠 캔버스를 DOM에 추가
        webcamContainer.appendChild(this.webcam.canvas);
        this.labelContainer = labelContainer;
    },

    /**
     * 예측 루프를 시작합니다.
     */
    start() {
        if (this.isDetecting) return;
        this.isDetecting = true;
        this._loop();
    },

    /**
     * 예측 루프를 중지합니다.
     */
    stop() {
        if (!this.isDetecting) return;
        this.isDetecting = false;
        if (this._animationFrameId) {
            window.cancelAnimationFrame(this._animationFrameId);
        }
    },
    
    /**
     * 예측을 수행하고 결과를 반환하는 내부 루프 함수입니다.
     * @private
     */
    async _loop() {
        if (!this.isDetecting) return;
        this.webcam.update();
        await this._predict();
        this._animationFrameId = window.requestAnimationFrame(() => this._loop());
    },

    /**
     * 현재 웹캠 이미지를 기반으로 예측을 수행하고, 가장 확률이 높은 결과를 반환합니다.
     * @returns {Promise<{className: string, probability: number}>} 가장 높은 확률의 예측 결과
     */
    async _predict() {
        if (!this.model || !this.webcam) {
            throw new Error("Service not initialized.");
        }
        
        const prediction = await this.model.predict(this.webcam.canvas);
        let highestProb = 0;
        let bestPrediction = null;

        prediction.forEach((pred, i) => {
            if (pred.probability > highestProb) {
                highestProb = pred.probability;
                bestPrediction = pred;
            }
            // 결과를 labelContainer에 시각적으로 표시 (디버깅/표시용)
            if (this.labelContainer) {
                if (!this.labelContainer.childNodes[i]) {
                    this.labelContainer.appendChild(document.createElement("div"));
                }
                this.labelContainer.childNodes[i].innerHTML = `${pred.className}: ${pred.probability.toFixed(2)}`;
            }
        });
        return bestPrediction;
    },

    /**
     * 지정된 시간(초) 동안 손 모양을 감지하고, 가장 많이 감지된 결과를 반환합니다.
     * @param {number} duration - 감지할 시간(초)
     * @returns {Promise<string>} 가장 많이 감지된 손 모양의 클래스 이름
     */
    async detectBestHand(duration = 3) {
        return new Promise(resolve => {
            const detections = {};
            let bestHand = "감지 안됨"; // 기본값을 한글로 변경

            this.start();

            const detectionInterval = setInterval(async () => {
                const prediction = await this._predict();
                if (prediction && prediction.probability > 0.8) { // 80% 이상 확신할 때만 카운트
                    detections[prediction.className] = (detections[prediction.className] || 0) + 1;
                }
            }, 100); // 0.1초마다 감지

            setTimeout(() => {
                clearInterval(detectionInterval);
                this.stop();

                let maxCount = 0;
                for (const hand in detections) {
                    if (detections[hand] > maxCount) {
                        maxCount = detections[hand];
                        bestHand = hand;
                    }
                }
                resolve(bestHand);

            }, duration * 1000);
        });
    }
}; 