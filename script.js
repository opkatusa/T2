// ⚠️ 중요: API 키 설정
const API_TOKEN = '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';
const API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

// DOM 요소 선택
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const copyPromptBtn = document.getElementById('copyPromptBtn');

const loadingContainer = document.getElementById('loadingContainer');
const imageContainer = document.getElementById('imageContainer');
const welcomeContainer = document.getElementById('welcomeContainer');

const generatedImage = document.getElementById('generatedImage');
const errorMessage = document.getElementById('errorMessage');
const statusText = document.getElementById('statusText');
const progressFill = document.getElementById('progressFill');

let currentPrompt = '';
let currentImageBlob = null;

// 이벤트 리스너
generateBtn.addEventListener('click', generateImage);
clearBtn.addEventListener('click', clearForm);
downloadBtn.addEventListener('click', downloadImage);
copyPromptBtn.addEventListener('click', copyPrompt);

// Enter 키로도 생성 가능
promptInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        generateImage();
    }
});

// 이미지 생성 함수
async function generateImage() {
    const prompt = promptInput.value.trim();

    // 검증
    if (!prompt) {
        showError('프롬프트를 입력해주세요');
        return;
    }

    if (prompt.length > 500) {
        showError('프롬프트는 500자 이내여야 합니다');
        return;
    }

    if (!API_TOKEN || API_TOKEN === 'YOUR_HUGGING_FACE_API_KEY_HERE') {
        showError('⚠️ API 키를 설정해주세요. script.js의 API_TOKEN을 변경하세요.');
        return;
    }

    currentPrompt = prompt;
    generateBtn.disabled = true;
    clearBtn.disabled = true;
    hideAll();
    showLoading();

    try {
        // 진행 상황 시뮬레이션
        animateProgress();

        // API 호출
        const response = await fetch(API_URL, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: 'POST',
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('API 키가 유효하지 않습니다. Hugging Face 토큰을 확인해주세요.');
            } else if (response.status === 429) {
                throw new Error('요청 한도에 도달했습니다. 잠시 후 다시 시도해주세요.');
            } else {
                throw new Error(`API 에러: ${response.status}`);
            }
        }

        // 응답을 Blob으로 변환
        currentImageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(currentImageBlob);

        // 이미지 표시
        generatedImage.src = imageUrl;
        hideLoading();
        showImage();
        statusText.textContent = '이미지 생성 완료!';

    } catch (error) {
        console.error('Error:', error);
        hideLoading();
        showError(`오류 발생: ${error.message}`);
    } finally {
        generateBtn.disabled = false;
        clearBtn.disabled = false;
    }
}

// 로딩 애니메이션
function animateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) {
            progress = 90;
        }
        progressFill.style.width = progress + '%';

        if (!loadingContainer.classList.contains('hidden')) {
            // 계속 실행
        } else {
            clearInterval(interval);
            progressFill.style.width = '0%';
        }
    }, 500);
}

// 이미지 다운로드
function downloadImage() {
    if (!currentImageBlob) return;

    const url = URL.createObjectURL(currentImageBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `T2-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 프롬프트 복사
function copyPrompt() {
    navigator.clipboard.writeText(currentPrompt).then(() => {
        const originalText = copyPromptBtn.textContent;
        copyPromptBtn.textContent = '✓ 복사됨!';
        setTimeout(() => {
            copyPromptBtn.textContent = originalText;
        }, 2000);
    });
}

// 폼 초기화
function clearForm() {
    promptInput.value = '';
    currentPrompt = '';
    currentImageBlob = null;
    hideAll();
    showWelcome();
    hideError();
}

// UI 상태 관리
function hideAll() {
    loadingContainer.classList.add('hidden');
    imageContainer.classList.add('hidden');
    welcomeContainer.classList.add('hidden');
}

function showLoading() {
    loadingContainer.classList.remove('hidden');
    statusText.textContent = '이미지 생성 중...';
}

function hideLoading() {
    loadingContainer.classList.add('hidden');
}

function showImage() {
    imageContainer.classList.remove('hidden');
}

function showWelcome() {
    welcomeContainer.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function hideError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

// 페이지 로드 시
window.addEventListener('load', () => {
    showWelcome();
    hideError();
});
