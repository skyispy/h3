module.exports = {
    apps: [
        {
            name: 'myapp', // pm2에서 관리하는 어플리케이션의 이름
            script: 'dist/main.js', // pm2 start ./dist/main.js
            instances: 'max', // cpu를 사용해서 어플리케이션 인스턴스를 몇 개까지 실행할거냐?
            exec_mode: 'cluster', // `클러스터` 모드 : 여러 인스턴스가 병렬적으로 실행될 수 있게 한다.
            watch: false, // 파일 변경 감지할지 여부.   파일 감지될 때마다 변경할 수 있기 때문에 꺼놓기
            env: { // 환경변수 정의할 객체
                NODE_ENV: 'development', // 어플리케이션의 환경 변수를 설정한다.
                PORT: 3000,
            },
            env_production: { // 환경변수 운영 모드에서 정의할 객체
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};