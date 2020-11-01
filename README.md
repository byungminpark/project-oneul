<!-- markdownlint-disable -->



<!-- 1. 서비스 기능 -->
# <span style="color: white; background-color: #222;">Ⅰ 서비스 기능</span>
  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">1.검색</span>

  - ##### 검색 필터 
  Foursquare API에서 제공하는 url 파라미터를 2개를 사용하여 검색 필터를 구현하였습니다. 
  ``` javascript
  // FILTERS.json
  { "인기순": "sortByPopularity", "거리순": "sortByDistance" }
  ```

  - ##### 일반 검색
  한 단어로 이루어진 입력만 받아 비동기 함수 fourSquareAPI.fetch(inputs, filter, offset)의 인자로 넣어 호출하고, 이 함수는 내부적으로 데이터를 Get하고 필요한 정보에 맞게 format하여 배열 places를 리턴합니다.

  - ##### 상세 검색
  두 단어로 이루어진 입력을 받아 위와 같이 비동기 함수를 호출하고 공백으로 나누어진 두번째 단어를 api에서 제공하는 url 파라미터 query의 값으로 넘겨줘서 get 요청을 하도록 하였습니다.

  - ##### 추가 검색
  url 파라미터 offset을 이용하여 현재 검색된 데이터 이후의 10개의 데이터를 추가 요청합니다. offset 값은 Home 컴포넌트에서 useRef를 이용해 관리하며 이 값을 이용하여 더 보기 버튼을 조건적으로 랜더링하도록 하였습니다.      
  > 날씨 데이터 관련 설명은 생략하였습니다.

  <br />

  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">2. 담기 · 담긴 장소 저장 · 저장된 리스트 관리</span>
  Sidebar에 담긴 장소들이 담긴 새 리스트에 이름을 지정하여 저장할 수 있으며, 저장된 리스트를 확인하고 삭제할 수 있습니다.

  <br />
      
  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">3. 반응형 레이아웃</span>
  미디어쿼리를 이용하여 620px을 분기점으로 하여 레이아웃이 바뀌도록 구현하였습니다. 다양한 크기의 스크린 화면에서 유연하게 보여질 수 있도록 상대적 단위를 주로 사용하였습니다. 
  > 반응형 font-size에 대한 디자인 개념을 정리하지 않아 일단 본 프로젝트에선 font-size에 rem을 사용하지 않고 em이나 px로 지정하였습니다.
      
  <br />

  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">4. 알림 메세지</span>
  App의 최상위에서 작은 알림창인 Toast와 '예'를 눌렀을 시 실행될 callback 함수를 받는 Dialogue를 구현하였습니다. 
  > 다른 App 혹은 다른 프로젝트에서도 쉡게 재사용될 수 있도록 구성하였습니다.

<br />

---
<br />
<br />





<!-- 2. 사용된 기술 -->
# <span style="color: white; background-color: #222;">Ⅱ 사용된 기술</span>
  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">1. 개발 환경 구성</span>
  `Webpack`을 중심으로 프론트 개발 환경을 구성하였습니다. 사용된 주요 패키지로는 `ESLint`, `Babel` 등이 있습니다. 또한 `ESLint`에 `airbnb의 config`와 더불어 `eslint-plugin-react-hooks`도 추가하였습니다.
  > `webpack.config`부터 로더, 플러그인, 패키지들을 직접 인스톨하고 babelrc나 eslintrc도 필요에 맞게 구성하고 핫 로딩까지 구현하였습니다. 모든 과정은 Webpack과 해당 패키지들의 깃헙, npm 등 공식 문서를 참고하였습니다.

  <br />

  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">2. 크로스브라우징</span>
  Babel의 기본적인 셋팅 이외에 `core-js`, `react-app-polyfill`을 사용하여 `IE11`에서도 `모던 JS 코드`로 개발할 수 있도록 하였습니다.
  또한 `postcss`와 `autoprefixer` 사용하였습니다.
  > IE11 지원을 포함하여 프론트엔드 크로스브라우징에 대해 익힐 수 있었습니다. 

  <br />
  
  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">3. 최신 리액트</span>
  본 프로젝트를 리액트 문서를 참고하여 함수형 컴포넌트와 훅으로 구현하였습니다.

  <br />

  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">4. 컴포넌트 구조 및 네이밍</span>
  디렉토리 구조에서 Page별로 `components/`를 가지고, App에서 공통되는 컴포넌트는 `common/`에서 관리하였습니다.  

  네이밍에 관련하여, 컴포넌트는 종속된 컨텍스트를 접두사로 하여 사용 범위를 명시하도록 하였습니다. 
  `ex) AppHeader, HomeSearchBar...`

  > 프로젝트를 진행하면서 api 데이터 요청을 담당하는 컴포넌트, 요청된 데이터를 전달하고 레이아웃을 잡는 컴포넌트, 주어진 데이터에 따라 view만 그리는 컴포넌트를 구분하여 생각하였습니다. 

  <br />

  ### <span style="color: #333; padding: 2px; border: 2px solid #333;">5. 스타일</span>
  - **클래스 네이밍**
  BEM의 표기법을 참고하였습니다.
  `ex) Component-heading, Component_show, Component-footer_hide`

  - **common.css**
  독립적으로 자주 사용될 수 있는 클래스와 keyframes는 common.css에 지정하였습니다.
  `class ex) visually-hidden, no-scrollbar, bg_menu, bg_search, icon-button, no-scroll__mobile...`
  `keyframes ex) rise-up, fade-in, fade-out...`
  > 현재 Scss로 리펙토링하면서 변수와 믹스인을 중심으로 파일을 나누었습니다.


<br />



<!-- 
일요일에
0. 메뉴 방식 되돌리기...
1. api 요청 코드, 위치 api, 로컬 스토리지
2. context api, 스킵네비게이션

리드미 정리 후에 지원:
memo, useMemo, useCallbak 등 불필요한 랜더링 방지 및 최적화 기술. (메뉴 등...)
 -->