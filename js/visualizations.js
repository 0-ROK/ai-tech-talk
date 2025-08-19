// 시각화 관련 JavaScript

// 차트 설정
const chartColors = {
    primary: '#64b5f6',
    secondary: '#42a5f5',
    accent: '#ff7043',
    warning: '#ffb74d',
    success: '#81c784'
};

// 컨텍스트 윈도우 차트
function createContextWindowChart() {
    const ctx = document.getElementById('context-window-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['GPT-3', 'GPT-3.5', 'GPT-4', 'Claude-3', 'Gemini Pro', '이론적 한계'],
            datasets: [{
                label: '컨텍스트 윈도우 (토큰)',
                data: [4096, 16384, 128000, 200000, 1000000, 2000000],
                backgroundColor: [
                    chartColors.primary,
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.secondary,
                    chartColors.accent,
                    chartColors.warning
                ],
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: 'LLM 컨텍스트 윈도우 발전',
                    color: 'white',
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                        callback: function(value) {
                            return value.toLocaleString() + 'k';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            }
        }
    });
}

// 스케일링 법칙 차트
function createScalingChart() {
    const ctx = document.getElementById('scaling-chart');
    if (!ctx) return;

    const scalingData = {
        labels: ['1B', '10B', '100B', '1T', '10T', '100T'],
        datasets: [
            {
                label: '기존 스케일링 법칙',
                data: [10, 8, 6, 4, 2, 1],
                borderColor: chartColors.primary,
                backgroundColor: 'rgba(100, 181, 246, 0.1)',
                tension: 0.4,
                pointRadius: 6
            },
            {
                label: '실제 성능',
                data: [10, 8, 6, 4.5, 3.5, 3],
                borderColor: chartColors.accent,
                backgroundColor: 'rgba(255, 112, 67, 0.1)',
                tension: 0.4,
                pointRadius: 6,
                borderDash: [5, 5]
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: scalingData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'white' }
                },
                title: {
                    display: true,
                    text: '스케일링 법칙의 한계',
                    color: 'white',
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Performance Loss',
                        color: 'white'
                    },
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Model Parameters',
                        color: 'white'
                    },
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                }
            }
        }
    });
}

// 평가 차트 (GraphRAG 하네스 vs 미래)
function createVerdictChart() {
    const ctx = document.getElementById('verdict-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Harness (임시방편)', 'Proto-Memory (미래 프로토타입)'],
            datasets: [{
                data: [80, 20],
                backgroundColor: [
                    chartColors.accent,
                    chartColors.primary
                ],
                borderWidth: 3,
                borderColor: 'rgba(255, 255, 255, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'white',
                        padding: 20,
                        font: { size: 14 }
                    }
                },
                title: {
                    display: true,
                    text: 'GraphRAG 현재 평가',
                    color: 'white',
                    font: { size: 16 }
                }
            }
        }
    });
}

// RAG 아키텍처 다이어그램
function createRAGArchitecture() {
    const container = document.getElementById('rag-architecture');
    if (!container) return;

    container.innerHTML = `
        <div class="diagram-box" style="top: 20px; left: 50px; width: 120px;">
            Query
        </div>
        <div class="diagram-arrow right" style="top: 50px; left: 190px;"></div>
        <div class="diagram-box" style="top: 20px; left: 230px; width: 120px;">
            Vector DB
        </div>
        <div class="diagram-arrow down" style="top: 100px; left: 280px;"></div>
        <div class="diagram-box" style="top: 140px; left: 230px; width: 120px;">
            Retrieved Docs
        </div>
        <div class="diagram-arrow right" style="top: 170px; left: 370px;"></div>
        <div class="diagram-box" style="top: 140px; left: 410px; width: 120px;">
            LLM
        </div>
        <div class="diagram-arrow down" style="top: 220px; left: 460px;"></div>
        <div class="diagram-box" style="top: 260px; left: 410px; width: 120px;">
            Answer
        </div>
    `;
}

