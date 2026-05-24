# T2 - AI Image Generator 🎨

Hugging Face API를 사용하여 텍스트 프롬프트로 AI 이미지를 생성하는 웹 앱입니다!

## 🚀 빠른 시작

### 1. API 키 설정

1. [Hugging Face](https://huggingface.co/join) 가입 (이미 하셨다면 로그인)
2. [API 토큰 페이지](https://huggingface.co/settings/tokens)에서 새 토큰 생성
   - Type: `read` 선택
   - Create token 클릭
   - 토큰 복사
3. `script.js` 파일 열기
4. 첫 번째 줄의 `YOUR_HUGGING_FACE_API_KEY_HERE`를 복사한 토큰으로 바꾸기

```javascript
const API_TOKEN = 'hf_xxxxxxxxxxxxx'; // 이렇게 바꾸기
```

### 2. 로컬에서 실행

**Python 설치되어 있으면:**

```bash
cd T2
python -m http.server 8000
```

**Node.js 설치되어 있으면:**

```bash
cd T2
npx http-server
```

### 3. 브라우저에서 열기

```
http://localhost:8000
```

## 💡 사용 방법

1. **프롬프트 입력**
   - 텍스트 영역에 이미지 설명 입력
   - 예: "아름다운 산 풍경, 일몰, 호수, 4K 품질"

2. **이미지 생성**
   - "🎨 이미지 생성" 버튼 클릭
   - AI가 이미지 생성 중 (약 5~10초)

3. **이미지 저장**
   - "⬇️ 이미지 다운로드" 버튼으로 다운로드
   - "📋 프롬프트 복사" 버튼으로 프롬프트 복사

## 🎯 프롬프트 작성 팁

좋은 결과를 얻기 위한 팁:

- **구체적으로 작성**: "아름다운 풍경" → "구름이 많은 산 위의 일몰, 호수 반사, 새들이 날고 있음"
- **스타일 명시**: "유화 스타일", "사진", "3D 렌더링", "애니메이션"
- **품질 명시**: "4K", "고품질", "상세한", "고해상도"
- **조명/분위기**: "황금빛 시간대", "극적인 조명", "밤하늘", "월광"

## ✨ 주요 기능

- 🤖 Hugging Face Stable Diffusion 모델 사용
- 🎨 AI 이미지 생성
- ⚡ 실시간 진행 상황 표시
- 📥 이미지 다운로드
- 📋 프롬프트 복사
- 🎯 프롬프트 검증
- ❌ 에러 처리
- 📱 반응형 디자인

## 🛠️ 기술 스택

- HTML5
- CSS3 (그라디언트, 애니메이션)
- Vanilla JavaScript
- Hugging Face API

## 📝 주의사항

- API 키는 절대 공개하지 마세요!
- Hugging Face 무료 계정은 월별 API 호출 한도가 있습니다
- 첫 이미지 생성 시 모델이 로드되어 시간이 더 걸릴 수 있습니다

## 🐛 문제 해결

### "API 키가 설정되지 않았습니다" 에러
- `script.js`의 `API_TOKEN`을 확인하세요
- Hugging Face 토큰이 맞는지 확인하세요

### 이미지가 생성되지 않음
- 브라우저 콘솔(F12)에서 에러 메시지 확인
- API 토큰이 올바른지 확인
- Hugging Face 계정에 충분한 API 할당량이 있는지 확인

### "모델이 로드 중입니다" 에러
- 첫 요청일 때 모델이 로드되는 중입니다
- 30초 정도 기다린 후 다시 시도해주세요

## 📚 유용한 링크

- [Hugging Face](https://huggingface.co/)
- [Stable Diffusion 모델](https://huggingface.co/stabilityai/stable-diffusion-2)
- [API 문서](https://huggingface.co/docs/api-inference)

## 📄 라이선스

MIT License

---

**만든이**: opkatusa  
**생성 날짜**: 2026-05-24
