// Reveal.js 초기화 및 메인 스크립트

// Reveal.js 설정
Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    
    // 키보드 단축키
    keyboard: {
        13: 'next', // Enter
        27: 'overview', // ESC
        32: 'next' // Space
    },
    
    // 플러그인
    plugins: [
        RevealMarkdown,
        RevealHighlight,
        RevealNotes
    ],
    
    // 의존성
    dependencies: [
        {
            src: 'https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/plugin/markdown/marked.js',
            condition: function() { return !!document.querySelector('[data-markdown]'); }
        },
        {
            src: 'https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/plugin/markdown/markdown.js',
            condition: function() { return !!document.querySelector('[data-markdown]'); }
        }
    ]
});

// 슬라이드 이벤트 리스너
Reveal.on('ready', event => {
    console.log('Presentation ready');
    // 시각화 재초기화
    setTimeout(() => {
        if (typeof initializeVisualizations === 'function') {
            initializeVisualizations();
        }
    }, 500);
});

Reveal.on('slidechanged', event => {
    console.log('Slide changed to:', event.indexh, event.indexv);
    
    // 슬라이드별 특별한 처리
    if (typeof onSlideChanged === 'function') {
        onSlideChanged(event);
    }
    
    // 차트 업데이트 (반응형 처리)
    setTimeout(() => {
        if (window.Chart && Chart.instances) {
            Object.values(Chart.instances).forEach(instance => {
                if (instance && typeof instance.resize === 'function') {
                    instance.resize();
                }
            });
        }
    }, 300);
});

// 프레젠테이션 유틸리티 함수들
const PresentationUtils = {
    // 현재 슬라이드 인덱스 가져오기
    getCurrentSlide: () => {
        const indices = Reveal.getIndices();
        return {
            horizontal: indices.h,
            vertical: indices.v
        };
    },
    
    // 특정 슬라이드로 이동
    goToSlide: (h, v = 0) => {
        Reveal.slide(h, v);
    },
    
    // 전체화면 토글
    toggleFullscreen: () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    },
    
    // 스피커 노트 토글
    toggleNotes: () => {
        Reveal.getPlugin('notes').open();
    },
    
    // PDF 출력 모드
    enablePrintMode: () => {
        window.location.search += '&print-pdf';
    }
};

// 키보드 단축키 확장
document.addEventListener('keydown', function(event) {
    // F11: 전체화면
    if (event.key === 'F11') {
        event.preventDefault();
        PresentationUtils.toggleFullscreen();
    }
    
    // S: 스피커 노트
    if (event.key === 's' || event.key === 'S') {
        if (!event.ctrlKey && !event.altKey) {
            PresentationUtils.toggleNotes();
        }
    }
    
    // P: PDF 모드
    if (event.key === 'p' || event.key === 'P') {
        if (event.ctrlKey) {
            event.preventDefault();
            PresentationUtils.enablePrintMode();
        }
    }
});

// 터치 제스처 지원 (모바일)
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                Reveal.next(); // 왼쪽으로 스와이프 = 다음 슬라이드
            } else {
                Reveal.prev(); // 오른쪽으로 스와이프 = 이전 슬라이드
            }
        }
    } else {
        if (Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0) {
                Reveal.down(); // 위로 스와이프 = 아래 슬라이드
            } else {
                Reveal.up(); // 아래로 스와이프 = 위 슬라이드
            }
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// 자동 진행 기능 (옵션)
const AutoProgress = {
    timer: null,
    interval: 30000, // 30초
    
    start: function() {
        this.timer = setInterval(() => {
            if (!Reveal.isLastSlide()) {
                Reveal.next();
            } else {
                this.stop();
            }
        }, this.interval);
    },
    
    stop: function() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },
    
    toggle: function() {
        if (this.timer) {
            this.stop();
        } else {
            this.start();
        }
    }
};

// 프레젠테이션 상태 관리
const PresentationState = {
    startTime: null,
    slideTimings: [],
    
    init: function() {
        this.startTime = new Date();
        this.recordSlideEntry();
    },
    
    recordSlideEntry: function() {
        const currentTime = new Date();
        const slideIndex = PresentationUtils.getCurrentSlide();
        
        this.slideTimings.push({
            slide: slideIndex,
            timestamp: currentTime,
            timeFromStart: currentTime - this.startTime
        });
    },
    
    getStatistics: function() {
        const totalTime = new Date() - this.startTime;
        const averageTimePerSlide = totalTime / this.slideTimings.length;
        
        return {
            totalTime: totalTime,
            averageTimePerSlide: averageTimePerSlide,
            slideCount: this.slideTimings.length,
            timings: this.slideTimings
        };
    }
};

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 프레젠테이션 상태 초기화
    PresentationState.init();
    
    // 반응형 레이아웃 매니저 초기화
    ResponsiveLayoutManager.initialize();
    
    // 슬라이드 변경 시 타이밍 기록
    Reveal.on('slidechanged', () => {
        PresentationState.recordSlideEntry();
        // 슬라이드 변경 시에도 현재 슬라이드의 시각화 체크
        setTimeout(() => {
            ResponsiveLayoutManager.regenerateVisualizations();
        }, 100);
    });
    
    // 개발 모드에서 통계 출력
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Alt + D로 개발자 정보 출력
        document.addEventListener('keydown', function(event) {
            if (event.altKey && event.key === 'd') {
                console.log('Presentation Statistics:', PresentationState.getStatistics());
                console.log('Current Breakpoint:', ResponsiveLayoutManager.getCurrentBreakpoint());
                console.log('Viewport Size:', window.innerWidth + 'x' + window.innerHeight);
            }
        });
    }
});