// GraphRAG 아키텍처 다이어그램
function createGraphRAGArchitecture() {
    const container = document.getElementById('graphrag-architecture');
    if (!container) return;

    container.innerHTML = `
        <div class="diagram-box" style="top: 20px; left: 20px; width: 100px; height: 80px;">
            Documents
        </div>
        <div class="diagram-arrow right" style="top: 50px; left: 140px;"></div>
        <div class="diagram-box" style="top: 20px; left: 180px; width: 100px; height: 80px;">
            Knowledge Graph
        </div>
        <div class="diagram-arrow down" style="top: 120px; left: 220px;"></div>
        <div class="diagram-box" style="top: 160px; left: 180px; width: 100px; height: 60px;">
            Communities
        </div>
        <div class="diagram-arrow right" style="top: 180px; left: 300px;"></div>
        <div class="diagram-box" style="top: 160px; left: 340px; width: 100px; height: 60px;">
            Summaries
        </div>
        <div class="diagram-box" style="top: 260px; left: 20px; width: 80px; height: 60px; background: linear-gradient(135deg, #ff7043, #ff5722);">
            Query
        </div>
        <div class="diagram-arrow right" style="top: 280px; left: 120px;"></div>
        <div class="diagram-box" style="top: 260px; left: 160px; width: 120px; height: 60px;">
            Global Search
        </div>
        <div class="diagram-arrow right" style="top: 280px; left: 300px;"></div>
        <div class="diagram-box" style="top: 260px; left: 340px; width: 100px; height: 60px;">
            Response
        </div>
    `;
}

// 모델 라우터 아키텍처
function createRouterArchitecture() {
    const container = document.getElementById('router-architecture');
    if (!container) return;

    container.innerHTML = `
        <div class="diagram-box" style="top: 50px; left: 50px; width: 100px; background: linear-gradient(135deg, #ff7043, #ff5722);">
            Router
        </div>
        <div class="diagram-arrow right" style="top: 80px; left: 170px;"></div>
        <div class="diagram-box" style="top: 20px; left: 210px; width: 80px; height: 60px;">
            Math Model
        </div>
        <div class="diagram-box" style="top: 100px; left: 210px; width: 80px; height: 60px;">
            Code Model
        </div>
        <div class="diagram-box" style="top: 180px; left: 210px; width: 80px; height: 60px;">
            Text Model
        </div>
        <div class="diagram-arrow right" style="top: 50px; left: 310px;"></div>
        <div class="diagram-arrow right" style="top: 130px; left: 310px;"></div>
        <div class="diagram-arrow right" style="top: 210px; left: 310px;"></div>
        <div class="diagram-box" style="top: 100px; left: 350px; width: 100px;">
            Combined Output
        </div>
    `;
}

