<!-- markdownlint-disable MD033-->

# My Own React Template

CRA를 이용하지 않고 직접 개발 환경을 구성하기 위해 진행되었다. (필요한 요소가 생기면 업데이트 예정.)
속도와 크기를 고려한 **production 코드**로 전환하기 위해서는 다음을 진행할 것:

1. 코드 스플릿, 캐싱
2. [production 코드](https://webpack.js.org/guides/production/)를 위한 config로 전환
3. dev tool 변경
4. minify와 uglify (+ 이미지, CSS)
5. 등 webpack 문서 확인

---

<br><br>

## 구성

_development 모드_
_IE 11부터 지원_
_Promise, Object.assign 등 IE에서 지원하지 않는 코드 사용_

1. **webpack.config.js**  
   mode,
   devtool,
   webpack-dev-server(install) (+ react-hot-loader -S), &nbsp;&nbsp; _<= bundle size up_
   module,
   plugins
2. **Loaders:**
   style-loader
   css-loader
   file-loader
   babel-loader (+ @babel/core, @babel/preset-env) (+ core-js) &nbsp;&nbsp; _<= bundle size up_
   postcss-loader (+ autoprefixer)
3. **Plugins:**
   html-webpack-plugin (set template)
   add-asset-html-webpack-plugin (set filepath, typeOfAsset)
   clean-webpack-plugin (set cleanStaleWebpackAssets)
   prettier-webpack-plugin
4. **package.json:**
   browserslist 지정

---

<br><br>

### 트랜스파일링과 폴리필을 위한 babel

@babel/polyfill 대신 core.js -S를 설치하고 .babelrc에 [옵션](https://babeljs.io/docs/en/babel-preset-env#usebuiltins)을 지정한다.
(Promise, Object.assign 등 IE에서 지원하지 않는 코드의 폴리필)

```json
"useBuiltIns": "entry",
"corejs": { "version": 3, "proposals": true }
```

(React 코드를 트랜스파일하기 위해 @babel/preset-react을, 폴리필하기 위해 (core-js에 이어) [react-aap-polyfill](https://www.npmjs.com/package/react-app-polyfill)을 -S 설치하고, .babelrc에 모두 지정하고 코드 import한다.)

```js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
```

---

<br><br>

### 더 나은 CSS를 위한 [postcss](https://github.com/postcss/autoprefixer)

현재로선 css 전처리없이 prefixer만 필요하므로 ~~postcss-preset-env 등~~이 아닌 **autoprefixer만 설치**한다.

webpack.config.js에 해당 loader(+ plugins) 지정
옵션은 IE grid를 불완전 지원을 위해 grid: "autoplace" 지정.

---

<br><br>

### 리액트 코드를 위한 구성

react react-dom을 설치 (react-app-polyfill, @babel/preset-react는 위에서...)

react, react-dom을 import하고 JSX 코드 작성 _<= bundle size up_

> @babel/preset-env가 프로젝트의 src의 js 코드를 core-js를 사용하여 폴리필하고, react-app-polyfill는 (내부적으로 core-js의 코드를 참조해) react, react-dom의 코드를 폴리필하는 듯하다.<br><br> **react-app-polyfill**는 babel, core-js와 함께 리액트 앱에서 다음을 사용할 수 있게 한다.
> Promise, window.fetch, Symbol, Object.assign, Array.from + [ IE9 Map, Set ]

(추가로 dev server hot 모드를 리액트에서도 원활히 사용하기 위해 react-hot-loader를 -S 설치하고 .babelrc 지정)

---

<br><br>

### 협업과 실수를 줄이기 위한 eslint

eslint eslint-loader 설치 (+ eslint-config-airbnb)

1. `npm info "eslint-config-airbnb@latest" peerDependencies`를 명령해 해당 리스트와 eslint-config-airbnb를 설치.
2. `./node_modules/.bin/eslint --init`을 명령해 eslintrc, airbnb style(react 포함)을 지정하고 .eslintrc에 rules 지정.
3. jsx?파일에 `use: ['babel-loader', **'eslint-loader'**]` 지정.

### 협업과 일관성있는 코드를 위한 prettier

prettier prettier-webpack-plugin 설치

1. webpack.config.js에 prettier-webpack-plugin 지정.
2. .prettierrc 생성 후 옵션 지정.

> **충돌을 막기 위한 eslint-config-prettier**
> 설치 + .eslintec의 "extends"에 prettier 푸쉬.

---

<br><br>

### 새로고침없는 dev server를 위한 HMR

1. webpack.config.js의 dev-server에 hot: true 지정.
2. react-hot-loader -S 설치
3. .babelrc에 `"plugins": ["react-hot-loader/babel"]`를 지정.
4. index.js에 [코드](https://webpack.js.org/guides/hot-module-replacement/#gotchas)를 <u>주의하여 지정</u>.
