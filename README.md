# swagger2ts-helper

- use [openapi-typescript](https://github.com/drwpow/openapi-typescript)
- [https://swagger.io/specification/v2/](https://swagger.io/specification/v2/)
- swagger json 데이터를 typescript 로 변환

## 설치

- [npm module](https://www.npmjs.com/package/@nonoll/swagger2ts-helper)

```bash
npm i @nonoll/swagger2ts-helper -D
```

## 사용

### config 설정

- protocol: `swagger json protocol 설정`
- entry
  - definitions: `swagger json url (필수값)`
  - response : `response 구간, ejs 템플릿 경로 설정 ( 미적용시 기본 템플릿으로 처리 )`
  - request : `request 구간, ejs 템플릿 경로 설정 ( 미적용시 기본 템플릿으로 처리 )`
- options: `@manifoldco/swagger-to-ts options`
- output
  - definitions: `변환된 definitions 저장 경로 (필수값)`
  - response: `변환된 response 저장 경로 (필수값)`
  - request: `변환된 request 저장 경로 (필수값)`
- prettier: `prettier 옵션 설정`

```json
{
  "protocol": "https",
  "entry": {
    "definitions": "https://petstore.swagger.io/v2/swagger.json",
    "response": "./src/templates/response.template.ejs",
    "request": "./src/templates/request.template.ejs"
  },
  "options": {
    "wrapper": true,
    "camelcase": true
  },
  "output": {
    "definitions": "./src/@types/api.definitions.ts",
    "response": "./src/@types/api.response.ts",
    "request": "./src/@types/api.request.ts"
  },
  "prettier": {
    "printWidth": 100,
    "proseWrap": "always",
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2
  }
}
```

### 실행

- 실행 위치상에 config 파일 활용시

```bash
swagger2ts-helper
```

- 별도 위치상에 config 파일 활용시

```bash
swagger2ts-helper config='./dev-tools/swagger2ts.config.json'
```

### 템플릿 설정

- [EJS](https://ejs.co/) 활용
  - 다른 템플릿과 대비하여 유연한 구성이 가능하므로 사용함

- response.template.ejs
  - 템플릿에 주입되는 파라미터
    - definitionsRelPath: `definitions 파일 경로`
    - rawData: `swagger Object`
    - rawDefinitions: `swagger#definitions Object`
    - definitions: `swagger#definitions Object.keys`

- request.template.ejs
  - 템플릿에 주입되는 파라미터
    - definitionsRelPath: `definitions 파일 경로`
    - rawData: `swagger Object`
    - paths: `swagger#paths Object`

## 변환 예

- input: [petstore swagger](https://petstore.swagger.io/v2/swagger.json)
- output: [output](https://github.com/nonoll/swagger2ts-helper/tree/main/src/%40types)

## 주의사항

- 정의된 swagger 상에 스펙 규칙이 어긋나는 케이스들이 존재
- 경우에 따라 swagger json 을 다운 받은 후 전처리( 어긋나는 케이스 보정 ) 진행 필요
  - 어긋나는 케이스 보정은 파싱시에 에러 메시지를 참고 하여 진행
  - e.g)
    ```
    // before
    «Map«string,object»»
    // after
    «Map«StringObject»»
    ```
    ```
    // before
    «Map«favorite response»»
    // after
    «Map«FavoriteResponse»»
    ```
    ```
    // before
    "car call": {
    // after
    "CarCall": {
    ```