// 메모리 타임라인
function createMemoryTimeline() {
    const container = document.getElementById('memory-timeline');
    if (!container) return;

    const timelineData = [
        { year: '2014', title: 'Neural Turing Machine', description: '외부 메모리 개념 도입', side: 'left', top: '20px' },
        { year: '2016', title: 'Differentiable Neural Computer', description: 'DeepMind의 메모리 시스템', side: 'right', top: '80px' },
        { year: '2020', title: 'Memory-Augmented Networks', description: '다양한 메모리 아키텍처', side: 'left', top: '140px' },
        { year: '2024', title: 'GraphRAG', description: '구조화된 외부 메모리', side: 'right', top: '200px' }
    ];

    let html = '';
    timelineData.forEach(item => {
        html += `
            <div class="timeline-item ${item.side}" style="top: ${item.top};">
                <h4>${item.year}</h4>
                <h5>${item.title}</h5>
                <p>${item.description}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}

// 뇌 메모리 시각화
function createBrainMemoryViz() {
    const container = document.getElementById('brain-memory');
    if (!container) return;

    container.innerHTML = `
        <div class="brain-region working-memory" title="워킹 메모리: 임시 정보 처리">
            Working Memory
        </div>
        <div class="brain-region long-term-memory" title="장기 메모리: 영구 정보 저장">
            Long-term Memory
        </div>
        <div class="brain-region episodic-memory" title="에피소드 메모리: 경험과 맥락">
            Episodic Memory
        </div>
    `;

    // 클릭 이벤트 추가
    container.querySelectorAll('.brain-region').forEach(region => {
        region.addEventListener('click', function() {
            const tooltip = this.getAttribute('title');
            alert(tooltip);
        });
    });
}

// JEPA 아키텍처 시각화
function createJEPAViz() {
    const container = document.getElementById('jepa-viz');
    if (!container) return;

    container.innerHTML = `
        <div class="jepa-component encoder" style="top: 50px; left: 50px;">
            Encoder X
        </div>
        <div class="jepa-component encoder" style="top: 50px; right: 50px;">
            Encoder Y
        </div>
        <div class="jepa-component predictor" style="top: 200px; left: 70px;">
            Predictor
        </div>
        <div class="jepa-component world-model" style="bottom: 50px; left: 50%; transform: translateX(-50%);">
            World Model
        </div>
    `;

    // 애니메이션 효과
    setTimeout(() => {
        container.querySelectorAll('.jepa-component').forEach((comp, index) => {
            setTimeout(() => {
                comp.style.opacity = '1';
                comp.style.transform = 'scale(1)';
            }, index * 300);
        });
    }, 500);
}

// 메모리 진화 경로
function createMemoryEvolution() {
    const container = document.getElementById('memory-evolution');
    if (!container) return;

    const evolutionSteps = [
        { title: 'Static RAG', left: '5%', top: '20%', width: '120px' },
        { title: 'GraphRAG', left: '25%', top: '40%', width: '120px' },
        { title: 'Dynamic Memory', left: '50%', top: '30%', width: '140px' },
        { title: 'Learned Memory', left: '75%', top: '50%', width: '120px' }
    ];

    let html = '';
    evolutionSteps.forEach((step, index) => {
        html += `
            <div class="evolution-step" style="left: ${step.left}; top: ${step.top}; width: ${step.width};">
                ${step.title}
            </div>
        `;
        
        if (index < evolutionSteps.length - 1) {
            html += `<div class="diagram-arrow right" style="left: calc(${step.left} + ${step.width}); top: calc(${step.top} + 30px);"></div>`;
        }
    });

    container.innerHTML = html;
}

// 타이틀 메모리 애니메이션
function createTitleMemoryAnimation() {
    const container = document.getElementById('title-memory');
    if (!container) return;

    let html = '';
    for (let i = 0; i < 50; i++) {
        const randomDelay = Math.random() * 2;
        html += `<div class="memory-block" style="animation-delay: ${randomDelay}s;"></div>`;
    }
    container.innerHTML = html;

    // 랜덤하게 일부 블록을 활성화
    setInterval(() => {
        const blocks = container.querySelectorAll('.memory-block');
        blocks.forEach(block => {
            block.classList.remove('active', 'fade');
            if (Math.random() > 0.7) {
                block.classList.add('active');
            } else if (Math.random() > 0.8) {
                block.classList.add('fade');
            }
        });
    }, 3000);
}

// 모든 시각화 초기화
function initializeVisualizations() {
    // 차트 생성
    createContextWindowChart();
    createScalingChart();
    createVerdictChart();
    
    // 다이어그램 생성
    createRAGArchitecture();
    createGraphRAGArchitecture();
    createRouterArchitecture();
    createMemoryTimeline();
    createBrainMemoryViz();
    createJEPAViz();
    createMemoryEvolution();
    createTitleMemoryAnimation();
}

// 슬라이드 변경 시 애니메이션 트리거
function onSlideChanged(event) {
    const currentSlide = event.currentSlide;
    const slideId = currentSlide.id || currentSlide.querySelector('[id]')?.id;
    
    // 슬라이드별 특별한 애니메이션이나 상호작용 추가
    if (slideId === 'jepa-slide') {
        // JEPA 컴포넌트 애니메이션
        const jepaComponents = currentSlide.querySelectorAll('.jepa-component');
        jepaComponents.forEach((comp, index) => {
            setTimeout(() => {
                comp.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    comp.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 약간의 지연 후 시각화 초기화 (Reveal.js 로드 대기)
    setTimeout(initializeVisualizations, 1000);
});