const generateOftenBoughtTogetherJob = {
    name: 'testcron',
    time: '*/10 * * * * *',
    timezone: 'Europe/London',
    request: {
        method: 'GET',
        url: '/cronjob/gobt'
    },
    onComplete: (res) => {
        console.log(res); // 'hello world'
    }
}

module.exports = [
    generateOftenBoughtTogetherJob
]