// 인쇄/PDF 지원
window.addEventListener('beforeprint', function() {
    // 인쇄 전 차트 크기 조정
    if (window.Chart && Chart.instances) {
        Object.values(Chart.instances).forEach(instance => {
            if (instance && typeof instance.resize === 'function') {
                instance.resize();
            }
        });
    }
});

// 반응형 레이아웃 매니저
const ResponsiveLayoutManager = {
    lastBreakpoint: null,
    resizeTimeout: null,
    
    initialize() {
        this.lastBreakpoint = this.getCurrentBreakpoint();
        this.bindEvents();
    },
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= 480) return 'mobile';
        if (width <= 768) return 'tablet';
        if (width <= 1024) return 'desktop-small';
        return 'desktop';
    },
    
    bindEvents() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150); // 디바운스로 성능 최적화
        });
        
        // 방향 변경 감지 (모바일)
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 500); // 방향 변경 후 지연
        });
    },
    
    handleResize() {
        const currentBreakpoint = this.getCurrentBreakpoint();
        
        // 브레이크포인트가 변경된 경우에만 재생성
        if (currentBreakpoint !== this.lastBreakpoint) {
            console.log(`Breakpoint changed: ${this.lastBreakpoint} → ${currentBreakpoint}`);
            this.lastBreakpoint = currentBreakpoint;
            this.regenerateVisualizations();
        }
        
        // 차트 크기 조정
        this.resizeCharts();
        
        // 컨테이너 높이 동적 조정
        this.adjustContainerHeights();
    },
    
    regenerateVisualizations() {
        // 현재 활성 슬라이드의 시각화만 재생성
        const currentSlide = Reveal.getCurrentSlide();
        if (!currentSlide) return;
        
        // 차트 재생성 (브레이크포인트 변경 시)
        if (currentSlide.querySelector('#context-window-chart')) {
            // 기존 차트 제거 후 재생성
            const canvas = currentSlide.querySelector('#context-window-chart');
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
                chartInstance.destroy();
            }
            createContextWindowChart();
        }
        
        if (currentSlide.querySelector('#scaling-chart')) {
            const canvas = currentSlide.querySelector('#scaling-chart');
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
                chartInstance.destroy();
            }
            createScalingChart();
        }
        
        if (currentSlide.querySelector('#verdict-chart')) {
            const canvas = currentSlide.querySelector('#verdict-chart');
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
                chartInstance.destroy();
            }
            createVerdictChart();
        }
        
        // RAG 아키텍처 재생성
        if (currentSlide.querySelector('#rag-architecture')) {
            createRAGArchitecture();
        }
        
        // GraphRAG 아키텍처 재생성
        if (currentSlide.querySelector('#graphrag-architecture')) {
            createGraphRAGArchitecture();
        }
        
        // 모델 라우터 재생성
        if (currentSlide.querySelector('#router-architecture')) {
            createRouterArchitecture();
        }
        
        // JEPA 시각화 재생성
        if (currentSlide.querySelector('#jepa-viz')) {
            createJEPAViz();
        }
        
        // 메모리 진화 경로 재생성
        if (currentSlide.querySelector('#memory-evolution')) {
            createMemoryEvolution();
        }
        
        // 타임라인 재생성
        if (currentSlide.querySelector('#memory-timeline')) {
            createMemoryTimeline();
        }
        
        // 뇌 메모리 재생성
        if (currentSlide.querySelector('#brain-memory')) {
            createBrainMemoryViz();
        }
        
        // 타이틀 메모리 애니메이션 재생성
        if (currentSlide.querySelector('#title-memory')) {
            createTitleMemoryAnimation();
        }
    },
    
    resizeCharts() {
        if (window.Chart && Chart.instances) {
            Object.values(Chart.instances).forEach(instance => {
                if (instance && typeof instance.resize === 'function') {
                    instance.resize();
                }
            });
        }
    },
    
    adjustContainerHeights() {
        const breakpoint = this.getCurrentBreakpoint();
        const viewportHeight = window.innerHeight;
        
        // 동적 높이 계산
        let containerHeight;
        switch (breakpoint) {
            case 'mobile':
                containerHeight = Math.min(viewportHeight * 0.6, 400);
                break;
            case 'tablet':
                containerHeight = Math.min(viewportHeight * 0.65, 500);
                break;
            default:
                containerHeight = Math.min(viewportHeight * 0.7, 600);
        }
        
        // 아키텍처 다이어그램 컨테이너 높이 조정
        document.querySelectorAll('.architecture-diagram, .jepa-architecture, .brain-memory-viz, .evolution-path').forEach(container => {
            container.style.height = `${containerHeight}px`;
        });
        
        // 타임라인 높이 조정
        document.querySelectorAll('.timeline').forEach(timeline => {
            timeline.style.height = `${Math.min(containerHeight * 0.8, 400)}px`;
        });
    }
};

// 창 크기 변경 시 반응형 매니저 사용
window.addEventListener('resize', function() {
    // 기존 차트 리사이즈는 ResponsiveLayoutManager에서 처리
});

// 에러 처리
window.addEventListener('error', function(event) {
    console.error('Presentation Error:', event.error);
    
    // 개발 모드에서만 에러 표시
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff4444;
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 9999;
            max-width: 300px;
            font-size: 12px;
        `;
        errorDiv.textContent = `Error: ${event.error.message}`;
        document.body.appendChild(errorDiv);
        
        // 5초 후 제거
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 5000);
    }
});

// 전역 유틸리티 객체 노출
window.PresentationUtils = PresentationUtils;
window.AutoProgress = AutoProgress;
window.PresentationState = PresentationState;